import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './components/App';
import HomeApp from './components/home/App';
import ApiApp from './components/api/App';
import './styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomeApp />} />
        <Route path="/api" element={<ApiApp />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
