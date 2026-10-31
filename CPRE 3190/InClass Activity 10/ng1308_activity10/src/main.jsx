/*
  Author: Nakshatra Gupta
  Email : ng1308@iastate.edu
  Date  : October 29, 2026
*/
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
