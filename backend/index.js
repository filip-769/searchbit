import instantAnswers from "./ia/index.js";
import search from "./search/index.js";


export default async (engines, q, p) => {
    return {
        instantAnswers: await instantAnswers(q),
        searchResults: await search(engines, q, p)
    }
}



/*

    if(/(^| )!\w+/.test(req.query.q)) {
        
    }

*/