import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/ForeCast";
import "./index.css";
import "./App.css";

const API_KEY = import.meta.env.VITE_OWM_KEY || "13132a532fdd94088c3cb425d61992a3";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeatherData(null);
    setForecastData([]);
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      if (!weatherRes.ok) throw new Error("City not found");
      const weather = await weatherRes.json();
      setWeatherData(weather);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      if (!forecastRes.ok) throw new Error("Forecast not available");
      const forecast = await forecastRes.json();
      const list = Array.isArray(forecast.list) ? forecast.list : [];
      // filter forecast to one per day (every 24 hours = 8 * 3hr intervals)
      const daily = list.filter((_, i) => i % 8 === 0);
      setForecastData(daily);
    } catch (err) {
      setError(err.message || "Error fetching weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="header">
        <div className="container header-inner">
          <div className="brand">
            <div className="brand-badge">⛅</div>
            <span>Weather</span>
          </div>
          <div className="glass" style={{ padding: "0.6rem", width: "min(620px, 100%)" }}>
            <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} loading={loading} />
          </div>
        </div>
      </header>

      <main className="content">
        <div className="container grid grid-2">
          <section className="glass card">
            <h2 className="card-title">Current Weather</h2>
            {error && <div className="error">{error}</div>}
            {!weatherData && !loading && !error && (
              <div className="center" style={{ minHeight: 160 }}>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Search a city to begin</div>
                  <div className="hint">Try: London, Delhi, Tokyo…</div>
                </div>
              </div>
            )}
            {loading && (
              <div className="center" style={{ minHeight: 160 }}>
                <div className="hint">Fetching latest weather…</div>
              </div>
            )}
            {!loading && weatherData && <WeatherCard data={weatherData} />}
          </section>

          <section className="glass card">
            <h2 className="card-title">5-Day Forecast</h2>
            {loading && (
              <div className="center" style={{ minHeight: 140 }}>
                <div className="hint">Loading forecast…</div>
              </div>
            )}
            {!loading && <Forecast forecast={forecastData} />}
          </section>
        </div>
      </main>

      <footer style={{ padding: "1.2rem 0", color: "var(--muted)" }}>
        <div className="container" style={{ fontSize: ".9rem" }}>
          Data by OpenWeatherMap • Built with React + Vite
        </div>
      </footer>
    </div>
  );
}
