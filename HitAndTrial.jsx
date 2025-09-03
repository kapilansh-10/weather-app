export default function Weather({data}) {
    if(!data) return null;

    return (
        <div>
            <h2>{data.name}</h2>
            <p>{data.weather[0].main}</p>
            <p>Temp: {data.main.temp}</p>
            <p>Humidity: {data.main.humidity}</p>
            <p>Wind: {data.main.speed}</p>
        </div>
    )
}