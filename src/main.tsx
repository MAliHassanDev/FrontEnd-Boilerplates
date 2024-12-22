import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles/main.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "@/app/App";
import { ThemeProvider } from "@/components/themeProvider/ThemeProvider";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Unable to find the root element");

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
