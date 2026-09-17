import { Search } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <nav className="bg-[#111622] px-6 py-2 flex justify-between items-center">
      <NavLink to="/" className="text-[#DB5123] text-3xl font-bold">
        <span className="font-bolder">Movie</span> Land
      </NavLink>
      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          type="submit"
          className="px-5 py-1.5 bg-[#DB5123] text-white rounded-lg hover:bg-[#e6673d] transition ml-2 cursor-pointer"
        >
          <Search />
        </button>
      </form>
      <ul className="text-white flex gap-x-5">
        <NavLink to="/discover">Discover</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
