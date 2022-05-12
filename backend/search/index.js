import searchWeb from "./web/index.js";
import searchImage from "./image/index.js";

export default async (e, q, p, t, c) => {
    const engineData = {};
    const allResults = {};
    let allResultsArray = [];

    e = e.filter(x => c.engines?.[t]?.[x] && c.engines[t][x] > 0);
    e.sort((a, b) => c.engines[t][b] - c.engines[t][a]);

    e.forEach(async engine => {
        // query each engine and store the results
        if(t === "image") {
            engineData[engine] = await searchImage(engine, q, p);
        } else {
            engineData[engine] = await searchWeb(engine, q, p);
        }
    })

    // Wait for all engines to finish

    await new Promise(resolve => {
        setTimeout(resolve, c.delay);
        setInterval(() => {
            if(Object.keys(engineData).length === e.length) {
                resolve();
            }
        }, 1)
    })

    for(const engine in engineData) {
        engineData[engine]?.results?.forEach(result => {
            try {
                // change http protocol to https
                result.url = result.url.replace(/^http:\/\//, "https://");
                // remove whitespaces from title
                result.title = result.title?.trim()?.replaceAll(/\.{3,}/g,"…")?.replace(/\s\s+/g, " ");
                // remove whitespaces from description and replace three dots with three dots character
                result.desc = result.desc?.trim()?.replaceAll(/\.{3,}/g,"…")?.replace(/\s\s+/g, " ");
                // remove www from url
                result.xurl = new URL(result.url.replace(/^https:\/\/www\./, "https://")).href;
                // create formatted url
                result.formattedUrl = result.xurl.replace(/https:\/\//, "");
                // add icon
                result.icon = "/proxy?url=" + encodeURIComponent(`https://icons.duckduckgo.com/ip3/${new URL(result.url).hostname}.ico`);
                if(result.img) result.img = "/proxy?url=" + encodeURIComponent(result.img);
            } catch (error) {
                return;
            }
            if(!allResults[result.xurl]) {
                // if this is the first time we've seen this url, add it to the results
                result.engines = [ engine ];
                result.titleEngine = engine;
                result.descEngine = engine;
                allResults[result.xurl] = result;
            } else {
                // if this is the longest description, set it as description
                if(c.engines[t][allResults[result.xurl].descEngine] < c.engines[t][engine]) {
                    allResults[result.xurl].desc = result.desc;
                };
                // if this is the longest title, set it as title
                if(c.engines[t][allResults[result.xurl].titleEngine] < c.engines[t][engine]) {
                    allResults[result.xurl].title = result.title;
                };
                // add this engine to the list of engines
                allResults[result.xurl].engines.push(engine);
            }
            // remove duplicates and sort engines alphabetically
            allResults[result.xurl].engines = [...new Set(allResults[result.xurl].engines)].sort();
            let weight = 0;
            // add weight for each result
            allResults[result.xurl].engines.forEach(x => {
                weight += c.engines[t][x];
            })
            // set weight
            allResults[result.xurl].weight = weight;
        })
    }

    // loop through all results and add them to the array
    for(const result in allResults) {
        // delete the xurl property
        delete allResults[result].xurl;
        delete allResults[result].titleEngine;
        delete allResults[result].descEngine;
        // push the result to the array
        allResultsArray.push(allResults[result]);
    }

    // Sort by weight
    allResultsArray.sort((a, b) => b.weight - a.weight);
    allResultsArray = allResultsArray.filter((x, i) => c.maximumResults[t] > i);
    for (const type in c.filters) {
        c.filters[type].forEach(x => {
            const regex = new RegExp(x, "mi");
            allResultsArray = allResultsArray.filter(y => !regex.test(y[type]));
        })
    }
    return {
        results: allResultsArray
    }
}