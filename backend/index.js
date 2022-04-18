import instantAnswers from "./ia/index.js";
import search from "./search/index.js";
import searchAutocomplete from "./search/autocomplete/index.js";
import { readFileSync } from "fs";
import { cwd } from "process";

export default async (e, q, p, t, c, l) => {
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

    if(!t || t === "web") { instantAnswers(q).then(data => iaData = data) } else { iaData = [] };
    if(l || c?.lenses?.default) q = `${q} ${l ?? c?.lenses?.default}`;
    search(e, q, p, t, c).then(data => searchData = data);

    await new Promise(resolve => {
        setInterval(() => {
            if(typeof searchData === "object" && typeof iaData === "object") {
                resolve();
            }
        }, 10)
    })
    return {
        instantAnswers: iaData,
        searchResults: searchData
    }
}