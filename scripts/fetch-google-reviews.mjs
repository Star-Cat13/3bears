/**
 * Fetch Google reviews via Places Details API and write to data/google-reviews.json
 *
 * Requirements:
 * - Node 18+ (for global fetch)
 * - Env vars:
 *   - GOOGLE_PLACES_API_KEY
 *   - GOOGLE_PLACE_ID
 *
 * Usage (PowerShell):
 *   $env:GOOGLE_PLACES_API_KEY="YOUR_KEY"
 *   $env:GOOGLE_PLACE_ID="YOUR_PLACE_ID"
 *   node scripts/fetch-google-reviews.mjs --max 6
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

function getArg(name, fallback = null) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

function toInt(v, dflt) {
  const n = Number.parseInt(String(v), 10);
  return Number.isFinite(n) ? n : dflt;
}

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const MAX = Math.max(1, Math.min(10, toInt(getArg('--max', '6'), 6)));
const OUT = getArg('--out', path.join('data', 'google-reviews.json'));

if (!API_KEY) {
  console.error('Missing env var GOOGLE_PLACES_API_KEY');
  process.exit(1);
}
if (!PLACE_ID) {
  console.error('Missing env var GOOGLE_PLACE_ID');
  process.exit(1);
}

const fields = ['name', 'url', 'rating', 'user_ratings_total', 'reviews'].join(',');
const endpoint =
  'https://maps.googleapis.com/maps/api/place/details/json' +
  `?place_id=${encodeURIComponent(PLACE_ID)}` +
  `&fields=${encodeURIComponent(fields)}` +
  `&language=en` +
  `&key=${encodeURIComponent(API_KEY)}`;

const res = await fetch(endpoint);
if (!res.ok) {
  console.error(`HTTP ${res.status} ${res.statusText}`);
  process.exit(1);
}

const json = await res.json();
if (json.status && json.status !== 'OK') {
  console.error(`Google API status: ${json.status}`);
  if (json.error_message) console.error(json.error_message);
  process.exit(1);
}

const result = json.result || {};
const reviews = Array.isArray(result.reviews) ? result.reviews : [];

const outObj = {
  source: 'google-places-details',
  placeName: result.name ?? null,
  placeId: PLACE_ID,
  placeUrl: result.url ?? null,
  rating: typeof result.rating === 'number' ? result.rating : null,
  userRatingsTotal:
    typeof result.user_ratings_total === 'number' ? result.user_ratings_total : null,
  updatedAt: new Date().toISOString(),
  reviews: reviews.slice(0, MAX).map((r) => ({
    authorName: r.author_name ?? null,
    rating: typeof r.rating === 'number' ? r.rating : null,
    relativeTimeDescription: r.relative_time_description ?? null,
    text: r.text ?? null,
    url: r.author_url ?? null,
    profilePhotoUrl: r.profile_photo_url ?? null
  }))
};

const outPathAbs = path.resolve(repoRoot, OUT);
await fs.mkdir(path.dirname(outPathAbs), { recursive: true });
await fs.writeFile(outPathAbs, JSON.stringify(outObj, null, 2) + '\n', 'utf8');

console.log(`Wrote ${outObj.reviews.length} reviews to ${OUT}`);

