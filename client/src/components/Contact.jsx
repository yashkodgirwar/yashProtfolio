import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

const Contact = () => {
  const { data, sendContact, showToast } = usePortfolio();
  const profile = data?.profile || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    if (profile.email) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      showToast('📋 Email copied to clipboard!', 'info');
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields.', 'warning');
      return;
    }

    setSending(true);
    try {
      const success = await sendContact(formData);
      if (success) {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Get In Touch</div>
          <h2 className="section-title">Let's Build Something Great Together</h2>
          <p className="section-subtitle">
            Have a project in mind, an exciting job opportunity, or just want to connect? Reach out anytime!
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '40px',
          alignItems: 'start'
        }} className="contact-grid">
          {/* Left Column: Direct Contact Info */}
          <div>
            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '14px' }}>
              Contact Information
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '28px' }}>
              I am open to full-time roles, freelance projects, and technical collaborations. Feel free to drop a message or reach out on social platforms.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {/* Email Card */}
              {profile.email && (
                <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(139, 92, 246, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#a78bfa'
                    }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Email Address</div>
                      <div style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{profile.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="owner-action-btn"
                    style={{ opacity: 1, position: 'static' }}
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={14} color="#10b981" /> : <Copy size={14} color="var(--text-secondary)" />}
                  </button>
                </div>
              )}

              {/* Phone Card */}
              {profile.phone && (
                <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)'
                  }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Phone / WhatsApp</div>
                    <a href={`tel:${profile.phone}`} style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500, textDecoration: 'none' }}>
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Location Card */}
              {profile.location && (
                <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-emerald)'
                  }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Location</div>
                    <div style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{profile.location}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Social Connection Badges */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {profile.socials?.github && (
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <GithubIcon size={15} />
                  <span>GitHub</span>
                </a>
              )}
              {profile.socials?.linkedin && (
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <LinkedinIcon size={15} />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile.socials?.twitter && (
                <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <TwitterIcon size={15} />
                  <span>Twitter</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageSquare size={22} color="var(--accent-primary)" />
              <span>Send Me a Direct Message</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
              Your inquiry will be delivered directly to my message inbox.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-input"
                  placeholder="Project Proposal / Job Opportunity"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  className="form-textarea"
                  rows={4}
                  placeholder="Describe your project, timeline, or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px' }}
                disabled={sending}
              >
                <Send size={18} />
                <span>{sending ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
