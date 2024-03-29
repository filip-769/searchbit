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

        try {
            const response2 = await fetch(`https://${domain}`);
            return { url: response2.url, isDown: response2.status.toString().startsWith("2") ? false : true, statusCode: response2.status }
        } catch (e) {
            return { url: `https://${domain}`, isDown: true, statusCode: 0 }
        }
}