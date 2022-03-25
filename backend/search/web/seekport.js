import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, p) => {
    const response = await fetch(`http://www.seekport.com/?q=${encodeURIComponent(q)}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: [],
        error: null
    };

    dom.window.document.querySelectorAll(".serp-item").forEach(el => {
        const title = el.querySelector(".title")?.textContent;
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