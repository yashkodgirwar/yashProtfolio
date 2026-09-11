import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award, 
  Plus, 
  Edit3, 
  Trash2,
  BookOpen
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Education = ({ onAddItem, onEditItem }) => {
  const { data, isEditingEnabled, deleteItem } = usePortfolio();
  const educationList = data?.education || [];

  return (
    <section id="education">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Academic Background</div>
          <h2 className="section-title">Education & Qualifications</h2>
          <p className="section-subtitle">
            Formal degrees, foundational computer science training, and academic achievements.
          </p>

          {/* Owner Add Button */}
          {isEditingEnabled && (
            <button
              className="owner-add-btn"
              onClick={() => onAddItem('education')}
            >
              <Plus size={16} />
              <span>Add Education</span>
            </button>
          )}
        </div>

        {/* Education Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {educationList.map((edu, idx) => (
            <div
              key={edu.id || edu._id || idx}
              className="glass-card"
              style={{ padding: '28px', display: 'flex', flexDirection: 'column', position: 'relative' }}
            >
              {/* Owner Actions */}
              {isEditingEnabled && (
                <div className="owner-card-actions">
                  <button
                    className="owner-action-btn edit"
                    title="Edit Education"
                    onClick={() => onEditItem('education', edu)}
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    className="owner-action-btn delete"
                    title="Delete Education"
                    onClick={() => deleteItem('education', edu.id || edu._id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(6, 182, 212, 0.12)',
                  border: '1px solid rgba(6, 182, 212, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)'
                }}>
                  <GraduationCap size={24} />
                </div>
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    color: 'var(--accent-cyan)',
                    fontWeight: 600
                  }}>
                    <Calendar size={12} />
                    <span>{edu.startYear} - {edu.endYear}</span>
                  </div>
                  {edu.location && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                      • {edu.location}
                    </span>
                  )}
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '6px', lineHeight: '1.4' }}>
                {edu.degree}
              </h3>

              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '12px' }}>
                {edu.institution}
              </div>

              {edu.grade && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  color: '#10b981',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  width: 'fit-content',
                  marginBottom: '14px'
                }}>
                  <Award size={14} />
                  <span>{edu.grade}</span>
                </div>
              )}

              {edu.description && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginTop: 'auto' }}>
                  {edu.description}
                </p>
              )}
            </div>
          ))}

          {educationList.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No education records added yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
