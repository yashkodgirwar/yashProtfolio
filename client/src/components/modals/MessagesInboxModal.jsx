import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  X, 
  Mail, 
  Clock, 
  RotateCcw, 
  Send,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import { contactAPI } from '../../services/api';

const MessagesInboxModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await contactAPI.getMessages();
      if (res.data?.success && Array.isArray(res.data?.data)) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch contact messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Inbox className="text-violet-400" size={24} color="#a78bfa" />
            <span>Contact Messages & Inquiries ({messages.length})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="btn btn-outline btn-sm btn-icon"
              onClick={fetchMessages}
              title="Refresh Messages"
            >
              <RotateCcw size={14} />
            </button>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <MessageSquare size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <h4 style={{ color: '#fff', marginBottom: '6px' }}>No messages yet</h4>
            <p style={{ fontSize: '0.88rem' }}>When visitors submit the contact form on your portfolio, their messages will appear here instantly!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '60vh', overflowY: 'auto' }}>
            {messages.map((msg, idx) => (
              <div
                key={msg.id || msg._id || idx}
                className="glass-card"
                style={{ padding: '18px 20px', background: 'rgba(255, 255, 255, 0.03)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginRight: '8px' }}>
                      {msg.name}
                    </span>
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                      style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', textDecoration: 'none' }}
                    >
                      &lt;{msg.email}&gt;
                    </a>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Clock size={12} />
                    <span>{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Recent'}</span>
                  </div>
                </div>

                {msg.subject && (
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '8px' }}>
                    Subject: {msg.subject}
                  </div>
                )}

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', background: 'rgba(0,0,0,0.2)', padding: '10px 14px', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
                  {msg.message}
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.8rem', padding: '4px 12px' }}
                  >
                    <Send size={12} />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesInboxModal;
