import jsdom from "jsdom";
import randomUserAgent from "../../../randomUserAgent.js";


export default async (q) => {
    const response = await fetch(`https://www.yessle.com/index.php`, {
        headers: {
            "User-Agent": randomUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        },
        method: "POST",
        body: JSON.stringify({
            keyword: q
        })
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: []
    };

    dom.window.document.querySelectorAll(".item").forEach(el => {
        const title = el.querySelector("a").textContent;
        const url = el.querySelector("a").href;
        const desc = el.querySelector("p").textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    })
    return json;
}