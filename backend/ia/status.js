import fetch from "node-fetch";

export default async q => {
        const data = q.replace("status", "").replace(/^is /, "").replace("?", "").replace(/ down$/, "").replace(/ up$/, "").trim();
        let domain;
        if(/^.+\..+$/.test(data)) {
            domain = data;
        } else {
            const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(data)}`);
            const json = await response.json();
            
            if(!json[0]) return;
            domain = json[0].domain;
        }

        const response2 = await fetch(`https://api-prod.downfor.cloud/httpcheck/${encodeURIComponent(domain)}`);
        const json2 = await response2.json();

    return { url: json2.returnedUrl, isDown: json2.isDown, statusCode: json2.statusCode }
}