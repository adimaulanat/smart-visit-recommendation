import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecommendationsPage from './pages/RecommendationsPage';

function App() {
  // Get base path from Vite config for GitHub Pages deployment
  const basename = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
