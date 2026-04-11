import type { Metadata } from "next";
import WeatherSection from "./components/WeatherSection";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hieu Ninh CV - Modern Aspire Dashboard",
  description: "A premium dashboard built with .NET Aspire and Next.js 15, optimized for SEO and performance.",
  keywords: ["Next.js", "Aspire", "Weather Forecast", "SEO", "React 19"],
  authors: [{ name: "Hieu Ninh" }],
  openGraph: {
    title: "Hieu Ninh CV - Modern Aspire Dashboard",
    description: "Premium dashboard demonstration using Next.js 15 and .NET Aspire.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="premium-container">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      
      <main>
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Aspire Next
          </h1>
          <p style={{ color: 'var(--secondary)', fontSize: '1.2rem' }}>
            High-Performance SEO Optimized Architecture
          </p>
        </header>

        <section className="glass-card">
          <WeatherSection />
        </section>
        
        <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--secondary)', fontSize: '0.9rem' }}>
          <p>&copy; {new Date().getFullYear()} Hieu Ninh. Built with .NET Aspire & Next.js 15.</p>
        </footer>
      </main>
    </div>
  );
}
