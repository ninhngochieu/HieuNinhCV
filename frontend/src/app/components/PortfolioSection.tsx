import { Mail, PhoneCall, MessageSquare, ExternalLink } from 'lucide-react';
import type { PortfolioData, Bio, Skill, Experience, Education, Project } from '../../data/portfolio';
import styles from '../Portfolio.module.css';

// Custom Brand Icons (Lucide removed brands in recent versions)
const GithubIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const FacebookIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const CVIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);

const OutlookIcon = ({ size = 22 }: { size?: number }) => (
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
  const start = new Date('2021-11-01');
  const today = new Date();
  const years =
    today.getFullYear() - start.getFullYear() -
    (today.getMonth() < start.getMonth() || (today.getMonth() === start.getMonth() && today.getDate() < start.getDate()) ? 1 : 0);
  const summary = (bio.summary ?? '').replace('{YEARS_EXP}', years.toString());

  if (!bio) return <div className={styles.section}>No portfolio data.</div>;

  return (
    <div>
      {/* Hero — asymmetric editorial */}
      <header className={styles.hero}>
        <h1 className={styles.heroName}>{bio.name}</h1>
        <div className={styles.heroMeta}>
          <div>
            <p className={styles.heroTitle}>{bio.title}</p>
            <p className={styles.heroSummary}>{summary}</p>
          </div>
          <span className={styles.heroTitle} style={{ color: 'var(--secondary)' }}>{bio.location}</span>
        </div>
      </header>

      {/* Experience */}
      <section className={styles.section} aria-labelledby="exp-heading">
        <div className={styles.sectionLabel} id="exp-heading">Experience</div>
        <div className={styles.sectionBody}>
          {experience.map((exp, idx) => (
            <article key={idx} className={styles.entry}>
              <div className={styles.entryHead}>
                <div>
                  <h3 className={styles.entryRole}>{exp.role}</h3>
                  <div className={styles.entryCompany}>{exp.company}</div>
                </div>
                <div className={styles.entryPeriod}>{exp.period}</div>
              </div>
              <ul className={styles.entryList}>
                {exp.highlights?.map((item, hi) => (
                  <li key={hi}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className={styles.section} aria-labelledby="tech-heading">
        <div className={styles.sectionLabel} id="tech-heading">Tech Stack</div>
        <div className={styles.sectionBody}>
          <div className={styles.skillGrid}>
            {skills.map(skill => (
              <div key={skill.name} className={styles.skillGroup}>
                <h3 className={styles.skillName}>{skill.name}</h3>
                <div className={styles.chipRow}>
                  {skill.items?.map(item => (
                    <span key={item} className={styles.chip}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className={styles.section} aria-labelledby="edu-heading">
        <div className={styles.sectionLabel} id="edu-heading">Education</div>
        <div className={styles.sectionBody}>
          {education.map((edu, idx) => (
            <article key={idx} className={styles.entry}>
              <div className={styles.entryHead}>
                <div>
                  <h3 className={styles.entryRole}>{edu.institution}</h3>
                  <div className={styles.entryCompany}>{edu.degree} in {edu.major}</div>
                </div>
                <div className={styles.entryPeriod}>{edu.period}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className={styles.section} aria-labelledby="proj-heading">
        <div className={styles.sectionLabel} id="proj-heading">Projects</div>
        <div className={styles.sectionBody}>
          <div className={styles.projectGrid}>
            {projects.map((project, idx) => (
              <article key={idx} className={styles.projectCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" title="View project"
                       style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      <ExternalLink size={15} /> Link
                    </a>
                  )}
                </div>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.chipRow} style={{ marginTop: 'auto' }}>
                  {project.techStack?.map(tech => (
                    <span key={tech} className={styles.chip}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.section} aria-labelledby="contact-heading">
        <div className={styles.sectionLabel} id="contact-heading">Connect</div>
        <div className={styles.sectionBody}>
          <div className={styles.contactRow}>
            {bio.email && (
              <a className={styles.contactLink} href={`mailto:${bio.email}`} aria-label="Email"><Mail size={20} aria-hidden /></a>
            )}
            {bio.phone && (
              <a className={styles.contactLink} href={`tel:${bio.phone}`} aria-label="Phone"><PhoneCall size={20} aria-hidden /></a>
            )}
            {bio.github && (
              <a className={styles.contactLink} href={bio.github.startsWith('http') ? bio.github : `https://${bio.github}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon size={20} aria-hidden /></a>
            )}
            {bio.linkedin && (
              <a className={styles.contactLink} href={bio.linkedin.startsWith('http') ? bio.linkedin : `https://${bio.linkedin}`} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon size={20} aria-hidden /></a>
            )}
            {bio.outlook && (
              <a className={styles.contactLink} href={`mailto:${bio.outlook}`} aria-label="Outlook"><OutlookIcon size={20} aria-hidden /></a>
            )}
            {bio.cv_url && (
              <a className={styles.contactLink} href={bio.cv_url} target="_blank" rel="noopener noreferrer" aria-label="Resume / CV"><CVIcon size={20} aria-hidden /></a>
            )}
            {bio.facebook && (
              <a className={styles.contactLink} href={bio.facebook.startsWith('http') ? bio.facebook : `https://${bio.facebook}`} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon size={20} aria-hidden /></a>
            )}
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <a href="#contact-heading" className={styles.cta} aria-label="Scroll to contact">
        <MessageSquare size={18} />
        <span>Contact</span>
      </a>
    </div>
  );
}
