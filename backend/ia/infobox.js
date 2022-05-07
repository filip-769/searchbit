export default async q => {

    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&pretty=0&skip_disambig=1&no_redirect=1`);
    const json = await response.json();

    if(json?.AbstractText == "") return false;

    return {
        text: json?.AbstractText,
        source: json?.AbstractSource,
        url: json?.AbstractURL,
        title: json?.Heading,
        img: json?.Image == "" ? null : "/proxy?url=" + encodeURIComponent("https://duckduckgo.com" + json?.Image)
    }

}