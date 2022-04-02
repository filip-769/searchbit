import fetch from "node-fetch";

export default async q => {
    let json;
    try {
        const goeResponse = await fetch(`https://www.metaweather.com/api/location/search/?query=${encodeURIComponent(q.replace("weather", "").replace(" in ", "").trim())}`);
        const geoJson = await goeResponse.json();

        const weatherResponse = await fetch(`https://www.metaweather.com/api/location/${geoJson[0].woeid}/`);
        json = await weatherResponse.json();
    } catch (error) {
        return false;
    }

    let data = {
        region: json.title,
        days: []
    };

    json.consolidated_weather.forEach(day => {
        data.days.push({
            day: new Intl.DateTimeFormat("en", { weekday: "long" }).format(new Date(day.applicable_date)),
            desc: day.weather_state_name,
            icon: `https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`,
            temp: {
                min: Math.round(day.min_temp*100)/100,
                max: Math.round(day.max_temp*100)/100
            },
            wind: {
                speed: Math.round(day.wind_speed*100)/100,
                direction: day.wind_direction_compass
            },
            humidity: Math.round(day.humidity*100)/100,
            airPressure: Math.round(day.air_pressure*100)/100,
            visibility: Math.round(day.visibility*100)/100
        })
    });

    return data;
}