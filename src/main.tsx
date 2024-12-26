import "./styles/main.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "@/app/App";
import ThemeProvider from "@/global/providers/ThemeProvider";
import { theme } from "./styles/theme/theme";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Unable to find the root element");

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider themeConfig={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
