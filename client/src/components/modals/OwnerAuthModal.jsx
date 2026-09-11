import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, X, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const OwnerAuthModal = () => {
  const { showAuthModal, setShowAuthModal, unlockOwnerMode } = usePortfolio();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!showAuthModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = unlockOwnerMode(pin);
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <ShieldCheck className="text-violet-400" size={24} color="#a78bfa" />
            <span>Owner Mode Access</span>
          </div>
          <button className="modal-close-btn" onClick={() => setShowAuthModal(false)}>
            <X size={18} />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: '#a78bfa'
          }}>
            <Lock size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Enter Owner Passcode</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Please enter your secret owner passcode to enable editing mode.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-input"
                placeholder="Enter PIN (e.g. 1234)"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                autoFocus
                style={{
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  letterSpacing: '4px',
                  borderColor: error ? '#ef4444' : undefined
                }}
              />
              <KeyRound
                size={18}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              />
            </div>
            {error && (
              <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px', display: 'block', textAlign: 'center' }}>
                Incorrect PIN. Default is 1234.
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              className="btn btn-outline"
              style={{ flex: 1 }}
              onClick={() => setShowAuthModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1.5 }}
            >
              <Sparkles size={18} />
              Unlock Mode
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerAuthModal;
