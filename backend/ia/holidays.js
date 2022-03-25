import fetch from "node-fetch";

export default async q => {
        try {
        const supported = {"andorra":"ad","albania":"al","argentina":"ar","austria":"at","australia":"au","åland_islands":"ax","bosnia_and_herzegovina":"ba","barbados":"bb","belgium":"be","bulgaria":"bg","benin":"bj","bolivia":"bo","brazil":"br","bahamas":"bs","botswana":"bw","belarus":"by","belize":"bz","canada":"ca","switzerland":"ch","chile":"cl","china":"cn","colombia":"co","costa_rica":"cr","cuba":"cu","cyprus":"cy","czechia":"cz","germany":"de","denmark":"dk","dominican_republic":"do","ecuador":"ec","estonia":"ee","egypt":"eg","spain":"es","finland":"fi","faroe_islands":"fo","france":"fr","gabon":"ga","united_kingdom":"gb","grenada":"gd","guernsey":"gg","gibraltar":"gi","greenland":"gl","gambia":"gm","greece":"gr","guatemala":"gt","guyana":"gy","honduras":"hn","croatia":"hr","haiti":"ht","hungary":"hu","indonesia":"id","ireland":"ie","isle_of_man":"im","iceland":"is","italy":"it","jersey":"je","jamaica":"jm","japan":"jp","south_korea":"kr","liechtenstein":"li","lesotho":"ls","lithuania":"lt","luxembourg":"lu","latvia":"lv","morocco":"ma","monaco":"mc","moldova":"md","montenegro":"me","madagascar":"mg","north_macedonia":"mk","mongolia":"mn","montserrat":"ms","malta":"mt","mexico":"mx","mozambique":"mz","namibia":"na","niger":"ne","nigeria":"ng","nicaragua":"ni","netherlands":"nl","norway":"no","new_zealand":"nz","panama":"pa","peru":"pe","papua_new_guinea":"pg","poland":"pl","puerto_rico":"pr","portugal":"pt","paraguay":"py","romania":"ro","serbia":"rs","russia":"ru","sweden":"se","singapore":"sg","slovenia":"si","svalbard_and_jan_mayen":"sj","slovakia":"sk","san_marino":"sm","suriname":"sr","el_salvador":"sv","tunisia":"tn","turkey":"tr","ukraine":"ua","united_states":"us","uruguay":"uy","vatican_city":"va","venezuela":"ve","vietnam":"vn","south_africa":"za","zimbabwe":"zw"};
        let countryCode;
        for(const country in supported) {
            if(q.replaceAll(/public|holidays|in /g, "").trim().toLowerCase().replaceAll(" ", "_")===country) {
                countryCode = supported[country];
            }
        }
        if(!countryCode) return false;
        const response = await fetch(`https://date.nager.at/api/v2/publicholidays/${new Date().getFullYear()}/${countryCode}`);
        const json = await response.json();
        const data = [];
        json?.forEach(holiday => {
            data.push({
                date: holiday?.date?.replaceAll("-", "/"),
                name: holiday?.name,
                localName: holiday?.localName
            })
        })
        return data;
    } catch (error) {
        return false;
    }
}