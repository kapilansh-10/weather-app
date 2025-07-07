export default function WeatherCard ({ data }) {
    if(!data) return null;

    return (
        <div>
            <h2>{data.name}</h2>
            <p>{data.weather[0].main}</p>
            <p>Temp: {data.main.temp}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind: {data.wind.speed} km/h</p>
        </div>
    )
}