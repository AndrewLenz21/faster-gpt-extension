import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/modules/extension/ui/App.tsx";
import { applyTheme, getStoredTheme } from "@/modules/theme";
import "./style.css";

applyTheme(getStoredTheme());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
