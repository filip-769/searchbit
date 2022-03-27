import fetch from "node-fetch";
import randomUserAgent from "user-agents";

export default async (q, p) => {
    const response = await fetch(`https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=&word=${encodeURIComponent(q)}&pn=${(p-1)*30}`, {
        headers: {
            "User-Agent": new randomUserAgent({ deviceCategory: "desktop"}).toString(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    })
    const data = JSON.parse((await response.text()).replaceAll("\\'", "'"));

    let json = {
        results: [],
        error: null
    };

    data.data.forEach(result => {
        // decoding the source webpage url
        const encoded = result.fromURL ?? result.fromJumpUrl;
        if(!encoded) return;
        let decoded = encoded.replaceAll("_z2C$q", ":").replaceAll("_z&e3B", ".").replaceAll("AzdH3F", "/");
        const map = { "w": "a", "k": "b", "v": "c", "1": "d", "j": "e", "u": "f", "2": "g", "i": "h", "t": "i", "3": "j", "h": "k", "s": "l", "4": "m", "g": "n", "5": "o", "r": "p", "q": "q", "6": "r", "f": "s", "p": "t", "7": "u", "e": "v", "o": "w", "8": "1", "d": "2", "n": "3", "9": "4", "c": "5", "m": "6", "0": "7", "b": "8", "l": "9", "a": "0" };
        const array = [];
        decoded.split("").forEach(ch => {
            if(map[ch]) {
                array.push(map[ch])
            } else {
                array.push(ch);
            }
        })
        decoded = array.join("");

        json.results.push({
            url: decoded,
            desc: result.fromPageTitleEnc,
            img: result.thumbURL
        });
    });
    return json;
}