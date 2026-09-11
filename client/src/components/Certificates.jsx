import React from 'react';
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2,
  CheckCircle 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Certificates = ({ onAddItem, onEditItem }) => {
  const { data, isEditingEnabled, deleteItem } = usePortfolio();
  const certificates = data?.certificates || [];

  return (
    <section id="certificates">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Verified Credentials</div>
          <h2 className="section-title">Certifications & Achievements</h2>
          <p className="section-subtitle">
            Professional certifications, cloud credentials, and accredited developer specializations.
          </p>

          {/* Owner Add Button */}
          {isEditingEnabled && (
            <button
              className="owner-add-btn"
              onClick={() => onAddItem('certificates')}
            >
              <Plus size={16} />
              <span>Add Certification</span>
            </button>
          )}
        </div>

        {/* Certs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {certificates.map((cert, idx) => (
            <div
              key={cert.id || cert._id || idx}
              className="glass-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Owner Actions */}
              {isEditingEnabled && (
                <div className="owner-card-actions">
                  <button
                    className="owner-action-btn edit"
                    title="Edit Certificate"
                    onClick={() => onEditItem('certificates', cert)}
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    className="owner-action-btn delete"
                    title="Delete Certificate"
                    onClick={() => deleteItem('certificates', cert.id || cert._id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(236, 72, 153, 0.12)',
                  border: '1px solid rgba(236, 72, 153, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-rose)',
                  flexShrink: 0
                }}>
                  <Award size={28} />
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '4px', lineHeight: '1.3' }}>
                    {cert.name}
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                    {cert.issuer}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                <Calendar size={13} />
                <span>Issued {cert.issueDate}</span>
              </div>

              {/* Skills covered */}
              {Array.isArray(cert.skills) && cert.skills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px', marginTop: 'auto' }}>
                  {cert.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-glass)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Credential Link */}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <ShieldCheck size={14} color="#10b981" />
                  <span>Verify Credential</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}

          {certificates.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
              No certificates added yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
