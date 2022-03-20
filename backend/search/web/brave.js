import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, type) => {
    const response = await fetch(`https://search.brave.com/search?q=${encodeURIComponent(q)}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: [],
        errors: {
            captcha: !!dom.window.document.querySelector("script#js-captcha-challenge"),
            noResults: !!document.querySelector("[src='https://cdn.search.brave.com/serp/v1/static/img/1588b881ec94d6f18b4fdfb8938877392f944fa807caf0f4796115a03d5d8185-graphic-alt-results-dark.svg']")
        }
    };

    dom.window.document.querySelectorAll("#results > .snippet.fdb").forEach(el => {
        const title = el.querySelector("span")?.textContent?.replaceAll(/\n */g, "");
        const url = el.querySelector("a")?.href;
        const desc = el.querySelector("p")?.textContent?.replaceAll(/\n */g, "");
        json.results.push({
            title: title,
            url: url,
            desc: desc
        });
    });
    return json;
}