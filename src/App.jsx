import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Diet from './pages/Diet';
import Quests from './pages/Quests';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/diet" element={<Diet />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Navbar />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
