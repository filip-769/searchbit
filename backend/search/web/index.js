import alexandria from "./alexandria.js";
import entfer from "./entfer.js";
import google from "./google.js";
import neeva from "./neeva.js";
import seznam from "./seznam.js";
import yandex from "./yandex.js";
import baidu from "./baidu.js";
import exactseek from "./exactseek.js";
import petal from "./petal.js";
import teclis from "./teclis.js";
import yessle from "./yessle.js";
import bing from "./bing.js";
import exalead from "./exalead.js";
import infotiger from "./infotiger.js";
import qwant from "./qwant.js";
import usearch from "./usearch.js";
import yioop from "./yioop.js";
import brave from "./brave.js";
import fairsearch from "./fairsearch.js";
import mojeek from "./mojeek.js";
import rightdao from "./rightdao.js";
import wiby from "./wiby.js";
import crawlson from "./crawlson.js";
import gigablast from "./gigablast.js";
import naver from "./naver.js";
import seekport from "./seekport.js";
import yacy from "./yacy.js";

export default async (engine, q, p) => {
    try {
        switch (engine) {
            case "alexandria":
                return await alexandria(q, p);
            case "entfer":
                return await entfer(q, p);
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
            case "exactseek":
                return await exactseek(q, p);
            case "petal":
                return await petal(q, p);
            case "teclis":
                return await teclis(q, p);
            case "yessle":
                return await yessle(q, p);
            case "bing":
                return await bing(q, p);
            case "exalead":
                return await exalead(q, p);
            case "infotiger":
                return await infotiger(q, p);
            case "qwant":
                return await qwant(q, p);
            case "usearch":
                return await usearch(q, p);
            case "yioop":
                return await yioop(q, p);
            case "brave":
                return await brave(q, p);
            case "fairsearch":
                return await fairsearch(q, p);
            case "mojeek":
                return await mojeek(q, p);
            case "rightdao":
                return await rightdao(q, p);
            case "wiby":
                return await wiby(q, p);
            case "crawlson":
                return await crawlson(q, p);
            case "gigablast":
                return await gigablast(q, p);
            case "naver":
                return await naver(q, p);
            case "seekport":
                return await seekport(q, p);
            case "yacy":
                return await yacy(q, p);
            default:
                return { results: [] };
        }
    } catch (error) {
        return { results: [] };
    }
}