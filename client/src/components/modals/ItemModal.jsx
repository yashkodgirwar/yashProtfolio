import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit3, X, Upload, Save } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const ItemModal = ({ isOpen, onClose, section, initialData = null }) => {
  const { addItem, updateItem, uploadFile } = usePortfolio();
  const [formData, setFormData] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(initialData?.id || initialData?._id);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : (initialData.tags || ''),
        highlights: Array.isArray(initialData.highlights) ? initialData.highlights.join('\n') : (initialData.highlights || ''),
        skills: Array.isArray(initialData.skills) ? initialData.skills.join(', ') : (initialData.skills || '')
      });
    } else {
      // Default empty templates
      if (section === 'projects') {
        setFormData({
          title: '',
          category: 'Fullstack',
          description: '',
          image: '',
          tags: '',
          liveUrl: '',
          githubUrl: '',
          featured: false
        });
      } else if (section === 'experience') {
        setFormData({
          role: '',
          company: '',
          location: '',
          startDate: '',
          endDate: 'Present',
          current: true,
          description: '',
          highlights: ''
        });
      } else if (section === 'education') {
        setFormData({
          degree: '',
          institution: '',
          location: '',
          startYear: '',
          endYear: '',
          grade: '',
          description: ''
        });
      } else if (section === 'certificates') {
        setFormData({
          name: '',
          issuer: '',
          issueDate: '',
          credentialUrl: '',
          image: '',
          skills: ''
        });
      } else if (section === 'skills') {
        setFormData({
          name: '',
          category: 'Frontend',
          level: 85,
          icon: 'Code2'
        });
      } else if (section === 'extracurricular') {
        setFormData({
          title: '',
          category: 'Hackathon',
          event: '',
          date: '2025',
          image: '',
          description: '',
          credentialUrl: ''
        });
      }
    }
  }, [section, initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadFile(file);
      if (url) {
        setFormData((prev) => ({ ...prev, image: url }));
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const preparedData = { ...formData };

      // Parse tags / highlights / skills
      if (typeof preparedData.tags === 'string') {
        preparedData.tags = preparedData.tags.split(',').map((t) => t.trim()).filter(Boolean);
      }
      if (typeof preparedData.skills === 'string') {
        preparedData.skills = preparedData.skills.split(',').map((s) => s.trim()).filter(Boolean);
      }
      if (typeof preparedData.highlights === 'string') {
        preparedData.highlights = preparedData.highlights.split('\n').map((h) => h.trim()).filter(Boolean);
      }
      if (section === 'skills' && preparedData.level) {
        preparedData.level = Number(preparedData.level);
      }

      if (isEditing) {
        const id = initialData.id || initialData._id;
        await updateItem(section, id, preparedData);
      } else {
        await addItem(section, preparedData);
      }
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const getSectionTitle = () => {
    const titles = {
      projects: 'Project',
      experience: 'Work Experience',
      education: 'Education',
      certificates: 'Certification',
      skills: 'Skill',
      extracurricular: 'Extracurricular Activity / Honor'
    };
    const title = titles[section] || 'Item';
    return isEditing ? `Edit ${title}` : `Add New ${title}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            {isEditing ? <Edit3 className="text-violet-400" size={24} color="#a78bfa" /> : <PlusCircle className="text-emerald-400" size={24} color="#10b981" />}
            <span>{getSectionTitle()}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PROJECTS FORM */}
          {section === 'projects' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-input"
                    value={formData.title || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select name="category" className="form-select" value={formData.category || 'Fullstack'} onChange={handleChange}>
                    <option value="Fullstack">Fullstack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Mobile">Mobile App</option>
                    <option value="AI / ML">AI / ML</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  rows={3}
                  value={formData.description || ''}
                  onChange={handleChange}
                  placeholder="What problem does this project solve? Key features..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cover Image</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    name="image"
                    className="form-input"
                    placeholder="Image URL or upload screenshot"
                    value={formData.image || ''}
                    onChange={handleChange}
                  />
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    <Upload size={14} />
                    {uploadingImage ? '...' : 'Upload'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Technologies (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  className="form-input"
                  placeholder="React, Node.js, MongoDB, TailwindCSS"
                  value={formData.tags || ''}
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Live Demo URL</label>
                  <input
                    type="text"
                    name="liveUrl"
                    className="form-input"
                    placeholder="https://..."
                    value={formData.liveUrl || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub Repository URL</label>
                  <input
                    type="text"
                    name="githubUrl"
                    className="form-input"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={Boolean(formData.featured)}
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
                <label htmlFor="featured" style={{ cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Mark as Featured Project (Highlighted Badge)
                </label>
              </div>
            </>
          )}

          {/* EXPERIENCE FORM */}
          {section === 'experience' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Job Title / Role *</label>
                  <input
                    type="text"
                    name="role"
                    className="form-input"
                    value={formData.role || ''}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company Name *</label>
                  <input
                    type="text"
                    name="company"
                    className="form-input"
                    value={formData.company || ''}
                    onChange={handleChange}
                    placeholder="e.g. Google / Startup Inc"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-input"
                    value={formData.location || ''}
                    onChange={handleChange}
                    placeholder="Remote / City"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    name="startDate"
                    className="form-input"
                    value={formData.startDate || ''}
                    onChange={handleChange}
                    placeholder="Jan 2023"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="text"
                    name="endDate"
                    className="form-input"
                    value={formData.endDate || ''}
                    onChange={handleChange}
                    placeholder="Present or Dec 2023"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Role Summary</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  rows={2}
                  value={formData.description || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Achievements / Highlights (One per line)</label>
                <textarea
                  name="highlights"
                  className="form-textarea"
                  rows={3}
                  value={formData.highlights || ''}
                  onChange={handleChange}
                  placeholder="Built REST APIs reducing latency by 30%&#10;Mentored 4 junior engineers"
                />
              </div>
            </>
          )}

          {/* EDUCATION FORM */}
          {section === 'education' && (
            <>
              <div className="form-group">
                <label className="form-label">Degree / Certificate *</label>
                <input
                  type="text"
                  name="degree"
                  className="form-input"
                  value={formData.degree || ''}
                  onChange={handleChange}
                  placeholder="e.g. Bachelor of Technology in Computer Science"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Institution / University *</label>
                  <input
                    type="text"
                    name="institution"
                    className="form-input"
                    value={formData.institution || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Grade / GPA</label>
                  <input
                    type="text"
                    name="grade"
                    className="form-input"
                    value={formData.grade || ''}
                    onChange={handleChange}
                    placeholder="8.8 CGPA / 90%"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Start Year</label>
                  <input
                    type="text"
                    name="startYear"
                    className="form-input"
                    value={formData.startYear || ''}
                    onChange={handleChange}
                    placeholder="2019"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Year</label>
                  <input
                    type="text"
                    name="endYear"
                    className="form-input"
                    value={formData.endYear || ''}
                    onChange={handleChange}
                    placeholder="2023"
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

              <div className="form-group">
                <label className="form-label">Description / Core Subjects</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  rows={2}
                  value={formData.description || ''}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* CERTIFICATES FORM */}
          {section === 'certificates' && (
            <>
              <div className="form-group">
                <label className="form-label">Certificate Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name || ''}
                  onChange={handleChange}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Issuing Organization *</label>
                  <input
                    type="text"
                    name="issuer"
                    className="form-input"
                    value={formData.issuer || ''}
                    onChange={handleChange}
                    placeholder="e.g. Amazon Web Services / Meta"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Issue Date</label>
                  <input
                    type="text"
                    name="issueDate"
                    className="form-input"
                    value={formData.issueDate || ''}
                    onChange={handleChange}
                    placeholder="Oct 2023"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Badge Image</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    name="image"
                    className="form-input"
                    placeholder="Badge Image URL"
                    value={formData.image || ''}
                    onChange={handleChange}
                  />
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    <Upload size={14} />
                    {uploadingImage ? '...' : 'Upload'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Verification / Credential URL</label>
                <input
                  type="text"
                  name="credentialUrl"
                  className="form-input"
                  placeholder="https://..."
                  value={formData.credentialUrl || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Skills Covered (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  className="form-input"
                  placeholder="Cloud Architecture, EC2, S3, IAM"
                  value={formData.skills || ''}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* SKILLS FORM */}
          {section === 'skills' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Technology / Skill Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="e.g. React.js, Node.js, Docker, Python"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select name="category" className="form-select" value={formData.category || 'Frontend'} onChange={handleChange}>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Tools & DevOps">Tools & DevOps</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Custom Logo Image (Optional - Auto-detected from name)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    name="image"
                    className="form-input"
                    placeholder="Custom SVG/PNG logo URL (leave blank for automatic logo)"
                    value={formData.image || ''}
                    onChange={handleChange}
                  />
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    <Upload size={14} />
                    {uploadingImage ? '...' : 'Upload Logo'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                  </label>
                </div>
              </div>
            </>
          )}

          {/* EXTRACURRICULAR FORM */}
          {section === 'extracurricular' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Activity / Award Title *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-input"
                    value={formData.title || ''}
                    onChange={handleChange}
                    placeholder="e.g. Winner – Smart India Hackathon"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select name="category" className="form-select" value={formData.category || 'Hackathon'} onChange={handleChange}>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Competitive Coding">Competitive Coding</option>
                    <option value="Academic / Certification">Academic / Certification</option>
                    <option value="Workshop & Seminar">Workshop & Seminar</option>
                    <option value="Leadership & Community">Leadership & Community</option>
                    <option value="Sports & Cultural">Sports & Cultural</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Event / Organizer / Competition Name</label>
                  <input
                    type="text"
                    name="event"
                    className="form-input"
                    value={formData.event || ''}
                    onChange={handleChange}
                    placeholder="e.g. Smart India Hackathon 2025"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Year / Date</label>
                  <input
                    type="text"
                    name="date"
                    className="form-input"
                    value={formData.date || ''}
                    onChange={handleChange}
                    placeholder="e.g. 2025 or Aug 2025"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Activity Photo / Certificate Image</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    name="image"
                    className="form-input"
                    placeholder="Image URL or upload event photo"
                    value={formData.image || ''}
                    onChange={handleChange}
                  />
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    <Upload size={14} />
                    {uploadingImage ? '...' : 'Upload Photo'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description / Highlights *</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  rows={3}
                  value={formData.description || ''}
                  onChange={handleChange}
                  placeholder="Describe the activity, your role, achievements, or project..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Proof / Credential Link (Optional)</label>
                <input
                  type="text"
                  name="credentialUrl"
                  className="form-input"
                  placeholder="https://..."
                  value={formData.credentialUrl || ''}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={18} />
              {saving ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemModal;
