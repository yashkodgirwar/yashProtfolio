import React from 'react';
import { 
  Trophy, 
  Code, 
  Cpu, 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  CheckCircle2, 
  GraduationCap 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const About = () => {
  const { data } = usePortfolio();
  const profile = data?.profile || {};

  const highlights = [
    {
      icon: <Trophy size={24} color="#f59e0b" />,
      title: "Smart India Hackathon Winner",
      description: "Internal Round Winner (2025). Proven track record of architecting high-pressure problem solving solutions."
    },
    {
      icon: <Cpu size={24} color="#8b5cf6" />,
      title: "Full Stack & AI SaaS Engineering",
      description: "Building production-grade applications with React, Express, Node.js, MongoDB, PostgreSQL, and LLM integrations."
    },
    {
      icon: <Award size={24} color="#10b981" />,
      title: "Top 50 Blind Coding & NPTEL",
      description: "Strong algorithmic problem solving with deep appreciation for clean, bug-free, and ethical coding practices."
    },
    {
      icon: <BookOpen size={24} color="#06b6d4" />,
      title: "9.33 CGPA Academic Excellence",
      description: "Mastery of Core Computer Science: DSA, OOP, DBMS, Computer Networks, Operating Systems, and Machine Learning."
    }
  ];

  const coursework = [
    "Data Structures & Algorithms (DSA)",
    "Object-Oriented Programming (OOP)",
    "Database Management Systems (DBMS)",
    "Computer Networks",
    "Operating Systems",
    "Machine Learning (Basics)"
  ];

  return (
    <section id="about" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">About Me</div>
          <h2 className="section-title">Driven by Innovation & Engineering Rigor</h2>
          <p className="section-subtitle">
            An Information Technology engineering student at G.H. Raisoni College, Pune with a passion for scalable web platforms and AI systems.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px', alignItems: 'center', marginBottom: '40px' }} className="about-grid">
          {/* Bio Text */}
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', color: '#fff' }}>
              Hello! I'm <span style={{ color: 'var(--accent-primary)' }}>{profile.name}</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '16px' }}>
              {profile.bio || 'I am an Information Technology student with a 9.33 CGPA, passionate about crafting innovative web applications, AI-assisted productivity tools, and distributed systems.'}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '28px' }}>
              Having worked on production-ready AI SaaS tools, hospital coordination portals, and machine learning forensic systems during my internship at Infosys Springboard, I bring strong hands-on problem solving skills to every project.
            </p>

            {/* Quick Contact Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '28px' }}>
              {profile.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                  <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa' }}>
                    <Mail size={16} />
                  </div>
                  <span style={{ fontSize: '0.9rem' }}>{profile.email}</span>
                </div>
              )}
              {profile.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                  <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
                    <Phone size={16} />
                  </div>
                  <span style={{ fontSize: '0.9rem' }}>{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                  <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                    <MapPin size={16} />
                  </div>
                  <span style={{ fontSize: '0.9rem' }}>{profile.location}</span>
                </div>
              )}
            </div>

            {/* Coursework Pills */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                Key Computer Science Coursework:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {coursework.map((course, cIdx) => (
                  <span
                    key={cIdx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-glass)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Highlight Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="highlight-cards">
            {highlights.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '24px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  {item.icon}
                </div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '8px', color: '#fff' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .highlight-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
