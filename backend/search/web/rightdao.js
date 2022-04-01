import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, p) => {
    const response = await fetch(`https://rightdao.com/search?q=${encodeURIComponent(q)}&s=${(p-1)*12+1}`, {
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

    dom.window.document.querySelectorAll(".item").forEach(el => {
        const title = el.querySelector("a")?.textContent;
        let url;
        try {
            url = new URL(el.querySelector("a")?.href, "https://rightdao.com").searchParams.get("url");
        } catch (error) {
            return;
        }
        const desc = el.querySelector(":nth-child(2)")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    return json;
}