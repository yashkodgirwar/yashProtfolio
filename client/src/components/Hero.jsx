import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Download, 
  Edit3, 
  Upload, 
  Sparkles, 
  Briefcase, 
  FolderGit2, 
  Smile, 
  Mail, 
  FileCode2 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

const Hero = ({ onOpenEditProfile }) => {
  const { data, isEditingEnabled, uploadFile, updateProfile } = usePortfolio();
  const profile = data?.profile || {};
  const [typedTitle, setTypedTitle] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);

  const titles = [
    profile.title || 'Full Stack MERN Developer',
    'B.Tech IT (9.33 CGPA)',
    'AI SaaS & Systems Developer',
    'Smart India Hackathon Winner 2025'
  ];

  // Typing effect
  useEffect(() => {
    let currentIdx = 0;
    let isDeleting = false;
    let text = '';
    const speed = 100;
    const currentTitle = titles[titleIndex % titles.length];

    const timer = setInterval(() => {
      if (!isDeleting) {
        text = currentTitle.substring(0, text.length + 1);
        setTypedTitle(text);
        if (text === currentTitle) {
          setTimeout(() => { isDeleting = true; }, 1600);
        }
      } else {
        text = currentTitle.substring(0, text.length - 1);
        setTypedTitle(text);
        if (text === '') {
          isDeleting = false;
          setTitleIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearInterval(timer);
  }, [titleIndex, profile.title]);

  const handleAvatarDirectUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) {
      await updateProfile({ avatar: url });
    }
  };

  return (
    <section className="hero-wrapper" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Intro & Info */}
          <div>
            {/* Status / Availability Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div className="section-badge" style={{ marginBottom: 0 }}>
                <span className="owner-status-pulse" />
                <span>{profile.availability || 'B.Tech IT • Open to Opportunities'}</span>
              </div>

              {isEditingEnabled && (
                <button
                  className="btn btn-outline btn-sm"
                  onClick={onOpenEditProfile}
                  style={{
                    borderColor: 'rgba(139, 92, 246, 0.4)',
                    color: '#a78bfa',
                    padding: '4px 12px',
                    fontSize: '0.8rem'
                  }}
                >
                  <Edit3 size={13} />
                  <span>Edit Profile & Socials</span>
                </button>
              )}
            </div>

            {/* Name & Animated Title */}
            <h1 style={{ fontSize: '3.4rem', fontWeight: 900, marginBottom: '16px', letterSpacing: '-1px' }}>
              Hi, I'm <span style={{ background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{profile.name || 'Yash Kodgirwar'}</span>
            </h1>

            <div style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--accent-cyan)', minHeight: '44px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '18px' }}>
              <span>{typedTitle}</span>
              <span style={{ animation: 'pulseGreen 1s infinite', color: '#fff' }}>|</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '32px', maxWidth: '580px' }}>
              {profile.tagline || profile.bio || 'B.Tech IT student at G.H. Raisoni College with 9.33 CGPA, developing full-stack MERN applications, AI systems, and cloud platforms.'}
            </p>

            {/* Call to Actions */}
            <div className="hero-cta-group" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <a href="#projects" className="btn btn-primary">
                <span>View Projects</span>
                <ArrowRight size={18} />
              </a>

              <a href="#contact" className="btn btn-outline">
                <Mail size={18} />
                <span>Contact Me</span>
              </a>

              {profile.resumeUrl ? (
                <a 
                  href={profile.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-accent" 
                  download
                >
                  <Download size={18} />
                  <span>Download Resume</span>
                </a>
              ) : (
                <a 
                  href={isEditingEnabled ? '#edit-profile' : '#contact'} 
                  onClick={(e) => {
                    if (isEditingEnabled) {
                      e.preventDefault();
                      onOpenEditProfile();
                    }
                  }}
                  className="btn btn-accent" 
                  title={isEditingEnabled ? 'Click to upload or link your resume' : 'Contact to request resume'}
                >
                  <Download size={18} />
                  <span>Download Resume</span>
                </a>
              )}
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Connect:</span>
              {profile.socials?.github && (
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="btn-icon btn-outline" title="GitHub">
                  <GithubIcon size={18} />
                </a>
              )}
              {profile.socials?.linkedin && (
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon btn-outline" title="LinkedIn">
                  <LinkedinIcon size={18} />
                </a>
              )}
              {profile.socials?.twitter && (
                <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="btn-icon btn-outline" title="Twitter / X">
                  <TwitterIcon size={18} />
                </a>
              )}
              {profile.socials?.leetcode && (
                <a href={profile.socials.leetcode} target="_blank" rel="noopener noreferrer" className="btn-icon btn-outline" title="LeetCode">
                  <FileCode2 size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Avatar Photo with glowing ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="hero-avatar-container">
              <div className="hero-avatar-glow" />
              <img
                src={profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                alt={profile.name}
                className="hero-avatar-img"
              />

              {/* In Owner Mode: Instant Hover to Change Photo */}
              {isEditingEnabled && (
                <label className="avatar-edit-overlay">
                  <Upload size={24} />
                  <span>Change Photo</span>
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarDirectUpload} />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
