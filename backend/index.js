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

    const data = await Promise.all
        ([
            search(e, q, p, t, c),
            (t === "web" && p === 1) ? instantAnswers(q) : []
        ])
    return {
        q: q,
        searchResults: data[0],
        instantAnswers: data[1]
    }
}