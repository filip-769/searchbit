import fetch from "node-fetch";
import randomUserAgent from "user-agents";

export default async (q, p) => {
    const response = await fetch(`https://usearch.com/api/Search/GetImageSearch?q=${encodeURIComponent(q)}&pageSize=35&pageNumber=${p}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = await response.json();

    let json = {
        results: [],
        error: null
    };

    data.images.forEach(result => {
        json.results.push({
            url: result.webpageUrl,
            desc: result.imageTitle,
            img: result.imageThumbnail
        });
    });
    return json;
}