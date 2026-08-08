// Single source of truth for all portfolio content.
// Replaces the old PocketBase + .NET backend: data now lives in portfolio.json
// (seeded from PocketBase) and is read at build/SSR time. No runtime API calls.

export interface Bio {
  name: string;
  title: string;
  /** May contain the {YEARS_EXP} token, expanded at render time. */
  summary: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  facebook: string;
  phone: string;
  outlook: string;
  cv_url: string;
}

export interface Project {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  techStack: string[];
}

export interface Skill {
  name: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  /** ISO date (yyyy-mm-dd) or null when ongoing. */
  startDate: string | null;
  endDate: string | null;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  major: string;
  period: string;
}

export interface PortfolioData {
  bio: Bio;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
}

/**
 * Returns portfolio content from the local JSON file.
 * Experience is sorted: ongoing roles (null endDate) first, then by
 * descending end date — matching the backend's previous ordering.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const data = (await import('./portfolio.json')).default as PortfolioData;
  const byDateDesc = (a: Experience, b: Experience) => {
    const endA = a.endDate ?? '9999-12-31';
    const endB = b.endDate ?? '9999-12-31';
    if (endA !== endB) return endA < endB ? 1 : -1;
    return (a.startDate ?? '') < (b.startDate ?? '') ? 1 : -1;
  };
  return {
    ...data,
    experience: [...data.experience].sort(byDateDesc),
  };
}
