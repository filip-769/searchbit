import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://www.yioop.com/?q=${encodeURIComponent(q)}&limit=${(p-1)*10}`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: []
    };

    dom.window.document.querySelectorAll(".result").forEach(el => {
        const title = el.querySelector("h2 a[rel=nofollow]")?.textContent;
        const url = el.querySelector("h2 a[rel=nofollow]")?.href;
        el.querySelectorAll("div,h2").forEach(x => x.remove());
        const desc = el?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });

    return json;
}