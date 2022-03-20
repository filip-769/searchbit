import searchGoogle from "./google.js";
import searchBing from "./bing.js";
import searchBrave from "./brave.js";
import searchMojeek from "./mojeek.js";
import searchGigablast from "./gigablast.js";
import searchQwant from "./qwant.js";
import searchSeznam from "./seznam.js";
import searchYandex from "./yandex.js";
import searchYacy from "./yacy.js";
import searchNaver from "./naver.js";
import searchBaidu from "./baidu.js";
import searchUsearch from "./usearch.js";

function engineToFunc(engine) {
    switch (engine.toLowerCase()) {
        case "google":
            return searchGoogle;
        case "bing":
            return searchBing;
        case "brave":
            return searchBrave;
        case "mojeek":
            return searchMojeek;
        case "gigablast":
            return searchGigablast;
        case "qwant":
            return searchQwant;
        case "seznam":
            return searchSeznam;
        case "yandex":
            return searchYandex;
        case "yacy":
            return searchYacy;
        case "naver":
            return searchNaver;
        case "baidu":
            return searchBaidu;
        case "usearch":
            return searchUsearch;
        default:
            return false;
    }
}

export default async (engine, q, type, offset, count, geo, lang, proxy) => {
    if(!type) type = "web";
    if(!offset) offset = 0;
    if(!count) count = 10;
    if(
        (typeof offset !== "number" || offset < 0) ||
        (typeof count !== "number" || count < 1) ||
        (type !== "web") ||
        !q
      ) return { error: "invalid_parameters" };

    const func = engineToFunc(engine);
    if(!func) return { error: "invalid_parameters" };

    try {
        const result = await func(q, type, offset, count);
        return result;
    } catch (error) {
        return {
            errors: {
                unknown: true
            }
        }
    }
    /*let result3;
    let result2;

    if(result.results.length > count) {
        result.results = result.results.slice(0, count);
    } else if (result?.results.length < count) {
        result2 = await func(q, type, result.results.length+offset, count+10);
        result3 = JSON.parse(JSON.stringify(result));
        result3.results = [...result.results, ...result2.results];
        result3.results = result3.results.slice(0, count);
    }
    return result3 || result;*/
}