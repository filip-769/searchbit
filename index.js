import { readFileSync } from "fs";
import search from "./backend/index.js";
import express from "express";
import proxy from "./proxy/proxy.js";

const app = express();
const config = JSON.parse(readFileSync("./config.json"));
const serverConfig = JSON.parse(readFileSync("./serverConfig.json"));

app.use(express.static("./static/"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header({
        "Access-Control-Allow-Origin": serverConfig.cors,
        "Content-Security-Policy": "default-src 'none'; style-src 'self'; img-src 'self';"
    });
    next();
});

app.all("/", (req, res) => res.redirect("/search"));
app.all("/favicon.ico", (req, res) => res.redirect("/searchBtn.svg"))
app.get("/proxy", async (req, res) => proxy(req, res))
app.get("/settings", (req, res) => res.render("settings.ejs", { config: getUserConfig(req) } ))

app.get("/opensearch.xml", (req, res) => {
    res.type("application/opensearchdescription+xml");
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