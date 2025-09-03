export default function SearchBar({ city, setCity, handleSearch, loading }) {
    const onSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };
    return (
        <form onSubmit={onSubmit} className="search-bar" role="search" aria-label="City search">
            <input
                className="input"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Search city (e.g., London)"
                aria-label="City"
            />
            <button className="btn" type="submit" disabled={!city.trim() || loading}>
                {loading ? "Searching…" : "Search"}
            </button>
        </form>
    );
}