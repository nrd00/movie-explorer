import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./Components/MovieDetails";
import Discover from "./Pages/Discover";
import Wishlist from "./Pages/Wishlist";
import Search from "./Pages/Search";

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;
