export default async q => {
    const response = await fetch(`https://api.tosdr.org/search/v4/?query=${encodeURIComponent(q.replace(/tos|tosdr|privacy policy|terms of service/ig, "").trim())}`);
    const json = await response.json();

    if(!json.parameters.services[0]) return;

    const response2 = await fetch(`https://api.tosdr.org/rest-service/v3/${encodeURIComponent(json.parameters.services[0].id)}.json`);
    const json2 = await response2.json();

    if(!json2.parameters.name) return;

    const data = {
        name: json2.parameters.name,
        img: `/proxy?url=${encodeURIComponent(json2.parameters.image)}`,
        tosdrURL: `https://tosdr.org/en/service/${encodeURIComponent(json.parameters.services[0].id)}`,
        tosURL: json2.parameters.documents[0].url,
        points: [],
        rating: {
            letter: json.parameters.services[0].rating.letter,
            color: "#212529",
        }
    }

    switch (data.rating.letter) {
        case "A":
            data.rating.color = "#198754";
            break;
        case "B":
            data.rating.color = "#79b752";
            break;
        case "C":
            data.rating.color = "#ffc107";
            break;
        case "D":
            data.rating.color = "#d66f2c";
            break;
        case "E":
            data.rating.color = "#dc3545";
            break;
    }

    json2.parameters.points.filter(x => x.status === "approved").forEach((x, i) => i < 5 ? data.points.push(x.title.trim()) : null);

    return data;
}