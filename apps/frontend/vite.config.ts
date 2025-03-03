import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@app": "/src/app",
      "@features": "/src/features",
      "@entities": "/src/entities",
      "@pages": "/src/pages",
      "@widgets": "/src/widgets",
      "@shared": "/src/shared",
    },
  },
});
