import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://search.seznam.cz/?q=${encodeURIComponent(q)}&from=${(p-1)*10}`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: []
    };

    dom.window.document.querySelectorAll(".bec586").forEach(el => {
        const title = el.querySelector("h3")?.textContent;
        const url = el.querySelector("a")?.href;
        const desc = el.querySelector("._3eded7")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });

    return json;
}