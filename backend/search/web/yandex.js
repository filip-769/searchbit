import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://yandex.com/search/?text=${encodeURIComponent(q)}&p=${p-1}`, {
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

    dom.window.document.querySelectorAll(".serp-item:not([data-fast-name])").forEach(el => {
        const title = el.querySelector("a h2")?.textContent;
        const url = el.querySelector("a")?.href;
        const desc = el.querySelector(".OrganicTextContentSpan")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });

    return json;
}