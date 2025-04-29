import { Route, Routes } from 'react-router-dom';
import { App as ApiApp } from './components/api/App';
import { App } from './components/App';
import { App as HomeApp } from './components/home/App';
import { App as NotFoundApp } from './components/not_found/App';
import { App as VisualizerApp } from './components/visualizer/App';

export const SVRouter = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomeApp />} />
      <Route path="/api" element={<ApiApp />} />
      <Route path="/app" element={<VisualizerApp />} />
      <Route path="*" element={<NotFoundApp />} />
    </Route>
  </Routes>
);
