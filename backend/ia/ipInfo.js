import fetch from "node-fetch";

export default async ip => {
    let json;
    try {
        const response = await fetch(`https://reallyfreegeoip.org/json/${encodeURIComponent(ip)}`);
        json = await response.json();
    } catch (error) {
        return false;
    }

    return {
        country: json?.country_name || null,
        city: json?.city || null,
        gps: {
            latitude: json?.latitude,
            longitude: json?.longitude
        }
    }
}