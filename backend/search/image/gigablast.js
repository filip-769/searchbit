import jsdom from "jsdom";
import randomUserAgent from "../../../randomUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://gigablast.com/search?q=${encodeURIComponent(q)}&searchtype=images&format=json&fromjs=1&s=${(p-1)*30}`, {
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
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5"
        }
    });
    const data2 = await response2.json();
    let json = {
        results: []
    };

    data2?.results?.forEach(result => {
        json.results.push({
            desc: result?.title,
            url: result?.url,
            img: result?.imageUrl
        })
    })
    return json;
}