import { readFileSync } from "fs";
import { cwd } from "process";
import searchWeb from "./web/index.js";
import searchImage from "./image/index.js";

// read the config file
const config = JSON.parse(readFileSync(cwd()+"/config.json"));

export default async (e, q, p, t, d) => {
    const engines = config.supported[t??"web"];
    const engineWeight = config.weight[t??"web"];
    // only keep engines that exist
    const requestEngines = (e || engines).filter(x => engines.includes(x));
    const engineData = {};
    const allResults = {};
    const allResultsArray = [];

    requestEngines.forEach(async engine => {
        // query each engine and store the results
        let data;
        if(t === "image") {
            data = await searchImage(engine, q, (p || 1));
        } else {
            data = await searchWeb(engine, q, (p || 1));
        }
        engineData[engine] = data;
    })

    // Wait for all engines to finish
    const delay = (d <= 60000 && d >= 1) ? d : config.defaultDelay;
    await new Promise(resolve => {
        setTimeout(resolve, delay);
        setInterval(() => {
            if(Object.keys(engineData).length === requestEngines.length) {
                resolve();
            }
        }, 50)
    })

    for(const engine in engineData) {
        engineData[engine]?.results?.forEach(result => {
            try {
                // change http protocol to https
                result.url = result.url.replace("http://", "https://");
                // remove whitespaces from title
                result.title = result.title?.trim()?.replaceAll(/\.{3,}/g,"…")?.replace(/\s\s+/g, " ");
                // remove whitespaces from description and replace three dots with three dots character
                result.desc = result.desc?.trim()?.replaceAll(/\.{3,}/g,"…")?.replace(/\s\s+/g, " ");
                // remove www from url
                result.xurl = new URL(result.url.replace("://www.", "://")).href;
                // create formatted url
                result.formattedUrl = (new URL(result.url).hostname + new URL(result.url).pathname).slice(0, 75);
                if(result.img) result.img = config.imageProxyUrl + encodeURIComponent(result.img);
            } catch (error) {
                return;
            }
            if(!allResults[result.xurl]) {
                // if this is the first time we've seen this url, add it to the results
                result.engines = [ engine ];
                allResults[result.xurl] = result;
            } else {
                // if this is the longest description, set it as description
                if((result.desc?.length??0) > allResults[result.xurl].desc?.length) allResults[result.xurl].desc = result.desc;
                // if this is the longest title, set it as title
                if((result.title?.length??0) > allResults[result.xurl].title?.length) allResults[result.xurl].title = result.title;
                // add this engine to the list of engines
                allResults[result.xurl].engines.push(engine);
            }
            // remove duplicates and sort engines alphabetically
            allResults[result.xurl].engines = [...new Set(allResults[result.xurl].engines)].sort();
            let weight = 0;
            // add weight for each result
            allResults[result.xurl].engines.forEach(x => {
                weight += engineWeight[x];
            })
            // set weight
            allResults[result.xurl].weight = weight;
        })
    }

    // loop through all results and add them to the array
    for(const result in allResults) {
        // delete the xurl property
        delete allResults[result].xurl;
        // push the result to the array
        allResultsArray.push(allResults[result]);
    }

    // Sort by weight
    allResultsArray.sort((a, b) => b.weight - a.weight)

    return {
        results: allResultsArray
    }
}