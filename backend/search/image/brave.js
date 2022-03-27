import fetch from "node-fetch";
import randomUserAgent from "user-agents";

export default async (q) => {
    const response = await fetch(`https://search.brave.com/api/images?q=${encodeURIComponent(q)}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = await response.json();

    let json = {
        results: [],
        error: null
    };

    data.results.forEach(result => {
        json.results.push({
            url: result.url,
            desc: result.title,
            img: result.thumbnail.src
        });
    });
    return json;
}