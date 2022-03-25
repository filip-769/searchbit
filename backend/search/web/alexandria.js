import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, p) => {
    const response = await fetch(`https://api.alexandria.org/?q=${encodeURIComponent(q)}`, {
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

    data?.results?.forEach(result => {
        json.results.push({
            title: result?.title,
            url: result?.url,
            desc: result?.snippet
        })
    })

    return json;
}