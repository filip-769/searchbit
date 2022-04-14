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
    if(l) q = `${q} ${l}`;
    if(t === "web" || !t) {
        let searchData;
        let iaData;

        instantAnswers(q).then(data => iaData = data);
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
    } else {
        return {
            searchResults: await search(e, q, p, t, c)
        }
    }
}