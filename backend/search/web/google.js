import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, type, offset, count) => {
    const response = await fetch(`https://www.google.com/search?q=${encodeURIComponent(q)}&hl=en&num=${count}&start=${offset}`, {
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
            captcha: new URL(response.url).pathname === "/sorry/index",
            noResults: !!document.querySelector(".rcVM6e")
        }
    };

    dom.window.document.querySelectorAll("#rso > .g").forEach(el => {
        const title = el.querySelector(".LC20lb.DKV0Md")?.textContent;
        const url = el.querySelector(".yuRUbf > a")?.href;
        const desc = el.querySelector(".VwiC3b.MUxGbd.yDYNvb.lyLwlc.lEBKkf")?.textContent ?? el.querySelector(".aCOpRe.ljeAnf")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    return json;
}