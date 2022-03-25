import jsdom from "jsdom";
import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, p) => {
    const response = await fetch(`https://gigablast.com/search?q=${encodeURIComponent(q)}&format=json&fromjs=1`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);
    const script = dom.window.document.querySelector("body").getAttribute("onLoad");
    const part1 = script.match(/\'(.*?)\'/g)[0].slice(1, -1);
    const part2 = script.match(/\'(.*?)\'/g)[1].slice(1, -1);
    const url = `https://gigablast.com${part1}${part2}`;
    const response2 = await fetch(url, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5"
        }
    });
    const data2 = await response2.json();
    let json = {
        results: [],
        error: null
    };

    data2?.results?.forEach(result => {
        json.results.push({
            title: result?.title,
            url: result?.url,
            desc: result?.sum
        })
    })
    return json;
}