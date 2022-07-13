export default async q => {
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q.replace("weather", "").replace(" in ", "").trim())}&count=1`);
    const geoData = await geoResponse.json();
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoData.results[0].latitude}&longitude=${geoData.results[0].longitude}&current_weather=true&hourly=temperature_2m,apparent_temperature,rain,showers,snowfall,weathercode,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,windspeed_10m,winddirection_10m,soil_temperature_0cm`);
    const data = await response.json();
    data.daily = {};

    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    const codes = {0:"fair",1:"mainly clear",2:"partly cloudy",3:"overcast",45:"fog",48:"depositing rime fog",51:"light drizzle",53:"moderate drizzle",55:"dense drizzle",56:"light freezing drizzle",57:"dense freezing drizzle",61:"slight rain",63:"moderate rain",65:"heavy rain",66:"light freezing rain",67:"heavy freezing rain",71:"slight snow fall",73:"moderate snow fall",75:"heavy snow fall",77:"snow grains",80:"slight rain showers",81:"moderate rain showers",82:"heavy rain showers",85:"slight snow showers",86:"heavy snow showers",95:"slight to moderate thunderstorm",96:"thunderstorm with slight hail",99:"thunderstorm with heavy hail"};

    for(const x in data.hourly) {
        if(typeof data.hourly[x][0] === "number") {
            data.daily[x] = [
                average(data.hourly[x].slice(0, 24)),
                average(data.hourly[x].slice(24, 48)),
                average(data.hourly[x].slice(48, 72)),
                average(data.hourly[x].slice(72, 96)),
                average(data.hourly[x].slice(96, 120)),
                average(data.hourly[x].slice(120, 144)),
                average(data.hourly[x].slice(144, 167))
            ];
        } else {
            data.daily[x] = [
                data.hourly[x][0], 
                data.hourly[x][24], 
                data.hourly[x][48], 
                data.hourly[x][72],
                data.hourly[x][96],
                data.hourly[x][120],
                data.hourly[x][144]
            ];
        }
    }

    return {
        city: geoData.results[0].name,
        current: {
            temp: data.current_weather.temperature,
            message: codes[data.current_weather.weathercode],
            symbol: "/proxy?url=https://raw.githubusercontent.com/OGCMetOceanDWG/WorldWeatherSymbols/master/symbols/ww_PresentWeather/WeatherSymbol_WMO_PresentWeather_ww_" + data.current_weather.weathercode.toString().padStart(2, "0") + ".svg",
            wind: {
                speed: data.current_weather.windspeed,
                direction: data.current_weather.winddirection
            }
        },
        charts: [
            {
                type: 'line',
                data: {
                    labels: data.daily.time.map(q => new Intl.DateTimeFormat("en", { weekday: "long" }).format(new Date(q))),
                    datasets: [
                        {
                            label: "Air",
                            data: data.daily.temperature_2m,
                            fill: false,
                            pointRadius: 0.5,
                            borderWidth: 1
                        },
                        {
                            label: "Apparent",
                            data: data.daily.apparent_temperature,
                            fill: false,
                            pointRadius: 0.5,
                            borderWidth: 1
                        },
                        {
                            label: "Soil (surface)",
                            data: data.daily.soil_temperature_0cm,
                            fill: false,
                            pointRadius: 0.5,
                            borderWidth: 1
                        }
                    ],
                },
                options: {
                    legend: {
                        display: true,
                        position: 'right',
                        align: 'start'
                    },

                    plugins: {
                        tickFormat: {
                            style: 'unit',
                            unit: 'celsius'
                        }
                    }
                }
            },
            {
                type: 'line',
                data: {
                    labels: data.daily.time.map(q => new Intl.DateTimeFormat("en", { weekday: "long" }).format(new Date(q))),
                    datasets: [
                        {
                            label: "Rain",
                            data: data.daily.rain,
                            fill: false,
                            pointRadius: 0.5,
                            borderWidth: 1
                        },
                        {
                            label: "Showers",
                            data: data.daily.showers,
                            fill: false,
                            pointRadius: 0.5,
                            borderWidth: 1
                        },
                        {
                            label: "Snowfall",
                            data: data.daily.snowfall/7,
                            fill: false,
                            pointRadius: 0.5,
                            borderWidth: 1
                        }
                    ],
                },
                options: {
                    legend: {
                        display: true,
                        position: 'right',
                        align: 'start'
                    },

                    plugins: {
                        tickFormat: {
                            style: 'unit',
                            unit: 'millimeter'
                        }
                    }
                }
            },
            {
                type: 'line',
                data: {
                    labels: data.daily.time.map(q => new Intl.DateTimeFormat("en", { weekday: "long" }).format(new Date(q))),
                    datasets: [
                        {
                            label: "Low level",
                            data: data.daily.cloudcover_low,
                            fill: false,
                            pointRadius: 0.5,
                            borderWidth: 1
                        },
                        {
                            label: "Mid level",
                            data: data.daily.cloudcover_mid,
                            fill: false,
                            pointRadius: 0.5,
                            borderWidth: 1
                        },
                        {
                            label: "High level",
                            data: data.daily.cloudcover_high,
                            fill: false,
                            pointRadius: 0.5,
                            borderWidth: 1
                        }
                    ],
                },
                options: {
                    legend: {
                        display: true,
                        position: 'right',
                        align: 'start'
                    },

                    plugins: {
                        tickFormat: {
                            style: 'unit',
                            unit: 'percent'
                        }
                    }
                }
            },
            {
                type: 'line',
                data: {
                    labels: data.daily.time.map((q, m) => new Intl.DateTimeFormat("en", { weekday: "long" }).format(new Date(q)) + " - " + Math.round(data.daily.winddirection_10m[m]) + "°"),
                    datasets: [
                        {
                            label: "Wind speed",
                            data: data.daily.windspeed_10m,
                            fill: false,
                            pointRadius: 0.5,
                            borderWidth: 1
                        }
                    ],
                },
                options: {
                    legend: {
                        display: true,
                        position: 'right',
                        align: 'start'
                    },
                    plugins: {
                        tickFormat: {
                            suffix: " km/h"
                        }
                    }
                }
            }
        ]
    };
}