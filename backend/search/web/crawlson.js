import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, p) => {
    const response = await fetch(`https://s1.crawlson.com/worker_search.php?q=${encodeURIComponent(q)}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.json();

    let json = {
        results: [],
        error: null
    };

    data?.forEach(result => {
        json.results.push({
            title: result?.title,
            url: "https://" + result?.url,
            desc: result?.description
        })
    })
    return json;
}