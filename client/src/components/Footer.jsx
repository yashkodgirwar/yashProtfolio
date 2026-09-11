import React from 'react';
import { ArrowUp, Heart, Lock, Shield, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
  const { data, isOwner, setShowAuthModal, exitOwnerMode } = usePortfolio();
  const currentYear = new Date().getFullYear();
  const name = data?.profile?.name || 'Developer';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--border-glass)',
      padding: '48px 0 32px',
      background: 'rgba(9, 13, 22, 0.95)',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          paddingBottom: '32px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
              {name}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Engineered with React, Node.js, Express & MongoDB.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Discreet Owner Mode Trigger */}
            <button
              onClick={() => {
                if (isOwner) {
                  exitOwnerMode();
                } else {
                  setShowAuthModal(true);
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                e.currentTarget.style.color = '#a78bfa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
              title="Shortcut: Ctrl + Shift + E"
            >
              <Lock size={12} />
              <span>{isOwner ? 'Exit Owner Mode' : 'Owner: Ctrl+Shift+E'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="btn btn-outline btn-sm btn-icon"
              title="Scroll to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div style={{
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          color: 'var(--text-muted)',
          fontSize: '0.82rem'
        }}>
          <div>
            © {currentYear} {name}. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Built with precision & passion</span>
            <Sparkles size={14} color="var(--accent-cyan)" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
