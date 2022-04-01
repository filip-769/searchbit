import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, p) => {
    // we need to get the verification cookie to access the search results
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
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
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