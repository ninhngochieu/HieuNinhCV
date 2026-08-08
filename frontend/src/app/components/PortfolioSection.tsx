import { Mail, PhoneCall, Contact, ExternalLink } from 'lucide-react';
import type { PortfolioData, Bio, Skill, Experience, Education, Project } from '../../data/portfolio';

// Custom Brand Icons (Lucide removed brands in recent versions)
const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
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

export default function PortfolioSection({ initialData }: { initialData: PortfolioData }) {
  const bio: Bio = initialData.bio;
  const skills: Skill[] = initialData.skills;
  const experience: Experience[] = initialData.experience;
  const education: Education[] = initialData.education;
  const projects: Project[] = initialData.projects;

  // Years of experience computed server-side to avoid hydration mismatch.
  const start = new Date('2021-08-01');
  const today = new Date();
  const years =
    today.getFullYear() - start.getFullYear() -
    (today.getMonth() < start.getMonth() || (today.getMonth() === start.getMonth() && today.getDate() < start.getDate()) ? 1 : 0);
  const summary = (bio.summary ?? '').replace('{YEARS_EXP}', years.toString());

  if (!bio) return <div style={{ textAlign: 'center', padding: '100px', opacity: 0.5 }}>No portfolio data.</div>;

  return (
    <div className="portfolio-content">
      {/* Hero Section */}
      <section style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(2.25rem, 8vw, 4rem)',
          fontWeight: 800,
          marginBottom: '1rem',
          background: 'linear-gradient(to bottom, #fff 30%, #38bdf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {bio.name}
        </h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 600 }}>
          {bio.title}
        </p>
        <div style={{ color: 'var(--secondary)', marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', fontSize: '0.9rem' }}>
          <span>{bio.location}</span>
        </div>
        <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}>
          {summary}
        </p>
      </section>

      {/* Experience Section */}
      <section style={{ marginBottom: '5rem', scrollMarginTop: '100px' }} aria-labelledby="exp-heading">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h2 id="exp-heading" style={{ fontSize: '1.75rem', fontWeight: 700 }}>Experience</h2>
          <div style={{ height: '1px', flex: 1, background: 'color-mix(in srgb, var(--secondary) 35%, transparent)' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {experience.map((exp, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{exp.role}</h3>
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
      <section style={{ marginBottom: '5rem' }} aria-labelledby="tech-heading">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h2 id="tech-heading" style={{ fontSize: '1.75rem', fontWeight: 700 }}>Tech Stack</h2>
          <div style={{ height: '1px', flex: 1, background: 'color-mix(in srgb, var(--secondary) 35%, transparent)' }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {skills.map(skill => (
            <div key={skill.name} className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {skill.name}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {skill.items?.map(item => (
                  <span key={item} className="tech-chip">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section style={{ marginBottom: '5rem' }} aria-labelledby="edu-heading">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h2 id="edu-heading" style={{ fontSize: '1.75rem', fontWeight: 700 }}>Education</h2>
          <div style={{ height: '1px', flex: 1, background: 'color-mix(in srgb, var(--secondary) 35%, transparent)' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {education.map((edu, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{edu.institution}</h3>
                  <div style={{ color: 'var(--primary)', fontWeight: 600 }}>{edu.degree} in {edu.major}</div>
                </div>
                <div style={{ color: 'var(--secondary)', fontWeight: 500 }}>{edu.period}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section style={{ marginBottom: '5rem' }} aria-labelledby="proj-heading">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h2 id="proj-heading" style={{ fontSize: '1.75rem', fontWeight: 700 }}>Projects</h2>
          <div style={{ height: '1px', flex: 1, background: 'color-mix(in srgb, var(--secondary) 35%, transparent)' }}></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {projects.map((project, idx) => (
            <div key={idx} className="project-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{project.title}</h3>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" title="View project" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    <ExternalLink size={16} /> Link
                  </a>
                )}
              </div>
              <p style={{ color: 'var(--secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{project.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                {project.techStack?.map(tech => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ marginBottom: '5rem', scrollMarginTop: '100px' }} aria-labelledby="contact-heading">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h2 id="contact-heading" style={{ fontSize: '1.75rem', fontWeight: 700 }}>Let&apos;s Connect</h2>
          <div style={{ height: '1px', flex: 1, background: 'color-mix(in srgb, var(--secondary) 35%, transparent)' }}></div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {bio.email && (
            <a className="contact-link" href={`mailto:${bio.email}`} aria-label="Email"><Mail size={24} aria-hidden /></a>
          )}
          {bio.phone && (
            <a className="contact-link" href={`tel:${bio.phone}`} aria-label="Phone"><PhoneCall size={24} aria-hidden /></a>
          )}
          {bio.github && (
            <a className="contact-link" href={bio.github.startsWith('http') ? bio.github : `https://${bio.github}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon size={24} aria-hidden /></a>
          )}
          {bio.linkedin && (
            <a className="contact-link" href={bio.linkedin.startsWith('http') ? bio.linkedin : `https://${bio.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon size={24} aria-hidden /></a>
          )}
          {bio.outlook && (
            <a className="contact-link" href={`mailto:${bio.outlook}`} aria-label="Outlook"><OutlookIcon size={24} aria-hidden /></a>
          )}
          {bio.cv_url && (
            <a className="contact-link" href={bio.cv_url} target="_blank" rel="noopener noreferrer" aria-label="Resume / CV"><CVIcon size={24} aria-hidden /></a>
          )}
          {bio.facebook && (
            <a className="contact-link" href={bio.facebook.startsWith('http') ? bio.facebook : `https://${bio.facebook}`} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon size={24} aria-hidden /></a>
          )}
        </div>
      </section>

      {/* Floating CTA Button — anchor to #contact, no JS needed */}
      <a
        href="#contact"
        className="glass-card"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          height: '44px',
          padding: '0 1.2rem',
          borderRadius: '22px',
          backgroundColor: '#38bdf8',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          cursor: 'pointer',
          zIndex: 9999,
          border: 'none',
          boxShadow: '0 8px 25px rgba(56, 189, 248, 0.4)',
          fontSize: '0.85rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        <Contact size={20} />
        <span>Contact Me</span>
      </a>
    </div>
  );
}
