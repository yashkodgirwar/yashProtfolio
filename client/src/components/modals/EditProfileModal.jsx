import React, { useState, useEffect } from 'react';
import { User, X, Upload, FileText, Link, Save, Globe } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const EditProfileModal = ({ isOpen, onClose }) => {
  const { data, updateProfile, uploadFile } = usePortfolio();
  const [formData, setFormData] = useState({ ...data.profile });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.profile) {
      setFormData({
        ...data.profile,
        socials: { ...data.profile.socials }
      });
    }
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [name]: value }
    }));
  };

  const handleAvatarFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const url = await uploadFile(file);
      if (url) {
        setFormData((prev) => ({ ...prev, avatar: url }));
      }
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleResumeFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      const url = await uploadFile(file);
      if (url) {
        setFormData((prev) => ({ ...prev, resumeUrl: url }));
      }
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <User className="text-violet-400" size={24} color="#a78bfa" />
            <span>Edit Profile & Hero Details</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Main Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Professional Title</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={formData.title || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Hero Tagline</label>
            <input
              type="text"
              name="tagline"
              className="form-input"
              value={formData.tagline || ''}
              onChange={handleChange}
              placeholder="e.g. Building next-gen web applications"
            />
          </div>

          <div className="form-group">
            <label className="form-label">About / Bio</label>
            <textarea
              name="bio"
              className="form-textarea"
              rows={4}
              value={formData.bio || ''}
              onChange={handleChange}
              placeholder="Tell your story..."
            />
          </div>

          {/* Photo & Resume Upload Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Profile Photo</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  name="avatar"
                  className="form-input"
                  value={formData.avatar || ''}
                  onChange={handleChange}
                  placeholder="Image URL"
                />
                <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  <Upload size={14} />
                  {uploadingAvatar ? '...' : 'Upload'}
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarFile} />
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Resume / CV (PDF or Link)</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  name="resumeUrl"
                  className="form-input"
                  value={formData.resumeUrl || ''}
                  onChange={handleChange}
                  placeholder="Resume URL / Google Drive"
                />
                <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  <FileText size={14} />
                  {uploadingResume ? '...' : 'Upload PDF'}
                  <input type="file" accept=".pdf,application/pdf" style={{ display: 'none' }} onChange={handleResumeFile} />
                </label>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-input"
                value={formData.phone || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-input"
                value={formData.location || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Status */}
          <div className="form-group">
            <label className="form-label">Availability / Status Tag</label>
            <input
              type="text"
              name="availability"
              className="form-input"
              value={formData.availability || ''}
              onChange={handleChange}
              placeholder="e.g. B.Tech IT • Open to Opportunities"
            />
          </div>

          {/* Social Links */}
          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', marginTop: '12px' }}>
            <h4 style={{ fontSize: '1rem', color: '#a78bfa', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={16} />
              Social Media Links
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input
                  type="text"
                  name="github"
                  className="form-input"
                  value={formData.socials?.github || ''}
                  onChange={handleSocialChange}
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn URL</label>
                <input
                  type="text"
                  name="linkedin"
                  className="form-input"
                  value={formData.socials?.linkedin || ''}
                  onChange={handleSocialChange}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="form-group">
                <label className="form-label">Twitter / X URL</label>
                <input
                  type="text"
                  name="twitter"
                  className="form-input"
                  value={formData.socials?.twitter || ''}
                  onChange={handleSocialChange}
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div className="form-group">
                <label className="form-label">Instagram / LeetCode URL</label>
                <input
                  type="text"
                  name="leetcode"
                  className="form-input"
                  value={formData.socials?.leetcode || ''}
                  onChange={handleSocialChange}
                  placeholder="https://leetcode.com/..."
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
