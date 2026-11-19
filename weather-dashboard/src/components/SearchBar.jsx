
import { Search } from "lucide-react";

function SearchBar({ city, setCity, onSearch, loading }) {
  return (
    <form
      onSubmit={onSearch}
      className="flex gap-3 w-full max-w-xl mx-auto"
    >
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 min-w-0 px-5 py-4 rounded-2xl
        bg-white/10 border border-white/20 text-white
        placeholder-gray-400 outline-none focus:ring-2
        focus:ring-sky-400"
      />

      <button
        type="submit"
        disabled={loading || !city.trim()}
        className="bg-sky-500 hover:bg-sky-600
        disabled:opacity-50 text-white px-5 rounded-2xl
        transition flex items-center gap-2"
      >
        <Search size={20} />
        Search
      </button>
    </form>
  );
}

export default SearchBar;
