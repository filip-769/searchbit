import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://search.brave.com/search?q=${encodeURIComponent(q)}&offset=${encodeURIComponent(p - 1)}`, {
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

    dom.window.document.querySelectorAll("#results > .snippet.fdb").forEach(el => {
        const title = el.querySelector("span")?.textContent;
        const url = el.querySelector("a")?.href;
        const desc = el.querySelector("p")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    return json;
}