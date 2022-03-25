import { readFileSync } from "fs";
import search from "./web/index.js";
import { cwd } from "process";

const config = JSON.parse(readFileSync(cwd()+"/config.json"));

export default async (e, q, p) => {
    const engineWeight = config.engineWeight;
    const engines = Object.keys(config.engineWeight);
    const requestEngines = (e || engines).filter(x => engines.includes(x));
    const engineData = {};
    const engineErrors = {};
    const allResults = {};
    const allResultsArray = [];

    requestEngines.forEach(async engine => {
        const data = await search(engine, q);
        engineData[engine] = data;
    })

    await delay(10);

    for(const engine in engineData) {
        engineErrors[engine] = engineData[engine].error;
        engineData[engine]?.results?.forEach(result => {
            try {
                result.url = result.url.replace("http://","https://");
                result.title = result.title.trim().replace(/\s\s+/g, " ");
                result.desc = result.desc.trim().replaceAll("...","…").replace(/\s\s+/g, " ");
                result.xurl = new URL(result.url.replace("://www.", "://")).href;
            } catch (error) {
                return;
            }
            if(!allResults[result.xurl]) {
                result.engines = [ engine ];
                allResults[result.xurl] = result;
            } else {
                if(result.desc.length > allResults[result.xurl].desc.length) allResults[result.xurl].desc = result.desc;
                if(result.title.length > allResults[result.xurl].title.length) allResults[result.xurl].title = result.title;
                allResults[result.xurl].engines.push(engine);
            }
            allResults[result.xurl].engines = [...new Set(allResults[result.xurl].engines)].sort();
            let weight = 0;
            allResults[result.xurl].engines.forEach(x => {
                weight += engineWeight[x];
            })
            allResults[result.xurl].weight = weight;
        })
    }

    for(const result in allResults) {
        delete allResults[result].xurl;
        allResultsArray.push(allResults[result]);
    }

    allResultsArray.sort((a, b) => b.weight - a.weight)

    requestEngines.forEach(engine => {
        if(engineErrors[engine] === undefined) {
            engineErrors[engine] = "timedOut";
        }
    })

    return {
        errors: engineErrors,
        results: allResultsArray
    }
}

function delay(x) {
    return new Promise(resolve => {
      setTimeout(() => resolve(2), x*1000);
    })
}