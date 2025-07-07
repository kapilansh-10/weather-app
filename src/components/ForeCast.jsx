export default function Forecast({forecast}) {
    if(!forecast || forecast.length === 0) return null;

    return (
        <div>
            <h3>5 day Forecast</h3>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap"}}>
                {forecast.map((item, index) => (
                    <div key={index}>
                        <p>{item.dt_txt.split(" ")[0]}</p>
                        <p>{item.weather[0].main}</p>
                        <p>{item.main.temp}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}