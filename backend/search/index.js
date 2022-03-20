import searchWeb from "./web/index.js";

const engines = ["baidu","bing","brave","gigablast","google","mojeek","naver","qwant","seznam","usearch","yacy","yandex"];

export default async (q) => {
    
}

function delay(x) {
    return new Promise(resolve => {
      setTimeout(() => resolve(2), x*1000);
    })
}