import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import VaultPage from './pages/VaultPage';
import ChatPage from './pages/ChatPage';
import QuizPage from './pages/QuizPage';
import SummaryPage from './pages/SummaryPage';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/vault" element={<VaultPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}
