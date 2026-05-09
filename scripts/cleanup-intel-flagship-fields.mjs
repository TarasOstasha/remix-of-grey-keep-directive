// One-shot migration: remove the legacy flagship-related fields from every
// intelArticle document (both published and draft variants).
//
// Required env vars:
//   - SANITY_PROJECT_ID (or VITE_SANITY_PROJECT_ID)
//   - SANITY_DATASET    (or VITE_SANITY_DATASET)
//   - SANITY_API_TOKEN  — create at https://sanity.io/manage with at least Editor access.
//
// Run with: node scripts/cleanup-intel-flagship-fields.mjs
//   or:     npm run migrate:intel-cleanup

import { createClient } from "@sanity/client";
import process from "node:process";

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN || process.env.VITE_SANITY_API_TOKEN;

if (!projectId || !dataset) {
  console.error(
    "Missing Sanity project id or dataset. Set SANITY_PROJECT_ID and SANITY_DATASET (or the VITE_ equivalents) before running.",
  );
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_API_TOKEN. Create a token with Editor access at https://sanity.io/manage, then export it before running this script.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-04-25",
  token,
  useCdn: false,
  perspective: "raw",
});

const LEGACY_FIELDS = [
  "featuredAsFlagship",
  "flagshipTier",
  "flagshipPageCount",
  "flagshipReleaseLabel",
];

const filter = LEGACY_FIELDS.map((f) => `defined(${f})`).join(" || ");
const query = `*[_type == "intelArticle" && (${filter})]{_id}`;

const docs = await client.fetch(query);

if (!docs || docs.length === 0) {
  console.log("No intelArticle documents carry the legacy flagship fields. Nothing to do.");
  process.exit(0);
}

console.log(`Cleaning ${docs.length} document(s) (published + drafts)...`);
for (const doc of docs) {
  await client.patch(doc._id).unset(LEGACY_FIELDS).commit({ visibility: "async" });
  console.log(`  ✓ ${doc._id}`);
}
console.log("Done. Reload Studio to clear the 'Unknown field' warnings.");
