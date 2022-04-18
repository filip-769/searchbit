import fetch from "node-fetch";

export default async q => {
    const response = await fetch(`https://reallyfreegeoip.org/json/${encodeURIComponent(q)}`);
    const json = await response.json();


    return {
        country: json?.country_name || null,
        city: json?.city || null,
        gps: {
            latitude: json?.latitude,
            longitude: json?.longitude
        }
    }
}