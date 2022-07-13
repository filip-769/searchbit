import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";

export default async (q, p) => {
    const response = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(q)}&tsc=ImageBasicHover&first=${(p-1)*35}`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);

    let json = {
        results: []
    };

    dom.window.document.querySelectorAll(".imgpt .iusc").forEach(el => {
        const desc = JSON.parse(el.getAttribute("m"))?.t?.replaceAll("\ue000", "")?.replaceAll("\ue001", "");
        const url = JSON.parse(el.getAttribute("m"))?.purl;
        const img = JSON.parse(el.getAttribute("m"))?.turl;
        json.results.push({
            url: url,
            desc: desc,
            img: img
        });
    });
    return json;
}