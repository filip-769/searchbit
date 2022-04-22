import jsdom from "jsdom";
import randomUserAgent from "../../../randomUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://teclis.com/search?q=${encodeURIComponent(q)}&p=${p}`, {
        headers: {
            "User-Agent": randomUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: []
    };

    dom.window.document.querySelectorAll(".result-items > li").forEach(el => {
        const title = el.querySelector("a")?.textContent;
        const url = el.querySelector("a")?.href;
        const desc = el.querySelector("span")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    return json;
}