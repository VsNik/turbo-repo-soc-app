import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AppLoader } from "./loaders/app-loader.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AppLoader>
          <App />
        </AppLoader>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
