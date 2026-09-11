import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Extracurricular from './components/Extracurricular';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OwnerBar from './components/OwnerBar';
import Toast from './components/Toast';
import EditProfileModal from './components/modals/EditProfileModal';
import ItemModal from './components/modals/ItemModal';
import OwnerAuthModal from './components/modals/OwnerAuthModal';
import MessagesInboxModal from './components/modals/MessagesInboxModal';

const PortfolioContent = () => {
  const { loading } = usePortfolio();

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [inboxModalOpen, setInboxModalOpen] = useState(false);
  const [itemModal, setItemModal] = useState({
    isOpen: false,
    section: 'projects',
    initialData: null,
  });

  const handleOpenAddItem = (section) => {
    setItemModal({
      isOpen: true,
      section,
      initialData: null,
    });
  };

  const handleOpenEditItem = (section, item) => {
    setItemModal({
      isOpen: true,
      section,
      initialData: item,
    });
  };

  const handleCloseItemModal = () => {
    setItemModal((prev) => ({ ...prev, isOpen: false }));
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        background: '#090d16',
        color: '#fff'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '3px solid rgba(139, 92, 246, 0.2)',
          borderTopColor: '#8b5cf6',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 500 }}>
          Loading Portfolio Experience...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="portfolio-app">
      {/* Toast Notification Container */}
      <Toast />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenEditProfile={() => setEditProfileOpen(true)} />
        <About />
        <Skills onAddItem={handleOpenAddItem} onEditItem={handleOpenEditItem} />
        <Experience onAddItem={handleOpenAddItem} onEditItem={handleOpenEditItem} />
        <Education onAddItem={handleOpenAddItem} onEditItem={handleOpenEditItem} />
        <Projects onAddItem={handleOpenAddItem} onEditItem={handleOpenEditItem} />
        <Certificates onAddItem={handleOpenAddItem} onEditItem={handleOpenEditItem} />
        <Extracurricular onAddItem={handleOpenAddItem} onEditItem={handleOpenEditItem} />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Owner Dock Bar */}
      <OwnerBar
        onOpenEditProfile={() => setEditProfileOpen(true)}
        onAddItem={handleOpenAddItem}
        onOpenInbox={() => setInboxModalOpen(true)}
      />

      {/* Modals */}
      <EditProfileModal
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />

      <ItemModal
        isOpen={itemModal.isOpen}
        onClose={handleCloseItemModal}
        section={itemModal.section}
        initialData={itemModal.initialData}
      />

      <OwnerAuthModal />

      <MessagesInboxModal
        isOpen={inboxModalOpen}
        onClose={() => setInboxModalOpen(false)}
      />
    </div>
  );
};

const App = () => {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
};

export default App;
