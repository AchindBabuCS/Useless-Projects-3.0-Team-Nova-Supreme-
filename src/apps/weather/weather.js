import AppBase from "../base/appBase.js";
import "./weather.css";


class WeatherApp extends AppBase {

    constructor() {

        super({

            id: "weather",

            name: "Weather",

            icon: "🌤️"
        });


        this.weatherData = {

            "Kochi": {

                timezone: "IST (UTC+5:30)",

                time: "10:30 AM",

                temperature: "29°C",

                condition: "Partly Cloudy",

                humidity: "78%",

                wind: "14 km/h",

                forecast: [

                    {
                        day: "Today",
                        temperature: "29°C",
                        condition: "Partly Cloudy"
                    },

                    {
                        day: "Tomorrow",
                        temperature: "30°C",
                        condition: "Light Rain"
                    },

                    {
                        day: "Saturday",
                        temperature: "28°C",
                        condition: "Cloudy"
                    },

                    {
                        day: "Sunday",
                        temperature: "29°C",
                        condition: "Sunny"
                    },

                    {
                        day: "Monday",
                        temperature: "30°C",
                        condition: "Sunny"
                    }
                ]
            },


            "Thrissur": {

                timezone: "IST (UTC+5:30)",

                time: "10:30 AM",

                temperature: "30°C",

                condition: "Sunny",

                humidity: "70%",

                wind: "11 km/h",

                forecast: [

                    {
                        day: "Today",
                        temperature: "30°C",
                        condition: "Sunny"
                    },

                    {
                        day: "Tomorrow",
                        temperature: "31°C",
                        condition: "Partly Cloudy"
                    },

                    {
                        day: "Saturday",
                        temperature: "29°C",
                        condition: "Rain"
                    },

                    {
                        day: "Sunday",
                        temperature: "30°C",
                        condition: "Cloudy"
                    },

                    {
                        day: "Monday",
                        temperature: "31°C",
                        condition: "Sunny"
                    }
                ]
            },


            "Bengaluru": {

                timezone: "IST (UTC+5:30)",

                time: "10:30 AM",

                temperature: "24°C",

                condition: "Cloudy",

                humidity: "65%",

                wind: "9 km/h",

                forecast: [

                    {
                        day: "Today",
                        temperature: "24°C",
                        condition: "Cloudy"
                    },

                    {
                        day: "Tomorrow",
                        temperature: "25°C",
                        condition: "Sunny"
                    },

                    {
                        day: "Saturday",
                        temperature: "23°C",
                        condition: "Light Rain"
                    },

                    {
                        day: "Sunday",
                        temperature: "25°C",
                        condition: "Partly Cloudy"
                    },

                    {
                        day: "Monday",
                        temperature: "26°C",
                        condition: "Sunny"
                    }
                ]
            },


            "Mumbai": {

                timezone: "IST (UTC+5:30)",

                time: "10:30 AM",

                temperature: "31°C",

                condition: "Humid",

                humidity: "76%",

                wind: "17 km/h",

                forecast: [

                    {
                        day: "Today",
                        temperature: "31°C",
                        condition: "Humid"
                    },

                    {
                        day: "Tomorrow",
                        temperature: "30°C",
                        condition: "Rain"
                    },

                    {
                        day: "Saturday",
                        temperature: "29°C",
                        condition: "Cloudy"
                    },

                    {
                        day: "Sunday",
                        temperature: "30°C",
                        condition: "Rain"
                    },

                    {
                        day: "Monday",
                        temperature: "31°C",
                        condition: "Partly Cloudy"
                    }
                ]
            },


            "Delhi": {

                timezone: "IST (UTC+5:30)",

                time: "10:30 AM",

                temperature: "27°C",

                condition: "Clear",

                humidity: "48%",

                wind: "8 km/h",

                forecast: [

                    {
                        day: "Today",
                        temperature: "27°C",
                        condition: "Clear"
                    },

                    {
                        day: "Tomorrow",
                        temperature: "28°C",
                        condition: "Sunny"
                    },

                    {
                        day: "Saturday",
                        temperature: "29°C",
                        condition: "Sunny"
                    },

                    {
                        day: "Sunday",
                        temperature: "28°C",
                        condition: "Clear"
                    },

                    {
                        day: "Monday",
                        temperature: "27°C",
                        condition: "Cloudy"
                    }
                ]
            },


            "Chennai": {

                timezone: "IST (UTC+5:30)",

                time: "10:30 AM",

                temperature: "32°C",

                condition: "Sunny",

                humidity: "73%",

                wind: "15 km/h",

                forecast: [

                    {
                        day: "Today",
                        temperature: "32°C",
                        condition: "Sunny"
                    },

                    {
                        day: "Tomorrow",
                        temperature: "33°C",
                        condition: "Sunny"
                    },

                    {
                        day: "Saturday",
                        temperature: "32°C",
                        condition: "Partly Cloudy"
                    },

                    {
                        day: "Sunday",
                        temperature: "31°C",
                        condition: "Cloudy"
                    },

                    {
                        day: "Monday",
                        temperature: "32°C",
                        condition: "Sunny"
                    }
                ]
            },


            "Tokyo": {

                timezone: "JST (UTC+9)",

                time: "2:00 PM",

                temperature: "22°C",

                condition: "Cloudy",

                humidity: "62%",

                wind: "12 km/h",

                forecast: [

                    {
                        day: "Today",
                        temperature: "22°C",
                        condition: "Cloudy"
                    },

                    {
                        day: "Tomorrow",
                        temperature: "23°C",
                        condition: "Sunny"
                    },

                    {
                        day: "Saturday",
                        temperature: "21°C",
                        condition: "Rain"
                    },

                    {
                        day: "Sunday",
                        temperature: "24°C",
                        condition: "Partly Cloudy"
                    },

                    {
                        day: "Monday",
                        temperature: "25°C",
                        condition: "Sunny"
                    }
                ]
            }
        };
    }


