import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/ForeCast";

const API_KEY = "13132a532fdd94088c3cb425d61992a3";

export default function App() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState([])

  const handleSearch = async () => {
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const weather = await weatherRes.json();
      setWeatherData(weather)

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
      const forecast = await forecastRes.json();

      // filter forecast to one per day (every 24 hours = 8 * 3hr intervals)
      const daily = forecast.list.filter((_, i) => i%8 === 0);
      setForecastData(daily)
    }
    catch (err){
      console.log("Error fetching weather: ", err)
    }
  }
  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch}/>
      <WeatherCard data={weatherData}/>
      <Forecast forecast={forecastData}/>
    </div>
  )
}
