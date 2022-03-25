import fetch from "node-fetch";


export default async q => {

    let json;
    try {
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&pretty=0&skip_disambig=1&no_redirect=1`);
        json = await response.json();
    } catch (error) {
        return false;
    }

    if(json?.AbstractText == "") return false;

    return {
        text: json?.AbstractText,
        source: json?.AbstractSource,
        url: json?.AbstractURL,
        title: json?.Heading,
        image: json?.Image == "" ? null : "https://duckduckgo.com" + json?.Image
    }

}