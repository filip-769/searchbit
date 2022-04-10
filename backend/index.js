import instantAnswers from "./ia/index.js";
import search from "./search/index.js";
import searchAutocomplete from "./search/autocomplete/index.js";

export default async (e, q, p, t, c) => {
    if(t === "autocomplete") {
        return await searchAutocomplete(e[0], q);
    }
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



/*

    if(/(^| )!\w+/.test(req.query.q)) {
        
    }

*/