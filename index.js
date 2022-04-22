import { readFileSync } from "fs";
import { Readable } from "node:stream";
import express from "express";
import search from "./backend/index.js";

const app = express();
const config = JSON.parse(readFileSync("./config.json"));

app.use(express.static("./static/"));
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => res.redirect("/search"));

app.get("/proxy", async (req, res) => {
    try {
        if(!/^https?:\/\//.test(req.query.url)) return res.status(400).json({ error: 400 });
        const response = await fetch(req.query.url);
        res.header({ "Content-Security-Policy": "default-src 'none'" });
        res.type(response.headers.get("Content-Type"));
        Readable.fromWeb(response.body).pipe(res);
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
            getUserConfig(req).lenses[req.query.l?.toLowerCase()] //lense
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

app.listen(config.port, () =>  console.log(`Server is listening on port ${config.port}`));

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