import randomUserAgent from "../../../randomUserAgent.js";


export default async (q, p) => {
    const response = await fetch(`https://api.qwant.com/v3/search/web?q=${encodeURIComponent(q)}&locale=en_GB&offset=${(p-1)*10}`, {
        headers: {
            "User-Agent": randomUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        }
    })
    const data = await response.json();
    let json = {
        results: []
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

    return json;
}