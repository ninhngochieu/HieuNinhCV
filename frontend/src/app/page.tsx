import type { Metadata } from 'next';
import PortfolioSection from './components/PortfolioSection';

export const metadata: Metadata = {
  title: "Hieu Ninh | Full Stack Developer",
  description: "Portfolio of Hieu Ninh built with Next.js 15, .NET 10, and PocketBase.",
  keywords: ["Portfolio", "Full Stack", "Hieu Ninh", ".NET", "Next.js"],
};

async function getPortfolioData() {
  const baseUrl = process.env.SERVER_HTTP || 'http://localhost:5000';
  
  try {
    const urls = [
      `${baseUrl}/api/portfolio/bio`,
      `${baseUrl}/api/portfolio/skills`,
      `${baseUrl}/api/portfolio/experience`,
      `${baseUrl}/api/portfolio/education`,
      `${baseUrl}/api/portfolio/projects`
    ];

    const [bio, skills, experience, education, projects] = await Promise.all(
      urls.map(url => fetch(url, { next: { revalidate: 3600 } }).then(res => res.ok ? res.json() : null))
    );

    return { bio, skills: skills || [], experience: experience || [], education: education || [], projects: projects || [] };
  } catch (error) {
    console.error('Failed to fetch portfolio data on server:', error);
    return null;
  }
}

export default async function Home() {
  const initialData = await getPortfolioData();
  
  return (
    <div className="premium-container" style={{ padding: '4rem 2rem' }}>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      
      <main style={{ maxWidth: '1000px' }}>
        <PortfolioSection initialData={initialData || undefined} />
        
        <footer style={{ marginTop: '8rem', textAlign: 'center', color: 'var(--secondary)', fontSize: '0.9rem', opacity: 0.5 }}>
          <p>Designed and Developed by Hieu Ninh &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
}
