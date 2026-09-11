import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Toast = () => {
  const { toasts } = usePortfolio();

  if (!toasts.length) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px'
    }}>
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 20px',
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${isSuccess ? '#10b981' : isError ? '#ef4444' : isWarning ? '#f59e0b' : '#8b5cf6'}`,
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              color: '#ffffff',
              fontSize: '0.9rem',
              fontWeight: 500,
              animation: 'fadeIn 0.25s ease-out'
            }}
          >
            {isSuccess && <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0 }} />}
            {isError && <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0 }} />}
            {isWarning && <AlertCircle size={20} color="#f59e0b" style={{ flexShrink: 0 }} />}
            {!isSuccess && !isError && !isWarning && <Info size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />}
            <span style={{ flex: 1 }}>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
