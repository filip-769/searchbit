import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";

export default async (q, p) => {
    const response = await fetch(`https://search.seznam.cz/obrazky/?q=${encodeURIComponent(q)}&from=${(p-1)*40}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);

    let json = {
        results: [],
        error: null
    };

    dom.window.document.querySelectorAll(".Images-grid-image").forEach(el => {
        const desc = el.querySelector("._26741f")?.alt;
        const url = el.querySelector("._445bc8")?.href;
        const img = el.querySelector("._26741f")?.src;
        json.results.push({
            url: url,
            desc: desc,
            img: img
        });
    });
    return json;
}