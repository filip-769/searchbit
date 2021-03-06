import getUserAgent from "../../../getUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://wiby.org/json/?q=${encodeURIComponent(q)}&o=${(p-1)*12}`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.json();
    let json = {
        results: []
    };

    data?.forEach((result, i) => {
        if(data.length === (i+1)) return;
        json.results.push({
            title: result?.Title,
            url: result?.URL,
            desc: result?.Snippet
        })
    })


    return json;
}