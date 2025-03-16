const weatherIcons = {
    0: '☀️',  // Clear sky
    1: '🌤',  // Mostly clear
    2: '⛅',  // Partly cloudy
    3: '☁️',  // Overcast
    45: '🌫', // Fog
    48: '🌫', // Fog (Rime)
    51: '🌦', // Drizzle
    53: '🌦', // Drizzle moderate
    55: '🌦', // Drizzle heavy
    61: '🌧', // Rain
    63: '🌧', // Rain moderate
    65: '🌧', // Rain heavy
    71: '❄️', // Snowfall
    73: '❄️', // Snowfall moderate
    75: '❄️', // Snowfall heavy
    80: '🌧', // Rain showers slight
    81: '🌧', // Rain showers moderate
    82: '🌧', // Rain showers violent
    85: '❄️', // Snow showers slight
    86: '❄️', // Snow showers heavy
    95: '⛈', // Thunderstorm
    96: '⛈', // Thunderstorm with slight hail
    99: '⛈', // Thunderstorm with heavy hail
};

const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snowfall",
    73: "Moderate snowfall",
    75: "Heavy snowfall",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
};

export function getWeatherIconsDescriptions(code) {
    return {
        icon: weatherIcons[code] || '',
        description: weatherDescriptions[code] || ""
    };
}
