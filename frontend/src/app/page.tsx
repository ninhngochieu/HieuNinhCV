import type { Metadata } from "next";
import PortfolioSection from "./components/PortfolioSection";

export const metadata: Metadata = {
  title: "Hieu Ninh | Full Stack Developer",
  description: "Portfolio of Hieu Ninh built with Next.js 15, .NET 10, and PocketBase.",
  keywords: ["Portfolio", "Full Stack", "Hieu Ninh", ".NET", "Next.js"],
};

export default function Home() {
  return (
    <div className="premium-container" style={{ padding: '4rem 2rem' }}>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      
      <main style={{ maxWidth: '1000px' }}>
        <PortfolioSection />
        
        <footer style={{ marginTop: '8rem', textAlign: 'center', color: 'var(--secondary)', fontSize: '0.9rem', opacity: 0.5 }}>
          <p>Designed and Developed by Hieu Ninh &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
}