    render() {

        const locations =
            Object.keys(this.weatherData);


        let selectedLocation =
            locations[0];


        /*
         * 25% chance of showing
         * a completely different location.
         */
        if (Math.random() < 0.25) {

            const otherLocations =
                locations.filter(
                    location =>
                        location !== selectedLocation
                );


            selectedLocation =
                otherLocations[
                    Math.floor(
                        Math.random() *
                        otherLocations.length
                    )
                ];


            console.log(
                "😈 Weather sabotage: wrong location/timezone"
            );
        }


        const weather =
            this.weatherData[selectedLocation];


        let forecast =
            [...weather.forecast];


        /*
         * 30% chance of putting the
         * forecast in the wrong order.
         */
        if (Math.random() < 0.30) {

            forecast.sort(
                () => Math.random() - 0.5
            );


            console.log(
                "😈 Weather sabotage: forecast order corrupted"
            );
        }


        return `

            <div class="rage-weather-app">

                <div class="rage-weather-header">

                    <div>

                        <h2 class="rage-weather-title">
                            ${this.icon} Weather
                        </h2>

                        <div class="rage-weather-location">
                            📍 ${selectedLocation}
                        </div>

                    </div>


                    <div class="rage-weather-time">

                        <div class="rage-weather-clock">
                            ${weather.time}
                        </div>

                        <div class="rage-weather-timezone">
                            ${weather.timezone}
                        </div>

                    </div>

                </div>


                <div class="rage-weather-current">

                    <div class="rage-weather-temperature">
                        ${weather.temperature}
                    </div>

                    <div class="rage-weather-condition">
                        ${weather.condition}
                    </div>


                    <div class="rage-weather-details">

                        <div>
                            💧 Humidity:
                            ${weather.humidity}
                        </div>

                        <div>
                            💨 Wind:
                            ${weather.wind}
                        </div>

                    </div>

                </div>


                <div class="rage-weather-forecast-section">

                    <h3>
                        Forecast
                    </h3>


                    <div class="rage-weather-forecast">

                        ${forecast.map(
                            day => `

                                <div class="rage-weather-forecast-card">

                                    <div class="rage-weather-forecast-day">
                                        ${day.day}
                                    </div>

                                    <div class="rage-weather-forecast-temperature">
                                        ${day.temperature}
                                    </div>

                                    <div class="rage-weather-forecast-condition">
                                        ${day.condition}
                                    </div>

                                </div>

                            `
                        ).join("")}

                    </div>

                </div>

            </div>
        `;
    }
}


export default WeatherApp;