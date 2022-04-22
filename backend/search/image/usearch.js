import randomUserAgent from "../../../randomUserAgent.js";

export default async (q, p) => {
    const response = await fetch(`https://usearch.com/api/Search/GetImageSearch?q=${encodeURIComponent(q)}&pageSize=35&pageNumber=${p}`, {
        headers: {
            "User-Agent": randomUserAgent(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = await response.json();

    let json = {
        results: []
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