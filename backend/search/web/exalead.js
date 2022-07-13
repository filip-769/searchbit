import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://www.exalead.com/search/web/results/?q=${encodeURIComponent(q)}&start_index=${(p-1)*10}`, {
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

    dom.window.document.querySelectorAll(".media-list > .media").forEach(el => {
        const title = el.querySelector(".title")?.textContent;
        const url = el.querySelector(".title")?.href;
        const desc = el.querySelector("span.ellipsis")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    return json;
}