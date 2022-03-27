import google from "./google.js";
import seznam from "./seznam.js";
import yandex from "./yandex.js";
import baidu from "./baidu.js"
import petal from "./petal.js";
import bing from "./bing.js";
import usearch from "./usearch.js";
import brave from "./brave.js";
import naver from "./naver.js";
import gigablast from "./gigablast.js";
import yacy from "./yacy.js";


export default async (engine, q, p) => {
    try {
        switch (engine) {
            case "google":
                return await google(q, p);
            case "neeva":
                return await neeva(q, p);
            case "seznam":
                return await seznam(q, p);
            case "yandex":
                return await yandex(q, p);
            case "baidu":
                return await baidu(q, p);
            case "petal":
                return await petal(q, p);
            case "bing":
                return await bing(q, p);
            case "qwant":
                return await qwant(q, p);
            case "usearch":
                return await usearch(q, p);
            case "brave":
                return await brave(q, p);
            case "gigablast":
                return await gigablast(q, p);
            case "naver":
                return await naver(q, p);
            case "yacy":
                return await yacy(q, p);
            default:
                return;
        }
    } catch (error) {
        console.error(error)
        return;
    }
}