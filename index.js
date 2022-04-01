import express from "express";
import search from "./backend/index.js";
const app = express();

app.set("view engine", "ejs");
app.use(express.static("./static/"));

app.all("/", (req, res) => res.redirect("/search"));

app.get("/search", async (req, res) => {
    if(!req.query.q) return res.render("search.ejs", { req });
    const json = await search (
        (req.query.e ? req.query.e.toLowerCase().split(",") : null), //search engines
        req.query.q, //search query
        parseInt(req.query.p), //search page
        req.query.t //search type
    );
    if(req.query.f === "json") {
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

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});