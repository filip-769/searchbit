import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://search.naver.com/search.naver?query=${encodeURIComponent(q)}&start=${(p-1)*15+1}&where=web`, {
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