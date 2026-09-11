import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Plus, 
  Edit3, 
  RotateCcw, 
  X,
  ChevronUp,
  Inbox
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const OwnerBar = ({ onOpenEditProfile, onAddItem, onOpenInbox }) => {
  const { isOwner, visitorPreview, setVisitorPreview, exitOwnerMode, resetToDefault } = usePortfolio();
  const [showAddMenu, setShowAddMenu] = useState(false);

  if (!isOwner) return null;

  return (
    <div className="owner-dock-bar">
      {/* Status & Mode Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="owner-status-pulse" style={{ background: visitorPreview ? '#f59e0b' : '#10b981', boxShadow: `0 0 10px ${visitorPreview ? '#f59e0b' : '#10b981'}` }} />
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
          {visitorPreview ? 'Visitor Preview' : 'Owner Edit Mode'}
        </span>
      </div>

      <div style={{ height: '20px', width: '1px', background: 'rgba(255, 255, 255, 0.15)' }} />

      {/* Visitor Preview Toggle */}
      <button
        className="btn btn-outline btn-sm"
        onClick={() => setVisitorPreview(!visitorPreview)}
        style={{
          fontSize: '0.8rem',
          padding: '6px 12px',
          borderColor: visitorPreview ? '#f59e0b' : undefined,
          color: visitorPreview ? '#f59e0b' : '#fff'
        }}
        title="Toggle between seeing the edit buttons and clean visitor view"
      >
        {visitorPreview ? <Eye size={14} /> : <EyeOff size={14} />}
        <span>{visitorPreview ? 'Exit Preview' : 'Preview as Visitor'}</span>
      </button>

      {/* View Messages Inbox */}
      <button
        className="btn btn-outline btn-sm"
        onClick={onOpenInbox}
        style={{ fontSize: '0.8rem', padding: '6px 12px', color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.4)' }}
        title="View Messages received from Contact form"
      >
        <Inbox size={14} />
        <span>Inbox</span>
      </button>

      {/* Profile Edit */}
      {!visitorPreview && (
        <button
          className="btn btn-outline btn-sm"
          onClick={onOpenEditProfile}
          style={{ fontSize: '0.8rem', padding: '6px 12px' }}
        >
          <Edit3 size={14} />
          <span>Edit Profile</span>
        </button>
      )}

      {/* Quick Add Menu */}
      {!visitorPreview && (
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddMenu(!showAddMenu)}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <Plus size={14} />
            <span>+ Add Section</span>
            <ChevronUp size={12} style={{ transform: showAddMenu ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
          </button>

          {showAddMenu && (
            <div
              style={{
                position: 'absolute',
                bottom: '120%',
                right: 0,
                background: '#0f172a',
                border: '1px solid var(--border-glow)',
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
                minWidth: '200px',
                zIndex: 1001
              }}
            >
              {[
                { label: 'Project', section: 'projects' },
                { label: 'Experience', section: 'experience' },
                { label: 'Education', section: 'education' },
                { label: 'Certification', section: 'certificates' },
                { label: 'Extracurricular / Activity', section: 'extracurricular' },
                { label: 'Skill', section: 'skills' },
              ].map((item) => (
                <button
                  key={item.section}
                  onClick={() => {
                    onAddItem(item.section);
                    setShowAddMenu(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(139, 92, 246, 0.2)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  + Add {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reset Data Option */}
      {!visitorPreview && (
        <button
          className="btn btn-outline btn-sm btn-icon"
          onClick={() => {
            if (window.confirm('Reset all portfolio details to initial seed data?')) {
              resetToDefault();
            }
          }}
          title="Reset to Initial Data"
          style={{ color: 'var(--text-muted)' }}
        >
          <RotateCcw size={14} />
        </button>
      )}

      {/* Exit Owner Mode */}
      <button
        className="btn btn-outline btn-sm btn-icon"
        onClick={exitOwnerMode}
        title="Lock & Exit Owner Mode"
        style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default OwnerBar;
