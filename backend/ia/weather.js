import fetch from "node-fetch";

export default async q => {
    let json;
    try {
        const response = await fetch(`https://weatherdbi.herokuapp.com/data/weather/${encodeURIComponent(q.replace("weather",""))}`);
        json = await response.json();
    } catch (error) {
        return false;
    }

    if(json?.status === "fail") return false;

    let data = {
        region: json?.region,
        current: {
            temp: json?.currentConditions?.temp?.c,
            precipitation: parseInt(json?.currentConditions?.precip),
            humidity: parseInt(json?.currentConditions?.humidity),
            description: json?.currentConditions?.comment,
            icon: json?.currentConditions?.iconURL.replace("/64/", "/128/")
        },
        next: [ ]
    };

    json?.next_days?.forEach(day => {
        data.next.push({
            day: day?.day,
            description: day?.comment,
            icon: day?.iconURL.replace("/48/", "/96/"),
            temp: {
                min: day?.min_temp?.c,
                max: day?.max_temp?.c
            }
        })
    });

    return data;
}