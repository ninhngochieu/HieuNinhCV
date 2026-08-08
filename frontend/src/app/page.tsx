import type { Metadata } from 'next';
import PortfolioSection from './components/PortfolioSection';
import { getPortfolioData } from '../data/portfolio';

export const metadata: Metadata = {
  title: "Hieu Ninh | Full Stack Developer",
  description: "Portfolio of Hieu Ninh built with Next.js — content served from local structured JSON (no backend).",
  keywords: ["Portfolio", "Full Stack", ".NET", "Next.js", "Hieu Ninh"],
};

export default async function Home() {
  const initialData = await getPortfolioData();

  return (
    <div className="premium-container" style={{ padding: '4rem 2rem' }}>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <main style={{ maxWidth: '1000px' }}>
        <PortfolioSection initialData={initialData} />

        <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--secondary)', fontSize: '0.9rem' }}>
          <p>Designed and Developed by Hieu Ninh &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
}
