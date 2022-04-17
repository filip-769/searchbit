import fetch from "node-fetch";

export default async q => {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q.replace("time", "").replace("in ", "").trim())}&count=1`);
    const json = await response.json();

    if(!(json?.results?.length >= 1)) return false;

    const response2 = await fetch(`https://timeapi.io/api/Time/current/coordinate?latitude=${encodeURIComponent(json?.results[0]?.latitude)}&longitude=${encodeURIComponent(json?.results[0]?.longitude)}`);
    const json2 = await response2.json();
    if(!json2?.dateTime) return false;

    return {
        timeZone: json2?.timeZone,
        dayName: json2.dayOfWeek,
        time: json2?.time,
        date: json2?.date,
        city: json?.results[0]?.name??null,
        country: json?.results[0]?.country??null
    }
}