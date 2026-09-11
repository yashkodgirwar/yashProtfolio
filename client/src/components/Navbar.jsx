import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Download, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  FileText,
  Send
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Navbar = () => {
  const { data, isOwner, isEditingEnabled, setVisitorPreview, visitorPreview } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { name, resumeUrl } = data.profile || {};

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certificates' },
    { name: 'Activities', href: '#extracurricular' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'var(--transition-smooth)',
        background: scrolled ? 'rgba(9, 13, 22, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-glass)' : '1px solid transparent',
        padding: scrolled ? '14px 0' : '22px 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand / Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--gradient-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)'
          }}>
            <Code2 size={22} color="#fff" />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              {name || 'Portfolio'}
            </span>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>.</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: 500,
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              {link.name}
            </a>
          ))}

          {/* Owner Mode Status Tag (Only shows to owner) */}
          {isOwner && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: visitorPreview ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                border: `1px solid ${visitorPreview ? '#f59e0b' : '#10b981'}`,
                color: visitorPreview ? '#f59e0b' : '#10b981',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              onClick={() => setVisitorPreview(!visitorPreview)}
              title="Click to toggle between Owner View and Visitor Preview"
            >
              <div className="owner-status-pulse" style={{ background: visitorPreview ? '#f59e0b' : '#10b981', boxShadow: `0 0 10px ${visitorPreview ? '#f59e0b' : '#10b981'}` }} />
              <span>{visitorPreview ? 'Visitor Preview' : 'Owner Active'}</span>
            </div>
          )}

          {/* Resume Download CTA */}
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              download
            >
              <Download size={15} />
              <span>Resume</span>
            </a>
          ) : (
            <a href="#contact" className="btn btn-primary btn-sm">
              <Send size={14} />
              <span>Let's Talk</span>
            </a>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#090d16',
            borderBottom: '1px solid var(--border-glass)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontWeight: 500,
                padding: '8px 0'
              }}
            >
              {link.name}
            </a>
          ))}

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              download
            >
              <Download size={16} />
              Download Resume
            </a>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
