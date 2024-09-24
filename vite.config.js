import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Path from Node.js

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-google-places-autocomplete'], // Externalize the package
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Correct alias setup
    },
  },
});
