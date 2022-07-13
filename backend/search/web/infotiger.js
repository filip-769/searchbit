import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://infotiger.com/search?query=${encodeURIComponent(q)}&pageno=${p}`, {
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

    dom.window.document.querySelectorAll(".result-elm").forEach(el => {
        const title = el.querySelector("a")?.textContent;
        const url = el.querySelector("a")?.href;
        const desc = el.querySelector(".description")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    return json;
}