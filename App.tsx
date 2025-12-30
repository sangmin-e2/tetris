
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Game from './pages/Game';
import Settings from './pages/Settings';
import ScoreBoard from './pages/ScoreBoard';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-background-dark text-white max-w-md mx-auto shadow-2xl relative">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game" element={<Game />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/score" element={<ScoreBoard />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
