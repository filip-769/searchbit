import jsdom from "jsdom";
//import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://www.bing.com/search?q=${encodeURIComponent(q)}&first=${(p - 1) * 10 + 1}&cc=clear`, {
        headers: {
            // bing will return tracking urls when using firefox user agent
            "User-Agent": /* getUserAgent() */ "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100 Safari/537.36",
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: []
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