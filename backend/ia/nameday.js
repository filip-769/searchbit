import fetch from "node-fetch";

export default async q => {
    const response = await fetch("https://nameday.abalin.net/api/V1/today");
    const json = await response.json();
    for (const country in json?.nameday) {
        json.nameday[country] = json?.nameday[country] === "n/a" ? null : json?.nameday[country].split(", ")
    }
    return {
        today: json?.nameday
    }
}