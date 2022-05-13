import { readFileSync } from "fs";
import { Readable } from "node:stream";
import search from "./backend/index.js";
import express from "express";
import { JSDOM } from "jsdom";

const app = express();
const config = JSON.parse(readFileSync("./config.json"));
const serverConfig = JSON.parse(readFileSync("./serverConfig.json"));

app.use(express.static("./static/"));
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => res.redirect("/search"));

app.get("/proxy", async (req, res) => {
    try {
        if(!/^https?:\/\//.test(req.query.url)) return res.status(400).json({ error: 400 });
        const response = await fetch(req.query.url);
        const type = response.headers.get("Content-Type");
        res.type(type);
        if(type.includes("html")) {
            res.header({ "Content-Security-Policy": "default-src 'none'; sandbox; frame-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; media-src 'self'; font-src 'self';" });
            const dom = new JSDOM(await response.text());
            if(!dom.window.document.querySelector("link[rel=icon]")) {
                const iconEl = dom.window.document.createElement("link");
                iconEl.setAttribute("rel", "icon");
                iconEl.setAttribute("href", "/favicon.ico");
                dom.window.document.head.appendChild(iconEl);
            }
            dom.window.document.querySelectorAll("script, meta").forEach(el => el.remove());
            dom.window.document.querySelectorAll("[src], [href]").forEach(el => {
                try {
                    if(el.hasAttribute("src")) el.setAttribute("src", `/proxy?url=${encodeURIComponent((new URL(el.getAttribute("src"), req.query.url)).href)}`);
                    if(el.hasAttribute("href")) el.setAttribute("href", `/proxy?url=${encodeURIComponent((new URL(el.getAttribute("href"), req.query.url)).href)}`);
                    if(el.hasAttribute("srcset")) {
                        el.setAttribute("srcset", el.getAttribute("srcset").split(", ").map(src => {
                            return src.replace(src.split(" ")[0], `/proxy?url=${encodeURIComponent((new URL(src.split(" ")[0], req.query.url)).href)}`);
                        }).join(", "));
                    };
                } catch (error) {
                    if(el.hasAttribute("src")) el.removeAttribute("src");
                    if(el.hasAttribute("srcset")) el.removeAttribute("srcset");
                    if(el.hasAttribute("href")) el.removeAttribute("href");
                    console.error(error)
                }
            })
            res.send(`<!DOCTYPE html>${dom.window.document.documentElement.outerHTML}`);
        } else if(type.includes("css")) {
            let css = await response.text();
            css.match(/url ?\([^)]*\)/mg)?.forEach(x => {
                let url = x.replace(/url ?\(/, "").slice(0, -1);
                if (url.startsWith("'") || url.startsWith("\"")) url = url.slice(1, -1);
                url = (new URL(url, req.query.url)).href;
                css = css.replace(x, `url("/proxy?url=${encodeURIComponent(url)}")`)
            })
            res.send(css);
        } else {
            res.header({ "Content-Security-Policy": "default-src 'none'" });
            res.type(response.headers.get("Content-Type"));
            Readable.fromWeb(response.body).pipe(res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 500 });
    }
})

app.get("/settings", (req, res) => {
    res.render("settings.ejs", { config: getUserConfig(req) } );
})

app.get("/opensearch.xml", (req, res) => {
    res.header("Content-Type", "application/opensearchdescription+xml");
    res.render("opensearch.ejs", { autocomplete: req.query.ac ?? getUserConfig(req).autocomplete, origin: "http://" + req.get("host") } );
})

app.post("/settings", (req, res) => {
    try {
        const x = JSON.stringify(JSON.parse(req.body.data));
        res.cookie("settings", x, { maxAge: 1000*60*60*24*365*10 });
        res.redirect("/settings");
    } catch (error) {
        return res.status(400).redirect("/settings");
    }
})

app.get("/search", async (req, res) => {
    try {
        if(!req.query.q) return res.render("search.ejs", { req, config: getUserConfig(req) });

        const json = await search (
            req.query.e?.toLowerCase()?.split(",") || ( req.query.t === "autocomplete" ? [ getUserConfig(req).autocomplete ] : getEnginesFromConfig(getUserConfig(req), req.query.t ?? "web") ), //search engines
            req.query.q, //search query
            parseInt(req.query.p) || 1, //search page
            req.query.t ?? "web", //search type
            getUserConfig(req), //user config
        )

        if(req.query.f === "json" || req.query.t === "autocomplete") {
            res.json(json);
        } else if(json.redirect) {
            res.redirect(json.redirect);
        } else {
            res.render("search.ejs", { json, req, config: getUserConfig(req) });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 500 });
    } 
});

app.listen(serverConfig.port, () =>  console.log(`Server is listening on port ${serverConfig.port}`));

function getUserConfig(req) {
    let userConfig = config;

    req.headers.cookie?.split("; ")?.forEach(cookie => {
        const [key, value] = cookie.split("=");
        if(key === "settings") {
            try {
                userConfig = JSON.parse(decodeURIComponent(value));
            } catch (error) {
                return;
            }
        }
    })

    return userConfig;
}

function getEnginesFromConfig(config, type) {
    const engines = [];
    for(const engine in config.engines[type]) {
        engines.push(engine);
    }

    return engines;
}