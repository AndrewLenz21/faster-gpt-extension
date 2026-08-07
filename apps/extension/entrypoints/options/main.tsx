import React from "react";
import ReactDOM from "react-dom/client";

import { ConversationPerformanceSettingsPage } from "@/modules/conversation-performance/components/ConversationPerformanceSettingsPage";
import { applyTheme, getStoredTheme } from "@/modules/theme";

import "./style.css";

applyTheme(getStoredTheme());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConversationPerformanceSettingsPage />
  </React.StrictMode>,
);
