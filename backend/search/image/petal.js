import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";

export default async (q, p) => {
    const response = await fetch(`https://petalsearch.com/search?query=${encodeURIComponent(q)}&channel=image&pn=${p}`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);

    let json = {
        results: []
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