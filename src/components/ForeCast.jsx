export default function Forecast({ forecast }) {
    if (!forecast || forecast.length === 0) {
        return <div className="hint">No forecast available.</div>;
    }

    return (
        <div className="forecast">
            {forecast.map((item, index) => {
                const dateText = item?.dt_txt?.split(" ")[0] ?? "";
                const cond = item?.weather?.[0]?.main ?? "";
                const temp = Math.round(item?.main?.temp ?? 0);
                return (
                    <div key={index} className="day">
                        <div style={{ fontSize: 28, marginBottom: 6 }}>⛅</div>
                        <div className="date">{dateText}</div>
                        <div style={{ fontWeight: 700, marginTop: 4 }}>{temp}°C</div>
                        <div className="hint" style={{ textTransform: "capitalize" }}>{cond}</div>
                    </div>
                );
            })}
        </div>
    );
}