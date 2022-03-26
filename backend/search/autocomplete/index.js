import fetch from "node-fetch";

const autocompleteUrls = {
    alexandria: false,
    baidu: false,
    bing: "https://api.bing.com/osjson.aspx?query={searchTerms}&form=OSDJAS",
    brave: "https://search.brave.com/api/suggest?q={searchTerms}",
    crawlson: false,
    entfer: false,
    exactseek: false,
    exalead: "https://www.exalead.com/search/suggest/?q={searchTerms}&format=json",
    fairsearch: "https://api.fairsearch.com/ac/?query={searchTerms}&os=true",
    gigablast: false,
    google: "https://suggestqueries.google.com/complete/search?output=firefox&client=firefox&hl=en&q={searchTerms}",
    infotiger: false,
    mojeek: false,
    naver: "https://ac.search.naver.com/nx/ac?of=os&ie=UTF-8&q={searchTerms}&oe=UTF-8",
    neeva: "https://neeva.com/suggest?q={searchTerms}&src=opensearch",
    petal: false,
    qwant: "https://api.qwant.com/v3/suggest/?q={searchTerms}&client=opensearch",
    rightdao: false,
    seekport: false,
    seznam: "https://suggest.seznam.cz/fulltext_ff?phrase={searchTerms}",
    teclis: false,
    usearch: "https://usearch.com/api/spelling/autocomplete?Text={searchTerms}",
    wiby: false,
    yacy: "https://yacy.searchlab.eu/suggest.json?q={searchTerms}",
    yandex: "https://suggest.yandex.com/suggest-ff.cgi?part={searchTerms}&uil=en",
    yessle: false,
    yioop: false
}

export default async (engine, q) => {
    try {
        const response = await fetch(autocompleteUrls[engine].replace("{searchTerms}", encodeURIComponent(q)));
        const data = await response.json();
        return [q, data[1]??data[0]];
    } catch (error) {
        return [q, []];
    }
}