import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://petalsearch.com/search?query=${encodeURIComponent(q)}&pn=${p}`, {
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

    dom.window.document.querySelectorAll(".container.webpageCard").forEach(el => {
        const title = el.querySelector(".content-title")?.textContent;
        const url = el.querySelector(".content-title")?.href;
        const desc = el.querySelector(".webpage-text")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    return json;
}