import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./styles/index.css";
import App from "@/app/App";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Unable to find the root element");

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
