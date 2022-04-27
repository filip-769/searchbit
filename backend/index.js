import instantAnswers from "./ia/index.js";
import search from "./search/index.js";
import searchAutocomplete from "./search/autocomplete/index.js";
import { readFileSync } from "fs";
import { cwd } from "process";

export default async (e, q, p, t, c) => {
    for (const x in c.quickShortcuts) {
        q = q.replaceAll(`@${x}`, c.quickShortcuts[x]);
    }
    if(t === "autocomplete") {
        return await searchAutocomplete(e[0], q);
    }
    if(/^!\w+ /.test(q)) {
        try {
            const bangs = JSON.parse(readFileSync(cwd()+"/bangs.json"));
            const url = bangs[q.split(" ")[0].slice(1).toLowerCase()];
            return {
                redirect: url.replace("{searchTerms}", encodeURIComponent(q.replace(/^!\w+ /, "")))
            }
        } catch (error) {
            console.error(error);
        }
    }
    let searchData;
    let iaData;

    if(t === "web" && p === 1) { instantAnswers(q).then(data => iaData = data) } else { iaData = [] };
    search(e, q, p, t, c).then(data => searchData = data);

    await new Promise(resolve => {
        setInterval(() => {
            if(typeof searchData === "object" && typeof iaData === "object") {
                resolve();
            }
        }, 10)
    })
    return {
        q: q,
        instantAnswers: iaData,
        searchResults: searchData
    }
}