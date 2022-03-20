import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, type, offset, count) => {
    const response = await fetch(`https://www.bing.com/search?q=${encodeURIComponent(q)}&first=${offset+1}&count=${count}`, {
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
            noResults: !!document.querySelector(".b_no")
        }
    };

    dom.window.document.querySelectorAll("#b_results > .b_algo").forEach(el => {
        const title = el.querySelector("h2")?.textContent;
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