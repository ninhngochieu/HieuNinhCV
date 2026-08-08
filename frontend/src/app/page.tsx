import type { Metadata } from 'next';
import PortfolioSection from './components/PortfolioSection';
import { getPortfolioData } from '../data/portfolio';
import styles from './page.module.css';
import section from './Portfolio.module.css';

export const metadata: Metadata = {
  title: "Hieu Ninh | .NET Developer Portfolio",
  description: "Portfolio of Hieu Ninh — .NET Developer. Built with Next.js, content served from local structured JSON (no backend).",
};

export default async function Home() {
  const initialData = await getPortfolioData();

  return (
    <div className={`${styles.page} ${section.main}`}>
      <main className={styles.main}>
        <PortfolioSection initialData={initialData} />

        <footer id="site-footer" className={section.footer}>
          <p>Designed and Developed by Hieu Ninh &copy; {new Date().getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
}
