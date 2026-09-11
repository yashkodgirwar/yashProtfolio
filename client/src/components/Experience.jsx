import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Experience = ({ onAddItem, onEditItem }) => {
  const { data, isEditingEnabled, deleteItem } = usePortfolio();
  const experiences = data?.experience || [];

  return (
    <section id="experience" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Career Journey</div>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            My professional background, industry roles, engineering accomplishments, and technological contributions.
          </p>

          {/* Owner Add Button */}
          {isEditingEnabled && (
            <button
              className="owner-add-btn"
              onClick={() => onAddItem('experience')}
            >
              <Plus size={16} />
              <span>Add Experience</span>
            </button>
          )}
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          {experiences.map((exp, idx) => (
            <div key={exp.id || exp._id || idx} className="timeline-item">
              <div className="timeline-dot" />

              <div className="timeline-card">
                {/* Owner Card Actions */}
                {isEditingEnabled && (
                  <div className="owner-card-actions">
                    <button
                      className="owner-action-btn edit"
                      title="Edit Experience"
                      onClick={() => onEditItem('experience', exp)}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      className="owner-action-btn delete"
                      title="Delete Experience"
                      onClick={() => deleteItem('experience', exp.id || exp._id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '4px' }}>
                      {exp.role}
                    </h3>
                    <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                      {exp.company}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(139, 92, 246, 0.12)',
                      border: '1px solid rgba(139, 92, 246, 0.25)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      color: '#a78bfa'
                    }}>
                      <Calendar size={13} />
                      <span>{exp.startDate} - {exp.endDate || (exp.current ? 'Present' : '')}</span>
                    </div>

                    {exp.location && (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)'
                      }}>
                        <MapPin size={13} />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {exp.description && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                    {exp.description}
                  </p>
                )}

                {/* Bullet Highlights */}
                {Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {exp.highlights.map((point, pIdx) => (
                      <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {experiences.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No experience records added yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
