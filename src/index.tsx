import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import { SVRouter } from './SVRouter';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SVRouter />
    </BrowserRouter>
  </StrictMode>
);
