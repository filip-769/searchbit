import getUserAgent from "../../../getUserAgent.js";


export default async (q) => {
    const response = await fetch(`https://s1.crawlson.com/worker_search.php?q=${encodeURIComponent(q)}`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.json();

    let json = {
        results: []
    };

    data?.forEach(result => {
        if(result.server === "s1.crawlson.com") return;
        json.results.push({
            title: result?.title,
            url: "https://" + result?.url,
            desc: result?.description
        })
    })
    return json;
}