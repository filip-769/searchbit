import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, type, offset, count) => {
    const response = await fetch(`https://usearch.com/api/Search/GetWebSearch?q=${encodeURIComponent(q)}&pageNumber=${Number(offset.toString().replace(/.$/,""))+1}&pageSize=10`, {
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

    data?.contents?.forEach(result => {
        json.results.push({
            title: result?.title,
            url: result?.url,
            desc: result?.snippet
        })
    })

    json.results = json.results.slice(offset - Number(offset.toString().replace(/.$/,"0")));

    return json;
}