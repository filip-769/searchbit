import getUserAgent from "../../../getUserAgent.js";


export default async (q) => {
    const response = await fetch(`https://www.crawlson.com/search?q=${encodeURIComponent(q)}`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        }
    })

    
    const html = await response.text();

    const fetchurl = html.match(/https:\/\/s.\.crawlson\.com\/worker_search\.php\?q=.+&key=.+'/g)[0].slice(0, -1);

    const response2 = await fetch(fetchurl, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5"
        }
    })

    const data = await response2.json();

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