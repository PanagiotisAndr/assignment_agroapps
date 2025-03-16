// store/useWeatherStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    forecast: null, // Daily forecast data
    hourlyForecast: null, // Hourly forecast data
    currentWeather: null, // Object holding the current weather data
    chartData: { temperatureData: [], days: [] } // Array for Chart
  }),

  actions: {
    async fetchWeather() {
      try {
        // Fetch data from the weather API
        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
          params: {
            latitude: 40.5872,
            longitude: 22.9482,
            daily:
              "temperature_2m_max,temperature_2m_min,apparent_temperature_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,relative_humidity_2m_max,surface_pressure_max,weathercode",
            hourly:
              "temperature_2m,apparent_temperature,wind_speed_10m,wind_gusts_10m,wind_direction_10m,relative_humidity_2m,surface_pressure,weathercode",
            timezone: "auto",
          },
        });

        // Save the daily and hourly forecast data in the store
        this.forecast = response.data.daily;
        this.hourlyForecast = response.data.hourly;



        // Save max temperature for Chart
        this.chartData.temperatureData = this.forecast.temperature_2m_max.map((temp) => temp);

        // convert  date to `DD/MM` and save for Chart
        this.chartData.days = this.forecast.time.map((dateString) => {
          const date = new Date(dateString);
          return `${date.getDate()}/${date.getMonth() + 1}`;
        });

        // Update current weather based on the current hour
        this.getWeatherData(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },

    // Get the weather based on the current hour or use the provided index (indx)
    getWeatherData(indx) {
      if (!this.hourlyForecast) return null; // If there's no hourly forecast data, return null

      const now = new Date();
      const currentHour = now.getHours(); // Get the current hour from the system time

      // If indx is provided, use it; otherwise, find the index for the current hour
      const index = indx
        ? indx // Use the provided index
        : this.hourlyForecast.time.findIndex((t) => new Date(t).getHours() === currentHour); // Find the index of the current hour

      // If a valid index is found (not -1), update the current weather data
      if (index !== -1) {
        if (indx) {


          // When indx is provided, update current weather with daily data for that specific index
          this.currentWeather = {
            temperature: {
              value: parseFloat((this.forecast.temperature_2m_max[index] + this.forecast.temperature_2m_min[index]) / 2).toFixed(2), // Average temperature of the day
              unit: "°C", // Unit for temperature
              text: "Wind Deg",
            },
            feelsLike: {
              value: this.forecast.apparent_temperature_max[index], // Daily apparent temperature
              unit: "°C", // Unit for temperature
              text: "Feels like",
            },
            windSpeed: {
              value: this.forecast.wind_speed_10m_max[index], // Maximum daily wind speed
              unit: "m/s", // Unit for wind speed
              text: "Wind",
            },
            windGust: {
              value: this.forecast.wind_gusts_10m_max[index], // Maximum daily wind gust
              unit: "m/s", // Unit for wind gust
              text: "Wind Gust",
            },
            humidity: {
              value: this.forecast.relative_humidity_2m_max[index], // Maximum daily humidity
              unit: "%", // Unit for humidity
              text: "Humidity",
            },
            pressure: {
              value: this.forecast.surface_pressure_max[index], // Maximum daily pressure
              unit: "hPa", // Unit for pressure
              text: "Pressure",
            },
            weathercode: this.forecast.weathercode[index], // Weather code for the day (e.g., sunny, rainy)
          };
        } else {
          // When no indx is provided, update current weather with hourly data for the current hour
          this.currentWeather = {
            temperature: {
              value: this.hourlyForecast.temperature_2m[index], // Current hour temperature
              unit: "°C", // Unit for temperature
              text: "Wind Deg",
            },
            feelsLike: {
              value: this.hourlyForecast.apparent_temperature[index], // Feels-like temperature for the current hour
              unit: "°C", // Unit for temperature
              text: "Feels like",
            },
            windSpeed: {
              value: this.hourlyForecast.wind_speed_10m[index], // Wind speed for the current hour
              unit: "m/s", // Unit for wind speed
              text: "Wind",
            },
            windGust: {
              value: this.hourlyForecast.wind_gusts_10m[index], // Wind gust for the current hour
              unit: "m/s", // Unit for wind gust
              text: "Wind Gust",
            },
            humidity: {
              value: this.hourlyForecast.relative_humidity_2m[index], // Humidity for the current hour
              unit: "%", // Unit for humidity
              text: "Humidity",
            },
            pressure: {
              value: this.hourlyForecast.surface_pressure[index], // Pressure for the current hour
              unit: "hPa", // Unit for pressure
              text: "Pressure",
            },
            weathercode: this.hourlyForecast.weathercode[index], // Weather code for the current hour
          };
        }
      }
    },
  },
});
