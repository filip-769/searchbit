import jsdom from "jsdom";
import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
   const cookie = (await fetch("https://neeva.com/preview", { redirect: "manual" }))
                  .headers.get("Set-Cookie")?.split("httpd~preview=")?.[1]?.split(";")?.[0]

    const response = await fetch(`https://neeva.com/search?q=${encodeURIComponent(q)}&page=${p}`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5",
            "Cookie": `httpd~preview=${cookie}`
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: []
    };

    dom.window.document.querySelectorAll(".result-container__wrapper-38pV8").forEach(el => {
        const title = el.querySelector("a.lib-doc-title__link-1b9rC[href]")?.textContent;
        const url = el.querySelector("a.lib-doc-title__link-1b9rC[href]")?.href;
        const desc = el.querySelector(".lib-doc-snippet__component-3ewW6")?.textContent;
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    return json;
}