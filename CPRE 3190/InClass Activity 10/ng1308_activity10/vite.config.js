/*
  Author: Nakshatra Gupta
  Email : ng1308@iastate.edu
  Date  : October 29, 2026
*/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
