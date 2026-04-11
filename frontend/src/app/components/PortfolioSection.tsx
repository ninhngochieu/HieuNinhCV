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
  const [projects, setProjects] = useState<Project[]>([]);
  const [bio, setBio] = useState<Bio | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bioRes, projRes, skillRes, expRes, eduRes] = await Promise.all([
          fetch('/api/portfolio/bio'),
          fetch('/api/portfolio/projects'),
          fetch('/api/portfolio/skills'),
          fetch('/api/portfolio/experience'),
          fetch('/api/portfolio/education')
        ]);
        
        setBio(await bioRes.json());
        setProjects(await projRes.json());
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
          <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
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

      {/* Featured Work Grid */}
      <section style={{ marginBottom: '8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>Featured Projects</h3>
          <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
        </div>

        <div className="grid-hover">
          {projects.map(project => (
            <div key={project.id} className="project-card" style={{ padding: '2rem' }}>
              <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {project.techStack?.join(' • ')}
              </div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{project.title}</h4>
              <p style={{ color: 'var(--secondary)', fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.5' }}>
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Footer */}
      <section className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(to top, rgba(56,189,248,0.1), transparent)' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>Education</div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>{education?.institution}</h3>
          <div style={{ color: 'var(--secondary)' }}>{education?.degree} • {education?.period}</div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '3rem auto', maxWidth: '300px' }} />

        <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Let's Build Something Great</h3>
        <p style={{ color: 'var(--secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Currently seeking new challenges in high-throughput systems and distributed architecture.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <a href={`mailto:${bio?.email}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{bio?.email}</a>
          <a href={`https://${bio?.linkedin}`} target="_blank" rel="noopener" style={{ color: 'var(--secondary)' }}>LinkedIn</a>
          <a href={`https://${bio?.github}`} target="_blank" rel="noopener" style={{ color: 'var(--secondary)' }}>GitHub</a>
        </div>
      </section>
    </div>
  );
}

