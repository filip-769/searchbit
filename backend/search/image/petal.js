import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";

export default async (q, p) => {
    const response = await fetch(`https://petalsearch.com/search?query=${encodeURIComponent(q)}&channel=image&pn=${p}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);

    let json = {
        results: [],
        error: null
    };
    const petalJson = JSON.parse(dom.window.document.querySelector("script#common").textContent.replace("<div></div>", ""));

    petalJson.newImages.forEach(item => {
        const desc = item.title;
        const url = item.url;
        const img = item.image;
        json.results.push({
            url: url,
            desc: desc,
            img: img
        });
    });
    return json;
}