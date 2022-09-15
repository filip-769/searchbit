import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";

export default async (q, p) => {
    const response = await fetch(`https://search.seznam.cz/obrazky/?q=${encodeURIComponent(q)}&from=${(p-1)*40}`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);

    let json = {
        results: []
    };

    dom.window.document.querySelectorAll(".b1d73d").forEach(el => {
        const desc = el.querySelector("img")?.alt;
        const url = el.querySelector(".b9f7f5")?.href;
        const img = el.querySelector("img")?.src;
        json.results.push({
            url: url,
            desc: desc,
            img: img
        });
    });
    return json;
}