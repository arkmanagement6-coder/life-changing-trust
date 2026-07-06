import React, { useState, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CampaignDetail from './pages/CampaignDetail';
import AboutPage from './pages/AboutPage';
import TransparencyPage from './pages/TransparencyPage';
import DashboardPortal from './pages/DashboardPortal';
import DonateModal from './components/DonateModal';
import AuthModal from './components/AuthModal';
import ChatBot from './components/ChatBot';

function AppContent() {
  const navigate = useNavigate();
  
  // Modal toggle states
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [donateCampaignId, setDonateCampaignId] = useState(null);
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const triggerDonateModal = (campaignId = null) => {
    setDonateCampaignId(campaignId);
    setIsDonateOpen(true);
  };

  const handleCampaignSelect = (id) => {
    navigate(`/campaign/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      
      {/* Navigation Header */}
      <Navbar 
        onDonateClick={() => triggerDonateModal(null)} 
        onAuthClick={() => setIsAuthOpen(true)}
      />

      {/* Main Routed Page Content */}
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <LandingPage 
                onDonateClick={() => triggerDonateModal(null)}
                onCampaignClick={handleCampaignSelect}
              />
            } 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/transparency" element={<TransparencyPage />} />
          <Route 
            path="/dashboard" 
            element={<DashboardPortal onAuthClick={() => setIsAuthOpen(true)} />} 
          />
          <Route 
            path="/campaign/:id" 
            element={
              <CampaignDetail 
                onBackClick={() => navigate('/')}
                onDonateClick={(campaignId) => triggerDonateModal(campaignId)}
              />
            } 
          />
        </Routes>
      </main>

      {/* Footer Sitemap */}
      <Footer onDonateClick={() => triggerDonateModal(null)} />

      {/* Floating Donation Checkout Modal */}
      <DonateModal 
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        selectedCampaignId={donateCampaignId}
      />

      {/* Floating Authentication Login/Signup Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Floating AI Chat Assistant */}
      <ChatBot />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}
