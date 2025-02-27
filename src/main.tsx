import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "@/app/App";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./app/store/store";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Unable to find the root element");

createRoot(rootElement).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>
);
