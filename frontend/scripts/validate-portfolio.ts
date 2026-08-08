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

// Exact-value assertions for source-of-truth contact fields.
const EXPECTED = {
  phone: '+84329151221',
  cv_url: 'https://www.topcv.vn/xem-cv/AwlQAQYKBQIMC1cGVwYBDV8IUARSWgFfUwMAUwd147',
};
if (data.bio?.phone !== EXPECTED.phone) {
  fail(`bio.phone must be exactly "${EXPECTED.phone}" (got "${data.bio?.phone}")`);
}
if (data.bio?.cv_url !== EXPECTED.cv_url) {
  fail(`bio.cv_url must be exactly "${EXPECTED.cv_url}" (got "${data.bio?.cv_url}")`);
}

// Exact-value assertions for experience start/end dates (source of truth).
const EXPECTED_EXP: Record<string, { start: string; end: string | null }> = {
  'TMA Solutions': { start: '2021-11-01', end: '2023-06-30' },
  'Vietnam Blockchain Corporation': { start: '2023-06-01', end: '2025-07-31' },
  'FPT Telecom': { start: '2025-08-01', end: null },
};
for (const exp of data.experience) {
  const want = EXPECTED_EXP[exp.company];
  if (!want) fail(`unexpected experience company "${exp.company}" — update EXPECTED_EXP`);
  if (exp.startDate !== want.start) {
    fail(`experience "${exp.company}" startDate must be "${want.start}" (got "${exp.startDate}")`);
  }
  if (exp.endDate !== want.end) {
    fail(`experience "${exp.company}" endDate must be ${want.end === null ? 'null (Present)' : `"${want.end}"`} (got "${exp.endDate}")`);
  }
}

console.log('✅ portfolio.json valid —',
  `${data.skills.length} skill groups,`,
  `${data.experience.length} experiences,`,
  `${data.projects.length} projects`);
