import express from "express";
import search from "./backend/index.js";
const app = express();

//app.set("view engine", "ejs");

app.get("/search", async (req, res) => {
    res.json(await search((req.query.engines ? req.query.engines.toLowerCase().split(",") : false), req.query.q, req.query.p));
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});