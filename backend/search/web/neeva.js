import jsdom from "jsdom";
import randomUserAgent from "../../../randomUserAgent.js";


export default async (q, p) => {
    // neeva seems to changed their internal API, so it will probably throw an error
    // TODO: fix
    const cookie = 
        (
            await fetch(
                new URL(
                    ( await fetch(`https://neeva.com/search?q=${encodeURIComponent(q)}`, { redirect: "manual" } ) )
                        .headers.get("location"), "https://neeva.com"
                ).href, { redirect: "manual" }
            )
        ).headers.get("set-cookie").split("httpd~preview=")[1].split(";")[0]

    const response = await fetch(`https://neeva.com/search?q=${encodeURIComponent(q)}&page=${p}`, {
        headers: {
            "User-Agent": randomUserAgent(),
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