import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, type, offset, count) => {
    const response = await fetch(`https://search.seznam.cz/?q=${encodeURIComponent(q)}&from=${offset.toString().replace(/.$/,"0")}&count=${(count > 10) ? 20 : ""}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: [],
        errors: {
            noResults: false
        }
    };

    dom.window.document.querySelectorAll(".bec586").forEach(el => {
        const title = el.querySelector("h3")?.textContent;
        const url = el.querySelector("a")?.href;
        const desc = el.querySelector("._3eded7")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });

    json.results = json.results.slice(offset - Number(offset.toString().replace(/.$/,"0")));

    return json;
}