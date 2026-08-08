import { readFileSync } from 'fs';

// Minimal schema validation for the portfolio content.
// Run via `npx tsx scripts/validate-portfolio.ts` in CI.
// Keeps the "editable via JSON" promise honest: a malformed
// portfolio.json fails the build instead of shipping broken UI.

interface Portfolio {
  bio: { name: string; title: string; email: string; [k: string]: unknown };
  skills: { name: string; items: string[] }[];
  experience: { company: string; role: string; period: string; startDate: string | null; endDate: string | null; highlights: string[] }[];
  education: { institution: string; degree: string; major: string; period: string }[];
  projects: { title: string; description: string; url: string; imageUrl: string; techStack: string[] }[];
}

const REQUIRED = ['bio', 'skills', 'experience', 'education', 'projects'] as const;

function fail(msg: string): never {
  console.error(`❌ portfolio.json invalid: ${msg}`);
  process.exit(1);
}

const raw = readFileSync('src/data/portfolio.json', 'utf-8');
let data: Portfolio;
try {
  data = JSON.parse(raw);
} catch (e) {
  fail(`not valid JSON (${(e as Error).message})`);
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

for (const key of REQUIRED) {
  const val = (data as unknown as Record<string, unknown>)[key];
  if (key !== 'bio' && !Array.isArray(val)) fail(`"${key}" must be an array`);
  if (key === 'bio' && !isObject(val)) fail(`"${key}" must be an object`);
}

if (!data.bio?.name || !data.bio?.email) fail('bio.name and bio.email are required');
if (!data.experience.length) fail('experience must not be empty');
if (!data.skills.length) fail('skills must not be empty');

console.log('✅ portfolio.json valid —',
  `${data.skills.length} skill groups,`,
  `${data.experience.length} experiences,`,
  `${data.projects.length} projects`);
