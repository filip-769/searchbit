import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, type, offset, count) => {
    const response = await fetch(`https://yandex.com/search/?text=${encodeURIComponent(q)}&p=${offset.toString().replace(/.$/,"")}`, {
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
            captcha: new URL(response.url).pathname === "/showcaptcha",
            noResults: false
        }
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

    json.results = json.results.slice(offset - Number(offset.toString().replace(/.$/,"0")));

    return json;
}