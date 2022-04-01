import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, p) => {
    const response = await fetch(`https://yandex.com/images/search?text=${encodeURIComponent(q)}&p=${p-1}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: []
    };

    dom.window.document.querySelectorAll(".serp-item[data-bem]").forEach(el => {
        const desc = JSON.parse(el.getAttribute("data-bem"))["serp-item"].snippet.title;
        const url = JSON.parse(el.getAttribute("data-bem"))["serp-item"].snippet.url;
        const img = "https://" + JSON.parse(el.getAttribute("data-bem"))["serp-item"].thumb.url.slice(2);
        json.results.push({
            url: url,
            desc: desc,
            img: img
        });
    });

    return json;
}