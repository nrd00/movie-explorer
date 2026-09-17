import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import WishlistProvider from "./contexts/WishlistProvider";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WishlistProvider>
  </StrictMode>,
);
