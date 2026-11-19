
import { useState } from "react";
import { CloudSun } from "lucide-react";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  console.log("API Key loaded:", Boolean(API_KEY));
  
  const getWeather = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    if (!API_KEY) {
      setError("API key is missing. Check your .env file.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch weather data."
        );
      }

      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(
        err.message === "city not found"
          ? "City not found. Please try another city."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-10">

      <div className="max-w-5xl mx-auto">

        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <CloudSun size={45} className="text-sky-400" />

            <h1 className="text-4xl font-bold text-white">
              Weather Dashboard
            </h1>
          </div>

          <p className="text-gray-400">
            Get real-time weather updates for any city.
          </p>
        </header>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={getWeather}
          loading={loading}
        />

        {loading && (
          <div className="text-center mt-12">
            <div className="w-12 h-12 border-4 border-sky-400
            border-t-transparent rounded-full animate-spin mx-auto" />

            <p className="text-white mt-4">
              Fetching weather data...
            </p>
          </div>
        )}

        {error && (
          <div className="max-w-xl mx-auto mt-8 p-4
          bg-red-500/10 border border-red-500/30
          rounded-xl text-red-300 text-center">
            {error}
          </div>
        )}

        {!loading && weather && (
          <WeatherCard weather={weather} />
        )}

        {!loading && !weather && !error && (
          <div className="text-center mt-20">
            <CloudSun
              size={90}
              className="mx-auto text-sky-400 opacity-60"
            />

            <h2 className="text-2xl font-semibold text-white mt-5">
              Search for a city
            </h2>

            <p className="text-gray-400 mt-2">
              Enter a city name to check its current weather.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
