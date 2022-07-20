import { readFileSync } from "fs";
import { ProxyAgent } from "undici";
import search from "./backend/index.js";
import express from "express";
import proxy from "./proxy/proxy.js";
import json5 from "json5";

global.JSON.parse = json5.parse;

const app = express();
const config = JSON.parse(readFileSync("./config.json"));
const serverConfig = JSON.parse(readFileSync("./serverConfig.json"));

if(serverConfig.httpProxy) {
    global[Symbol.for('undici.globalDispatcher.1')] = new ProxyAgent(serverConfig.httpProxy);
}

app.use(express.static("./static/"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    const headers = {
        "Access-Control-Allow-Origin": serverConfig.cors,
        "Content-Security-Policy": "default-src 'none'; style-src 'self' 'unsafe-inline'; img-src 'self'",
        "Referrer-Policy": "no-referrer",
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload"
    };
    if(serverConfig.onionLocation) headers["Onion-Location"] = serverConfig.onionLocation + req.path;
    res.header(headers);
    next();
});

app.all("/", (req, res) => res.redirect("/search"));
app.all("/favicon.ico", (req, res) => res.redirect("/searchBtn.svg"));
app.get("/proxy", async (req, res) => proxy(req, res));
app.get("/settings", (req, res) => res.render("settings.ejs", { config: getUserConfig(req) } ));
app.get("/getVersion", (req, res) => {
    res.send(JSON.parse(readFileSync("package.json")).version);
})
app.get("/clearCookies", (req, res) => {
    req.headers.cookie?.split("; ")?.forEach(cookie => { res.clearCookie(cookie.split("=")[0]) });
    res.redirect("/settings");
})

app.get("/opensearch.xml", (req, res) => {
    res.type("application/opensearchdescription+xml");
    res.render("opensearch.ejs", { autocomplete: req.query.ac ?? getUserConfig(req).autocomplete, origin: "http://" + req.get("host") } );
})

app.post("/settings", (req, res) => {
    try {
        config.checkboxes.forEach(checkbox => req.body[checkbox] ? 0 : req.body[checkbox] = false );
        for (const x in req.body) {
            if(x === "quickShortcuts") {
                req.body[x].split("\n").forEach(l => {
                    const [key, value] = l.split("=");
                    res.cookie(`quickShortcuts.${key}`, value, { maxAge: 1000*60*60*24*365*10, httpOnly: true });
                })
            } else {
                res.cookie(x, req.body[x], { maxAge: 1000*60*60*24*365*10, httpOnly: true });
            }
        }
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
            parseInt(req.query.p) || 1, //search page
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

function getUserConfig(req) {
    let userConfig = structuredClone(config);

    req.headers.cookie?.split("; ")?.forEach(cookie => {
        const [key, value] = cookie.split("=");
        let x = decodeURIComponent(value);
        if(x === "false") x = false;
        if(x === "true") x = true;
        if (x?.toString()?.replace(/[^0-9]/g, "") === x?.toString() && x !== "") x = +x;
        if(key.startsWith("filters.")) x = x.split("\n").filter(q => !!q);
        setPath(userConfig, key, x);
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

function setPath(object, path, value) {
    return path
        .split('.')
        .reduce((o,p,i) => o[p] = path.split('.').length === ++i ? value : o[p] || {}, object);
}

app.listen(serverConfig.port, async () => {
    console.log(` 
    _______ _______ _______  ______ _______ _     _ ______  _____ _______
    |______ |______ |_____| |_____/ |       |_____| |_____]   |      |   
    ______| |______ |     | |    \\_ |_____  |     | |_____] __|__    |   
                                                                                                                                                
    Server is running
    Server is listening on port ${serverConfig.port}
    Server IP: ${await(await fetch("https://api.ipify.org")).text()}
    `);
});