import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, type, offset, count) => {
    const response = await fetch(`https://yacy.searchlab.eu/yacysearch.json?query=${encodeURIComponent(q)}&maximumRecords=${count}&startRecord=${offset}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.json();
    let json = {
        results: [],
        errors: {
            noResults: false
        }
    };

    data?.channels[0]["items"].forEach(result => {
        json.results.push({
            title: result?.title,
            url: result?.link,
            desc: result?.description
        })
    })
    return json;
}