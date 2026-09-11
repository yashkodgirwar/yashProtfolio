import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles,
  Layers
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { getTechLogoUrl } from './TechLogos';

const Skills = ({ onAddItem, onEditItem }) => {
  const { data, isEditingEnabled, deleteItem } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const skills = data?.skills || [];
  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools & DevOps'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category?.toLowerCase() === selectedCategory.toLowerCase());

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Frontend': return 'var(--accent-primary)';
      case 'Backend': return 'var(--accent-cyan)';
      case 'Database': return 'var(--accent-emerald)';
      case 'Tools & DevOps': return 'var(--accent-amber)';
      default: return 'var(--accent-primary)';
    }
  };

  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Technical Arsenal</div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Core programming languages, frameworks, databases, and engineering tools.
          </p>

          {/* Category Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '28px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className="btn btn-sm"
                style={{
                  background: selectedCategory === cat ? 'var(--gradient-main)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${selectedCategory === cat ? 'transparent' : 'var(--border-glass)'}`,
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 20px'
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* In Owner Mode: Add Skill Button */}
          {isEditingEnabled && (
            <div style={{ marginTop: '16px' }}>
              <button
                className="owner-add-btn"
                onClick={() => onAddItem('skills')}
              >
                <Plus size={16} />
                <span>Add New Skill</span>
              </button>
            </div>
          )}
        </div>

        {/* Skills Grid - Image & Tech Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '20px'
        }}>
          {filteredSkills.map((skill) => {
            const color = getCategoryColor(skill.category);
            const logoUrl = getTechLogoUrl(skill.name, skill.image);

            return (
              <div
                key={skill.id || skill._id}
                className="glass-card"
                style={{
                  padding: '24px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  borderRadius: '16px',
                  cursor: 'default',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {/* Owner Actions */}
                {isEditingEnabled && (
                  <div className="owner-card-actions">
                    <button
                      className="owner-action-btn edit"
                      title="Edit Skill"
                      onClick={() => onEditItem('skills', skill)}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      className="owner-action-btn delete"
                      title="Delete Skill"
                      onClick={() => deleteItem('skills', skill.id || skill._id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

                {/* Technology Logo */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  padding: '12px',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}
                className="tech-logo-wrapper"
                >
                  <img
                    src={logoUrl}
                    alt={skill.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Technology Name */}
                <h4 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '6px',
                  letterSpacing: '-0.2px'
                }}>
                  {skill.name}
                </h4>

                {/* Category Pill */}
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: color,
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  {skill.category || 'Technology'}
                </span>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No skills listed in this category yet.
          </div>
        )}
      </div>

      <style>{`
        .glass-card:hover .tech-logo-wrapper {
          transform: translateY(-4px) scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default Skills;
