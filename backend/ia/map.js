export default async q => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q.replace(/(^| )(map|where is|location)($| )/i, "").trim())}&count=1`);
    const json = await response.json();

    if(!(json?.results?.length >= 1)) return false;

    return {
        name: json.results[0].name,
        img: `/proxy?url=${encodeURIComponent(`https://external-content.duckduckgo.com/ssv2/?center=${json.results[0].latitude},${json.results[0].longitude}&lang=en&annotations=[{"point":"${json.results[0].latitude},${json.results[0].longitude}","color":"teal"}]&spn=50,50`)}`
    }
}