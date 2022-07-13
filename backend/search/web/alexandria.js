import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://api.alexandria.org/?q=${encodeURIComponent(q)}&p=${p}`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.json();
    let json = {
        results: []
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