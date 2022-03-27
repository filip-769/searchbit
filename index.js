import express from "express";
import search from "./backend/index.js";
const app = express();

//app.set("view engine", "ejs");

app.all("/", (req, res) => res.redirect("/search"));

app.get("/search", async (req, res) => {
    if(!req.query.q) {
        res.send("List of all parameters: <ul><li>q - query (required)</li><li>e - engine(s) (default all)</li><li>p - page (default 1)</li><li>t - type (default web)</li><li>f - format (default html)</li></ul>");
        return;
    }
    if(req.query.f === "json") {
        res.json(
            await search
            (
                (req.query.e ? req.query.e.toLowerCase().split(",") : null), //search engines
                req.query.q, //search query
                parseInt(req.query.p), //search page
                req.query.t //search type
            )
        )
    } else {
        res.send("HTML is not supported yet, please use the <b>&f=json</b> parameter to get the JSON response.");
    }
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});