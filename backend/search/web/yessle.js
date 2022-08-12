import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";


export default async (q) => {
    const response = await fetch(`https://www.yessle.com/index.php`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: `your_name=John&keyword=${encodeURIComponent(q)}`
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