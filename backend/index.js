import instantAnswers from "./ia/index.js";
import search from "./search/index.js";
import searchAutocomplete from "./search/autocomplete/index.js";
import { readFileSync } from "fs";
import { cwd } from "process";

// read the config file
const config = JSON.parse(readFileSync(cwd()+"/config.json"));

export default async (e, q, p, t) => {
    if(t === "autocomplete") {
        return await searchAutocomplete((e[0]??config.defaultAutocomplete), q);
    }
    return {
        instantAnswers: await instantAnswers(q),
        searchResults: await search(e, q, p, t)
    }
}



/*

    if(/(^| )!\w+/.test(req.query.q)) {
        
    }

*/