import express from "express";
import search from "./backend/index.js";
const app = express();

//app.set("view engine", "ejs");

app.get("/search", async (req, res) => {
    res.json(await search((req.query.e ? req.query.e.toLowerCase().split(",") : false), req.query.q, parseInt(req.query.p), req.query.t));
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});