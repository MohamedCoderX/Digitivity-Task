import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const Weather = () => {
    const [search, setSearch] = useState("");
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(10);

    const API_KEY = "e572227f236eaab55bbda5b1790d6ecc";

    const fetchWeather = useCallback(async (query) => {
        if (!query) {
            setWeatherData([]);
            return;
        }
        try {
            setLoading(true);
            // Geocoding API to get coordinates/cities
            const cityRes = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=50&appid=${API_KEY}`
            );
            // Fetch weather for each city found
            const weatherPromises = cityRes.data.map((city) =>
                axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${API_KEY}`
                )
            );

            const weatherResponses = await Promise.all(weatherPromises);
            const finalWeatherData = weatherResponses.map((item) => item.data);

            setWeatherData(finalWeatherData);
            setVisibleCount(10); // Reset visible count on new search
        } catch (error) {
            console.error("Error fetching weather:", error);
        } finally {
            setLoading(false);
        }
    }, [API_KEY]);

    useEffect(() => {
        if (!search) {
            setWeatherData([]);
            return;
        }

        const timeout = setTimeout(() => {
            fetchWeather(search);
        }, 600); // Debounce delay

        return () => clearTimeout(timeout);
    }, [search, fetchWeather]);

    // Infinite Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 50 >=
                document.documentElement.scrollHeight
            ) {
                if (visibleCount < weatherData.length) {
                    setLoading(true);
                    setTimeout(() => {
                        setVisibleCount((prev) => prev + 10);
                        setLoading(false);
                    }, 500); // Simulate loading more
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [visibleCount, weatherData.length]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
                        DIGITIVITY Search
                    </h1>
                    <p className="text-xl text-indigo-100 opacity-90">
                        Discover weather conditions across the globe instantly.
                    </p>
                </header>

                <div className="relative mb-12">
                    <input
                        type="text"
                        placeholder="Search for a city (e.g., London, Tokyo, Mumbai)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-5 pl-8 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-indigo-200 text-lg focus:outline-none focus:ring-4 focus:ring-white/40 transition-all shadow-2xl"
                    />
                    {loading && (
                        <div className="absolute right-5 top-5">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                        </div>
                    )}
                </div>

                {!loading && search && weatherData.length === 0 && (
                    <div className="text-center p-10 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                        <p className="text-xl">No cities found matching "{search}". Try another search!</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {weatherData.slice(0, visibleCount).map((weather, index) => (
                        <div
                            key={`${weather.id}-${index}`}
                            className="group bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold">{weather.name}, {weather.sys.country}</h2>
                                    <p className="text-indigo-200 capitalize">{weather.weather[0].description}</p>
                                </div>
                                <div className="text-4xl">
                                    {weather.main.temp > 25 ? "☀️ Sunny" : weather.main.temp > 15 ? "⛅ Cloudy" : "☁️ Rainy"}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-white/5 p-4 rounded-2xl">
                                    <p className="text-sm text-indigo-200 mb-1">Temperature</p>
                                    <p className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl">
                                    <p className="text-sm text-indigo-200 mb-1">Humidity</p>
                                    <p className="text-2xl font-bold">{weather.main.humidity}%</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCount < weatherData.length && (
                    <div className="text-center mt-12 pb-12">
                        <p className="text-indigo-200 animate-bounce">Scrolling for more results...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;