import randomUserAgent from "../../../randomUserAgent.js";

export default async (q) => {
    const response = await fetch(`https://search.brave.com/api/images?q=${encodeURIComponent(q)}`, {
        headers: {
            "User-Agent": randomUserAgent(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = await response.json();

    let json = {
        results: []
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