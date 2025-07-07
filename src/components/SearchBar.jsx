export default function SearchBar({ city, setCity, handleSearch}) {
    return (
        <div>
            <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}