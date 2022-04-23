import jsdom from "jsdom";
import randomUserAgent from "../../../randomUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://gigablast.com/search?q=${encodeURIComponent(q)}&format=json&fromjs=1&s=${(p-1)*25}`, {
        headers: {
            "User-Agent": randomUserAgent(),
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
            "User-Agent": randomUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        }
    });
    const data2 = await response2.json();
    let json = {
        results: []
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