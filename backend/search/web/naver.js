import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, p) => {
    const response = await fetch(`https://search.naver.com/search.naver?query=${encodeURIComponent(q)}&start=${(p-1)*15+1}&where=web`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: [],
        error: null
    };

    dom.window.document.querySelectorAll(".lst_total > li.bx").forEach(el => {
        const title = el.querySelector("a.link_tit")?.textContent?.trim();
        const url = el.querySelector("a.link_tit")?.href;
        const desc = el.querySelector(".dsc_txt")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    return json;
}