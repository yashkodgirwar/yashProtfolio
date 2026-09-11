import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles,
  Award,
  Image as ImageIcon
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Extracurricular = ({ onAddItem, onEditItem }) => {
  const { data, isEditingEnabled, deleteItem } = usePortfolio();
  const [filter, setFilter] = useState('All');

  const activities = data?.extracurricular || [];
  const categories = ['All', 'Hackathon', 'Competitive Coding', 'Academic / Certification'];

  const filteredActivities = activities.filter((act) => {
    if (filter === 'All') return true;
    return act.category?.toLowerCase().includes(filter.toLowerCase()) || 
           filter.toLowerCase().includes(act.category?.toLowerCase());
  });

  return (
    <section id="extracurricular" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Leadership & Achievements</div>
          <h2 className="section-title">Extracurricular Activities & Honors</h2>
          <p className="section-subtitle">
            Hackathons, competitive programming competitions, workshops, and technical leadership milestones.
          </p>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '28px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className="btn btn-sm"
                style={{
                  background: filter === cat ? 'var(--gradient-main)' : 'rgba(255, 255, 255, 0.04)',
                  color: filter === cat ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${filter === cat ? 'transparent' : 'var(--border-glass)'}`,
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 20px'
                }}
                onClick={() => setFilter(cat)}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Owner Add Button */}
          {isEditingEnabled && (
            <div style={{ marginTop: '16px' }}>
              <button
                className="owner-add-btn"
                onClick={() => onAddItem('extracurricular')}
              >
                <Plus size={16} />
                <span>Add Extracurricular Activity</span>
              </button>
            </div>
          )}
        </div>

        {/* Activity Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '28px'
        }}>
          {filteredActivities.map((item, idx) => (
            <div
              key={item.id || item._id || idx}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Cover Photo */}
              <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden', background: '#090d16' }}>
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />

                {/* Badge Category */}
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <Trophy size={12} />
                    {item.category || 'Achievement'}
                  </span>
                </div>

                {/* Owner Actions */}
                {isEditingEnabled && (
                  <div className="owner-card-actions">
                    <button
                      className="owner-action-btn edit"
                      title="Edit Activity"
                      onClick={() => onEditItem('extracurricular', item)}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      className="owner-action-btn delete"
                      title="Delete Activity"
                      onClick={() => deleteItem('extracurricular', item.id || item._id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Activity Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  <Calendar size={13} />
                  <span>{item.date || '2025'}</span>
                  {item.event && (
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>• {item.event}</span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '10px', lineHeight: '1.3' }}>
                  {item.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                  {item.description}
                </p>

                {/* Link / Verification */}
                {item.credentialUrl && (
                  <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-glass)', paddingTop: '14px' }}>
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <Award size={14} color="#10b981" />
                      <span>View Proof / Certificate</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredActivities.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
              No extracurricular activities listed in this category yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Extracurricular;
