import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import HomeApp from "./home/App";
import ApiApp from "./api/App";
import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeApp />} />
        <Route path="/api" element={<ApiApp />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// package.json
// "globals": "^16.0.0",
// "typescript": "~5.7.2",
// "typescript-eslint": "^8.26.1",
// "eslint-plugin-react-refresh": "^0.4.19",
// "@types/react": "^19.0.10",
// "@types/react-dom": "^19.0.4",

// eslint.config.js
// 'react-refresh': reactRefresh,
