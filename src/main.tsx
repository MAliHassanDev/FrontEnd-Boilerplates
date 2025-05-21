import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "@/app/App";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Unable to find the root element");

const queryClient = new QueryClient();

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
