'use client';

import { useState, useEffect } from 'react';

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

export default function PortfolioSection() {
  const [bio, setBio] = useState<Bio | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', opacity: 0.5 }}>Architecting Experience...</div>;

// Skills are already organized by category (name) from the backend

  return (
    <div className="portfolio-content">
      {/* Hero Section */}
      <section style={{ marginBottom: '8rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '4.5rem', 
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
        <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>
          {bio?.summary}
        </p>
        
      </section>

      {/* Experience Section */}
      <section style={{ marginBottom: '8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>Experience</h3>
          <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {experience.map((exp, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{exp.role}</h4>
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
          <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>Tech Stack</h3>
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
          <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>Education</h3>
          <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {education.map((edu, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{edu.institution}</h4>
                  <div style={{ color: 'var(--primary)', fontWeight: 600 }}>{edu.degree} in {edu.major}</div>
                </div>
                <div style={{ color: 'var(--secondary)', fontWeight: 500 }}>{edu.period}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

