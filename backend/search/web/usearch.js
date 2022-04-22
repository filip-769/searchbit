import randomUserAgent from "../../../randomUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://usearch.com/api/Search/GetWebSearch?q=${encodeURIComponent(q)}&pageSize=10&pageNumber=${p}`, {
        headers: {
            "User-Agent": randomUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.json();
    let json = {
        results: []
    };

    data?.contents?.forEach(result => {
        json.results.push({
            title: result?.title,
            url: result?.url,
            desc: result?.snippet.replaceAll("<b>","").replaceAll("</b>","")
        })
    })

    return json;
}