'use client';

import { useState, useEffect } from 'react';
import { Mail, PhoneCall, ChevronDown, Contact } from 'lucide-react';

// Custom Brand Icons (Lucide removed brands in recent versions)
const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const CVIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);

const OutlookIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 21V3L2 5V19L10 21Z" />
    <path d="M10 5H22V19H10" />
    <path d="M13 10l4 4 4-4" />
  </svg>
);

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  techStack: string[];
}

interface Bio {
  id: string;
  name: string;
  title: string;
  summary: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  facebook: string;
  phone: string;
  outlook: string;
  cv_url: string;
}

interface Skill {
  name: string;
  items: string[];
}

interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

interface Education {
  institution: string;
  degree: string;
  major: string;
  period: string;
}

interface PortfolioData {
  bio: Bio | null;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
}

export default function PortfolioSection({ initialData }: { initialData?: PortfolioData }) {
  const [bio, setBio] = useState<Bio | null>(initialData?.bio || null);
  const [skills, setSkills] = useState<Skill[]>(initialData?.skills || []);
  const [experience, setExperience] = useState<Experience[]>(initialData?.experience || []);
  const [education, setEducation] = useState<Education[]>(initialData?.education || []);
  const [projects, setProjects] = useState<Project[]>(initialData?.projects || []);
  const [loading, setLoading] = useState(!initialData);
  const [showCTA, setShowCTA] = useState(true);

  useEffect(() => {
    // Keep logic for future use but start as visible
    const handleScroll = () => {
      // Logic could be added back here if needed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (initialData) return;
    
    // Fallback fetching logic only if no initial data (e.g. standalone navigation)
    const fetchData = async () => {
      try {
        const [bioRes, skillRes, expRes, eduRes] = await Promise.all([
          fetch('/api/portfolio/bio'),
          fetch('/api/portfolio/skills'),
          fetch('/api/portfolio/experience'),
          fetch('/api/portfolio/education')
        ]);
        
        setBio(await bioRes.json());
        setSkills(await skillRes.json());
        setExperience(await expRes.json());
        setEducation(await eduRes.json());
      } catch (err) {
        console.error('Error loading portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [initialData]);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', opacity: 0.5 }}>Architecting Experience...</div>;

// Skills are already organized by category (name) from the backend

  const getDynamicSummary = (summary: string | undefined) => {
    if (!summary) return '';
    const start = new Date('2021-08-01');
    const today = new Date();
    const years = today.getFullYear() - start.getFullYear() - (today.getMonth() < start.getMonth() || (today.getMonth() === start.getMonth() && today.getDate() < start.getDate()) ? 1 : 0);
    return summary.replace('{YEARS_EXP}', years.toString());
  };

  return (
    <div className="portfolio-content">
      {/* Hero Section */}
      <section style={{ marginBottom: '8rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 800, 
          marginBottom: '1rem',
          background: 'linear-gradient(to bottom, #fff 30%, #38bdf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {bio?.name}
        </h1>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 600 }}>
          {bio?.title}
        </h2>
        <div style={{ color: 'var(--secondary)', marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', fontSize: '0.9rem' }}>
           <span>{bio?.location}</span>
        </div>
        <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}>
          {getDynamicSummary(bio?.summary)}
        </p>
        
      </section>

      {/* Experience Section */}
      <section style={{ marginBottom: '8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Experience</h3>
          <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {experience.map((exp, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{exp.role}</h4>
                  <div style={{ color: 'var(--primary)', fontWeight: 600 }}>{exp.company}</div>
                </div>
                <div style={{ color: 'var(--secondary)', fontWeight: 500 }}>{exp.period}</div>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1.2rem', color: 'var(--secondary)' }}>
                {exp.highlights?.map((item, hi) => (
                  <li key={hi}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section style={{ marginBottom: '8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Tech Stack</h3>
          <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {skills.map(skill => (
            <div key={skill.name} className="glass-card" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {skill.name}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {skill.items?.map(item => (
                  <span key={item} style={{ 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '8px', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--glass-border)',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.8)'
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Education Section */}
      <section style={{ marginBottom: '8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Education</h3>
          <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {education.map((edu, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{edu.institution}</h4>
                  <div style={{ color: 'var(--primary)', fontWeight: 600 }}>{edu.degree} in {edu.major}</div>
                </div>
                <div style={{ color: 'var(--secondary)', fontWeight: 500 }}>{edu.period}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ marginBottom: '8rem', scrollMarginTop: '100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Let&apos;s Connect</h3>
          <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2.5rem' 
        }}>
          {bio?.email && (
            <a href={`mailto:${bio.email}`} title="Email" style={{ color: 'var(--secondary)', transition: 'var(--transition)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}>
              <Mail size={24} />
            </a>
          )}
          
          {bio?.phone && (
            <a href={`tel:${bio.phone}`} title="Phone" style={{ color: 'var(--secondary)', transition: 'var(--transition)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}>
              <PhoneCall size={24} />
            </a>
          )}

          {bio?.github && (
            <a href={bio.github.startsWith('http') ? bio.github : `https://${bio.github}`} target="_blank" rel="noopener noreferrer" title="GitHub" style={{ color: 'var(--secondary)', transition: 'var(--transition)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}>
              <GithubIcon size={24} />
            </a>
          )}

          {bio?.linkedin && (
            <a href={bio.linkedin.startsWith('http') ? bio.linkedin : `https://${bio.linkedin}`} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ color: 'var(--secondary)', transition: 'var(--transition)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}>
              <LinkedinIcon size={24} />
            </a>
          )}

          {bio?.outlook && (
            <a href={`mailto:${bio.outlook}`} title="Outlook" style={{ color: 'var(--secondary)', transition: 'var(--transition)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}>
              <OutlookIcon size={24} />
            </a>
          )}

          {bio?.cv_url && (
            <a href={bio.cv_url} target="_blank" rel="noopener noreferrer" title="Resume / CV" style={{ color: 'var(--secondary)', transition: 'var(--transition)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}>
              <CVIcon size={24} />
            </a>
          )}

          {bio?.facebook && (
            <a href={bio.facebook.startsWith('http') ? bio.facebook : `https://${bio.facebook}`} target="_blank" rel="noopener noreferrer" title="Facebook" style={{ color: 'var(--secondary)', transition: 'var(--transition)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}>
              <FacebookIcon size={24} />
            </a>
          )}
        </div>
      </section>

      {/* Floating CTA Button */}
      <button 
        onClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="glass-card"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          padding: '0 1.5rem',
          height: '56px',
          borderRadius: '28px',
          backgroundColor: '#38bdf8',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8rem',
          cursor: 'pointer',
          zIndex: 9999,
          border: 'none',
          boxShadow: '0 8px 25px rgba(56, 189, 248, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          fontSize: '1rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(56, 189, 248, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(56, 189, 248, 0.4)';
        }}
      >
        <Contact size={24} />
        <span>Contact Me</span>
      </button>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

    </div>
  );
}

