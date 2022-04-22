import jsdom from "jsdom";
import randomUserAgent from "../../../randomUserAgent.js";


export default async (q) => {
    const response = await fetch(`https://search.brave.com/search?q=${encodeURIComponent(q)}`, {
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