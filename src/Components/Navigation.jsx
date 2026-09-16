import { Search } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="bg-[#111622] px-6 py-2 flex justify-between items-center">
      <a href="#" className="text-[#DB5123] text-3xl font-bold">
        <span className="font-bolder">Movie</span> Land
      </a>
      <div className="hidden md:flex items-center w-full max-w-md">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />

        <button
          type="button"
          className="px-5 py-1.5 bg-[#DB5123] text-white rounded-lg hover:bg-[#e6673d] transition ml-2 cursor-pointer"
        >
          <Search />
        </button>
      </div>
      <ul className="text-white flex gap-x-5">
        <li>Discover</li>
        <li>Wishlist</li>
      </ul>
    </nav>
  );
};

export default Navigation;
