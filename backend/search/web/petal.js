import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, p) => {
    const response = await fetch(`https://petalsearch.com/search?query=${encodeURIComponent(q)}`, {
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