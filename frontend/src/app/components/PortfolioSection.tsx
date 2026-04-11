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
  name: string;
  title: string;
  summary: string;
  email: string;
  github: string;
  linkedin: string;
}

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [bio, setBio] = useState<Bio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bioRes, projRes] = await Promise.all([
          fetch('/api/portfolio/bio'),
          fetch('/api/portfolio/projects')
        ]);
        
        const bioData = await bioRes.json();
        const projData = await projRes.json();
        
        setBio(bioData);
        setProjects(projData);
      } catch (err) {
        console.error('Error loading portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', opacity: 0.5 }}>Architecting Experience...</div>;

  return (
    <div className="portfolio-content">
      {/* Hero Section */}
      <section style={{ marginBottom: '6rem', textAlign: 'center' }}>
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
        <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '2rem', fontWeight: 600 }}>
          {bio?.title}
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--secondary)', fontSize: '1.1rem' }}>
          {bio?.summary}
        </p>
        
        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href={`mailto:${bio?.email}`} className="primary-btn">
            Connect Now
          </a>
          <a href={`https://${bio?.github}`} target="_blank" rel="noopener" className="glass-card" style={{ padding: '0.75rem 1.5rem', borderRadius: '12px' }}>
            GitHub
          </a>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ marginBottom: '6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
          <h3 style={{ fontSize: '2rem', fontWeight: 700 }}>Featured Work</h3>
          <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)' }}></div>
        </div>

        <div className="grid-hover">
          {projects.map(project => (
            <div key={project.id} className="project-card" style={{ padding: '2rem' }}>
              <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {project.techStack.join(' • ')}
              </div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{project.title}</h4>
              <p style={{ color: 'var(--secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                {project.description}
              </p>
              <a href={project.url} target="_blank" rel="noopener" style={{ 
                color: '#fff', 
                fontWeight: 600, 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                borderBottom: '2px solid var(--primary)'
              }}>
                View Showcase ➔
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="glass-card" style={{ textAlign: 'center', background: 'linear-gradient(to right, rgba(56,189,248,0.05), transparent)' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Let's Build Something Great</h3>
        <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>
          I'm currently open to new opportunities and collaborations.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href={`mailto:${bio?.email}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{bio?.email}</a>
          <a href={`https://${bio?.linkedin}`} style={{ color: 'var(--secondary)' }}>LinkedIn</a>
        </div>
      </section>
    </div>
  );
}
