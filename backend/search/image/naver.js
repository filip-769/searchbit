import getUserAgent from "../../../getUserAgent.js";

export default async (q, p) => {
    const response = await fetch(`https://s.search.naver.com/p/c/image/search.naver?query=${encodeURIComponent(q)}&start=${(p-1)*100}&display=100&json_type=6`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = JSON.parse((await response.text()).trim().slice(1, -1));

    let json = {
        results: []
    };

    data.items.forEach(result => {
        if(result.type !== "image") return;
        json.results.push({
            url: decodeURIComponent(result.link),
            desc: decodeURIComponent(result.title || result.desc),
            img: decodeURIComponent(result.thumb)
        });
    });
    return json;
}