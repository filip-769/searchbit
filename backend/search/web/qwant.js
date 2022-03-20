import fetch from "node-fetch";
import randomUserAgent from "user-agents";


export default async (q, type, offset, count) => {
    const response = await fetch(`https://api.qwant.com/v3/search/web?q=${encodeURIComponent(q)}&locale=en_GB&offset=${offset.toString().replace(/.$/,"0")}`, {
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

    data?.data?.result?.items?.mainline?.forEach(mainline => {
        if(mainline?.type === "web") {
            mainline?.items?.forEach(result => {
                json.results.push({
                    title: result?.title,
                    url: result?.url,
                    desc: result?.desc
                })
            });
        }
    })

    json.results = json.results.slice(offset - Number(offset.toString().replace(/.$/,"0")));

    return json;
}