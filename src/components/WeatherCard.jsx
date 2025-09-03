export default function WeatherCard ({ data }) {
    if (!data) return null;
    const name = data?.name ?? "";
    const weatherMain = data?.weather?.[0]?.main ?? "";
    const weatherDesc = data?.weather?.[0]?.description ?? "";
    const temp = Math.round(data?.main?.temp ?? 0);
    const feels = Math.round(data?.main?.feels_like ?? 0);
        const humidity = data?.main?.humidity ?? "-";
        const windKmh = data?.wind?.speed != null ? Math.round(data.wind.speed * 3.6) : "-";

    return (
        <div className="current">
            <div style={{ fontSize: 42 }}>🌤️</div>
            <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: ".6rem", flexWrap: "wrap" }}>
                    <div className="temp">{temp}°C</div>
                    <div className="meta">Feels like {feels}°</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{name}</div>
                <div className="meta" style={{ textTransform: "capitalize" }}>{weatherMain} • {weatherDesc}</div>

                <div className="stat-row">
                    <div className="stat">
                        <div className="label">Humidity</div>
                        <div className="value">{humidity}%</div>
                    </div>
                                <div className="stat">
                                    <div className="label">Wind</div>
                                    <div className="value">{windKmh} km/h</div>
                                </div>
                    <div className="stat">
                        <div className="label">Condition</div>
                        <div className="value" style={{ textTransform: "capitalize" }}>{weatherMain}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}