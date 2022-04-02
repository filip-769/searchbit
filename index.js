import { readFileSync } from "fs";
import { cwd } from "process";
import express from "express";
import search from "./backend/index.js";
const app = express();

// read the config file
const config = JSON.parse(readFileSync(cwd()+"/config.json"));

app.set("view engine", "ejs");
app.use(express.static("./static/"));

app.all("/", (req, res) => res.redirect("/search"));

app.get("/search", async (req, res) => {
    if(!req.query.q) return res.render("search.ejs", { req });
    const json = await search (
        (req.query.e ? req.query.e.toLowerCase().split(",") : null), //search engines
        req.query.q, //search query
        parseInt(req.query.p), //search page
        req.query.t, //search type
        parseInt(req.query.d) //search delay
    );
    if(req.query.f === "json" || req.query.t === "autocomplete") {
        res.json(json);
    } else {
        try {
            res.render("search.ejs", { json, req });
        } catch (error) {
            console.error(error);
            res.send("unknown error");
        }
    }
});

app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
});