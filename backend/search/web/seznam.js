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

    dom.window.document.querySelectorAll(".cfb4f6").forEach(el => {
        const title = el.querySelector(".de55cc")?.textContent;
        const url = el.querySelector(".de55cc")?.href;
        const desc = el.querySelector(".e69e8d")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    
    return json;
}