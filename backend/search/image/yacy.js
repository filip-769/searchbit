import fetch from "node-fetch";
import randomUserAgent from "user-agents";

export default async (q, p) => {
    const response = await fetch(`https://yacy.searchlab.eu/yacysearch.json?query=${encodeURIComponent(q)}&startRecord=${(p-1)*10}&contentdom=image`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = await response.json();

    let json = {
        results: []
    };

    data.channels[0].items.forEach(result => {
        json.results.push({
            url: result.url,
            desc: result.title,
            img: result.image
        });
    });
    return json;
}