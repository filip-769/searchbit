import jsdom from "jsdom";
import randomUserAgent from "../../../randomUserAgent.js";


export default async (q) => {
    const response = await fetch(`https://entfer.com/search?q=${encodeURIComponent(q)}`, {
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

    dom.window.document.querySelectorAll(".ResultItem_card__2Q635").forEach(el => {
        const title = el.querySelector(".ResultItem_title__2jXOV")?.textContent;
        const url = el.querySelector("a")?.href;
        const desc = el.querySelector(".ResultItem_snippet__d8LqP")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    return json;
}