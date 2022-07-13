import jsdom from "jsdom";
import getUserAgent from "../../getUserAgent.js";

export default async q => {
    const response = await fetch(`https://who.is/whois/${encodeURIComponent(q.replace(/whois/i, "").trim())}`, {
        headers: {
            "User-Agent": getUserAgent(),
            "Accept-Language": "en, *;q=0.5",
            "Accept": "*/*"
        }
    });
    const data = await response.text();
    const dom = new jsdom.JSDOM(data);

    const rawWhois = dom.window.document.querySelector("pre")?.textContent;

    const parsedWhois = rawWhois
        .split("\n")
        .filter(x => !x.startsWith("% "))
        .map(x => x.slice(0, 1).toUpperCase() + x.slice(1))
        .join("\n")
        .trim();

    if(!parsedWhois || rawWhois.includes("This query returned 0 objects")) return;

    return { whois: parsedWhois };
}