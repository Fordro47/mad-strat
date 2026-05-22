import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CSV_PATH = path.join(__dirname, "..", "post-export-2026-05-20.csv");
const OUT_PATH = path.join(__dirname, "..", "lib", "archive-entries.generated.ts");

function normalizeSpace(s) {
  return s.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function authorsFrom(cell) {
  const raw = cell == null ? "" : String(cell);
  const pieces = normalizeSpace(raw)
    .replace(/\[\s*user\s*\]/gi, "|||")
    .split("|||")
    .map((p) =>
      normalizeSpace(p)
        .replace(/^,\s*/, "")
        .replace(/,$/, "")
        .trim(),
    )
    .filter((p) => p.length > 0);
  return [...new Set(pieces)];
}

function splitCsvList(cell) {
  const raw = cell == null ? "" : String(cell);
  if (!normalizeSpace(raw)) return [];
  return raw
    .split(",")
    .map((s) => normalizeSpace(String(s).replace(/\ufffc/g, "")))
    .filter(Boolean);
}

function sanitizeIdSegment(seg, fallbackIdx) {
  const base = normalizeSpace(seg)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
  return base || `entry-${fallbackIdx}`;
}

function slugFromPermalink(urlStr, fallbackIdx) {
  if (!urlStr || typeof urlStr !== "string") return `entry-${fallbackIdx}`;
  try {
    const u = new URL(urlStr.trim());
    const segments = u.pathname.split("/").filter(Boolean);
    return sanitizeIdSegment(segments.pop() ?? "", fallbackIdx);
  } catch {
    return sanitizeIdSegment(normalizeSpace(String(urlStr)), fallbackIdx);
  }
}

function uniqueOrderedIds(permalinks) {
  const counts = new Map();
  return permalinks.map((p, idx) => {
    const base = slugFromPermalink(p, idx + 1);
    const n = (counts.get(base) ?? 0) + 1;
    counts.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  });
}

function buildSummary(params) {
  const { authors, contentTypes, publicationTypes, wordCount } = params;
  const by =
    authors.length > 0
      ? authors.slice(0, 4).join(", ") +
        (authors.length > 4 ? ", et al." : "")
      : "Authored contributors";

  const formatLine =
    publicationTypes.length &&
    !(publicationTypes.length === 1 && publicationTypes[0] === "Uncategorized")
      ? publicationTypes.join(" · ")
      : contentTypes.length
        ? contentTypes.join(" · ")
        : "Archived EPIC publication";

  let wcSentence = "";
  if (wordCount === null || Number.isNaN(wordCount)) {
    wcSentence = "";
  } else if (wordCount <= 40) {
    wcSentence =
      " Short artifact — charts, FAQ, infographic, or explainer excerpt in CMS.";
  } else if (wordCount <= 220) {
    wcSentence = ` Approximately ${wordCount} words — concise analysis.`;
  } else {
    wcSentence = ` Approximately ${wordCount} words — substantive long-form publication.`;
  }

  return `${by}. Published as ${formatLine}.${wcSentence}`;
}

function parseWordCount(cell) {
  if (cell == null || String(cell).trim() === "") return null;
  const n = Number.parseInt(String(cell).replace(/\D/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

const rawCsv = fs.readFileSync(CSV_PATH, "utf8").replace(/\ufeff/g, "");

const records = parse(rawCsv, {
  columns: true,
  skip_empty_lines: true,
  relax_column_count: true,
  trim: false,
}).filter(
  (r) => normalizeSpace(String(r.Status ?? "").toLowerCase()) === "publish",
);

const permalinkCol = records.map((r) =>
  normalizeSpace(String(r.Permalink ?? "")),
);
const ids = uniqueOrderedIds(permalinkCol);

const entries = records.map((r, idx) => {
  const permalink = permalinkCol[idx];
  const categoriesLabel = normalizeSpace(String(r.Categories ?? ""));
  const contentTypesRaw = splitCsvList(r["Content Types"]);
  const publicationTypesRaw = splitCsvList(r["Publication Types"]);
  const publicationTypes =
    publicationTypesRaw.length === 0
      ? ["Uncategorized"]
      : publicationTypesRaw;
  const tags = [...new Set(splitCsvList(r.Tags))];

  let datePart = normalizeSpace(String(r.Date ?? ""));
  if (/\d{4}-\d{2}-\d{2}/.test(datePart)) {
    datePart = datePart.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? datePart.slice(0, 10);
  } else datePart = normalizeSpace(datePart.slice(0, 10));

  const wordCount = parseWordCount(r["Word Count"]);

  const authors = authorsFrom(r.Authors);

  const links =
    permalink.length > 0
      ? [
          {
            label: "Read on EPIC",
            href: permalink,
          },
        ]
      : [];

  const summary = buildSummary({
    authors,
    contentTypes: contentTypesRaw,
    publicationTypes,
    wordCount,
  });

  const title = normalizeSpace(String(r.Title ?? ""));
  const status = normalizeSpace(String(r.Status ?? "")).toLowerCase();

  return {
    id: ids[idx],
    title,
    date: datePart,
    summary,
    categoriesLabel,
    authors,
    contentTypes: contentTypesRaw,
    publicationTypes,
    tags,
    permalink,
    wordCount,
    status,
    links,
  };
});

entries.sort((a, b) => b.date.localeCompare(a.date));

const serialized = JSON.stringify(entries, null, 2);

const file = `/** Auto-generated by \`npm run generate:archives\`. Do not edit by hand — edit \`post-export-*.csv\` then re-run. */

import type { ArchiveEntry } from "./archive-types";

export const archiveEntries: readonly ArchiveEntry[] = ${serialized} as const;
`;

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, file, "utf8");

console.warn(
  `Wrote ${entries.length} archive entries → ${path.relative(process.cwd(), OUT_PATH)}`,
);
