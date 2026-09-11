import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Footer = () => {
  const { data } = usePortfolio();
  const currentYear = new Date().getFullYear();
  const name = data?.profile?.name || 'Yash Kodgirwar';

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
