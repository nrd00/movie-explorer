import "./App.css";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./Components/MovieDetails";
import Movies from "./Pages/Movies";

function App() {
  return (
    <>
      <Navigation />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
