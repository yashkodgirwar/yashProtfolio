import React, { useState } from 'react';
import { 
  ExternalLink, 
  Star, 
  Plus, 
  Edit3, 
  Trash2, 
  Layers,
  FolderGit2
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

const Projects = ({ onAddItem, onEditItem }) => {
  const { data, isEditingEnabled, deleteItem } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = data?.projects || [];
  const categories = ['All', 'Fullstack', 'Frontend', 'Backend', 'Featured'];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return project.featured;
    return project.category?.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <section id="projects" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Featured Portfolio</div>
          <h2 className="section-title">Projects & Applications</h2>
          <p className="section-subtitle">
            A showcase of selected real-world full-stack systems, modern web apps, APIs, and client platforms.
          </p>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '28px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className="btn btn-sm"
                style={{
                  background: activeFilter === cat ? 'var(--gradient-main)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeFilter === cat ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${activeFilter === cat ? 'transparent' : 'var(--border-glass)'}`,
                  borderRadius: 'var(--radius-full)',
                  padding: '8px 20px'
                }}
                onClick={() => setActiveFilter(cat)}
              >
                {cat === 'Featured' && <Star size={14} style={{ marginRight: '4px', fill: '#f59e0b', color: '#f59e0b' }} />}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Owner Add Button */}
          {isEditingEnabled && (
            <div style={{ marginTop: '16px' }}>
              <button
                className="owner-add-btn"
                onClick={() => onAddItem('projects')}
              >
                <Plus size={16} />
                <span>Add New Project</span>
              </button>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '28px'
        }}>
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id || project._id || idx}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Cover Image Container */}
              <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden', background: '#090d16' }}>
                <img
                  src={project.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80'}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />

                {/* Badges */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
                  <span style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--accent-cyan)'
                  }}>
                    {project.category || 'Fullstack'}
                  </span>
                  {project.featured && (
                    <span style={{
                      background: 'rgba(245, 158, 11, 0.25)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#f59e0b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Star size={12} fill="#f59e0b" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Owner Actions */}
                {isEditingEnabled && (
                  <div className="owner-card-actions">
                    <button
                      className="owner-action-btn edit"
                      title="Edit Project"
                      onClick={() => onEditItem('projects', project)}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      className="owner-action-btn delete"
                      title="Delete Project"
                      onClick={() => deleteItem('projects', project.id || project._id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Project Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '10px' }}>
                  {project.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '18px', flex: 1 }}>
                  {project.description}
                </p>

                {/* Tech Tags */}
                {Array.isArray(project.tags) && project.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-glass)',
                          padding: '3px 10px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                          fontWeight: 500
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Project Links */}
                <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      style={{ flex: project.liveUrl ? 0.8 : 1 }}
                    >
                      <GithubIcon size={14} />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
