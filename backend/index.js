import instantAnswers from "./ia/index.js";
import search from "./search/index.js";


export default async (q, p, engines) => {
    return {
        instantAnswers: await instantAnswers(q),
        searchResults: await search(q, engines)
    }
}



/*

    if(/(^| )!\w+/.test(req.query.q)) {
        
    }

*/