import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export default async (q, p) => {
    const response = await fetch(`http://www.baidu.com/s?wd=${encodeURIComponent(q)}&pn=${10*(p-1)}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    let json = {
        results: []
    };

    await asyncForEach(dom.window.document.querySelectorAll(".result.c-container.new-pmd"), async el => {
        const title = el.querySelector("h3")?.textContent;
        const url = el.querySelector("a")?.href;
        const desc = el.querySelector(".c-abstract")?.textContent;
        // we need to fetch the url from the results page to get the actual url
        const completeUrl = (await fetch(url, {redirect:"manual"}))?.headers?.get("Location");
        json.results.push({
            title: title,
            url: completeUrl,
            desc: desc
        });
    });
    return json;
}