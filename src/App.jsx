import React, { useState, useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CampaignDetail from './pages/CampaignDetail';
import AboutPage from './pages/AboutPage';
import TransparencyPage from './pages/TransparencyPage';
import DashboardPortal from './pages/DashboardPortal';
import DonateModal from './components/DonateModal';
import ChatBot from './components/ChatBot';

function AppContent() {
  const { activeTab, setActiveTab, currentCampaignId, setCurrentCampaignId } = useContext(AppContext);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [donateCampaignId, setDonateCampaignId] = useState(null);

  const triggerDonateModal = (campaignId = null) => {
    setDonateCampaignId(campaignId);
    setIsDonateOpen(true);
  };

  const handleCampaignSelect = (id) => {
    setCurrentCampaignId(id);
    setActiveTab('home'); // keep activeTab matches the core public navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveTab = () => {
    if (currentCampaignId !== null) {
      return (
        <CampaignDetail 
          onBackClick={() => setCurrentCampaignId(null)}
          onDonateClick={(campaignId) => triggerDonateModal(campaignId)}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <LandingPage 
            onDonateClick={() => triggerDonateModal(null)}
            onCampaignClick={handleCampaignSelect}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'transparency':
        return <TransparencyPage />;
      case 'dashboard':
        return <DashboardPortal />;
      default:
        return (
          <LandingPage 
            onDonateClick={() => triggerDonateModal(null)}
            onCampaignClick={handleCampaignSelect}
          />
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Navigation Header */}
      <Navbar onDonateClick={() => triggerDonateModal(null)} />

      {/* Main Page Content */}
      <main style={{ flexGrow: 1 }}>
        {renderActiveTab()}
      </main>

      {/* Footer Sitemap */}
      <Footer onDonateClick={() => triggerDonateModal(null)} />

      {/* Floating Donation Checkout Modal */}
      <DonateModal 
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        selectedCampaignId={donateCampaignId}
      />

      {/* Floating AI Chat Assistant */}
      <ChatBot />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
