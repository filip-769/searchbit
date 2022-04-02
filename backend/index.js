import instantAnswers from "./ia/index.js";
import search from "./search/index.js";
import searchAutocomplete from "./search/autocomplete/index.js";

export default async (e, q, p, t, c) => {
    if(t === "autocomplete") {
        return await searchAutocomplete(e[0], q);
    }
    if(t === "web" || !t) {
        return {
            instantAnswers: await instantAnswers(q),
            searchResults: await search(e, q, p, t, c)
        }
    } else {
        return {
            searchResults: await search(e, q, p, t, c)
        }
    }
}



/*

    if(/(^| )!\w+/.test(req.query.q)) {
        
    }

*/