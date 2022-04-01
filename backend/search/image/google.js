import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";

export default async (q, p) => {
    const response = await fetch(`https://www.google.com/search?q=${encodeURIComponent(q)}&lr=lang_en&tbm=isch&ijn=${p-1}&hl=en&asearch=arc&async=arc_id:srp_510,ffilt:all,ve_name:MoreResultsContainer,next_id:srp_5,use_ac:true,_id:arc-srp_510,_pms:qs,_fmt:pc`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);

    let json = {
        results: []
    };

    dom.window.document.querySelectorAll(".rg_bx.rg_di.rg_el.ivg-i").forEach(el => {
        const desc = el.querySelector(".mVDMnf.nJGrxf")?.textContent;
        const url = JSON.parse(el.querySelector(".rg_meta.notranslate")?.textContent).ru;
        const img = JSON.parse(el.querySelector(".rg_meta.notranslate")?.textContent).tu;
        json.results.push({
            url: url,
            desc: desc,
            img: img
        });
    });
    return json;
}