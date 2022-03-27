import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, p) => {
    const response = await fetch(`https://www.google.com/search?q=${encodeURIComponent(q)}&start=${(p-1)*10}&hl=en&asearch=arc&async=arc_id:srp_510,ffilt:all,ve_name:MoreResultsContainer,next_id:srp_5,use_ac:true,_id:arc-srp_510,_pms:qs,_fmt:pc`, {
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
        error: (
            new URL(response.url).pathname === "/sorry/index" ? "captcha" : null
        )
    };

    dom.window.document.querySelectorAll("div.g").forEach(el => {
        const title = el.querySelector("h3.LC20lb")?.textContent;
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