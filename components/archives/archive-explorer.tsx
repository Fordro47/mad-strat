"use client";

import { useId, useMemo, useState } from "react";
import { archivePageIntro, type ArchiveEntry } from "@/lib/archives-content";
import { ArchiveEntryCard } from "@/components/archives/archive-entry-card";

const controlFocusRing =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-plum";

type ExplorerProps = {
  entries: readonly ArchiveEntry[];
};

const KNOWN_CONTENT_ATOMS = ["Blog", "Publication", "Resource"] as const;

function matchesSearch(entry: ArchiveEntry, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  const blob = [
    entry.title,
    entry.summary,
    entry.categoriesLabel,
    entry.authors.join(" "),
    ...entry.tags,
    ...entry.contentTypes,
    ...entry.publicationTypes,
    entry.permalink,
  ]
    .join(" ")
    .toLowerCase();
  return blob.includes(q);
}

export function ArchiveExplorer({ entries }: ExplorerProps) {
  const searchId = useId();
  const policyAreaId = useId();
  const publicationId = useId();
  const filtersLabelId = useId();
  const [search, setSearch] = useState("");
  const [policyArea, setPolicyArea] = useState<string | "all">("all");
  const [publicationFilter, setPublicationFilter] = useState<string>("all");
  const [contentAtoms, setContentAtoms] = useState<Set<string>>(() => new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(() => new Set());

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries],
  );

  const policyAreas = useMemo(() => {
    const u = [...new Set(entries.map((e) => e.categoriesLabel))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    return u;
  }, [entries]);

  const publicationKinds = useMemo(() => {
    const s = new Set<string>();
    entries.forEach((e) =>
      e.publicationTypes.forEach((p) => {
        if (p) s.add(p);
      }),
    );
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [entries]);

  const availableContentAtoms = useMemo(() => {
    return KNOWN_CONTENT_ATOMS.filter((atom) =>
      entries.some((e) => e.contentTypes.includes(atom)),
    );
  }, [entries]);

  const allTags = useMemo(() => {
    const bag = new Set<string>();
    sortedEntries.forEach((e) => e.tags.forEach((t) => bag.add(t)));
    return [...bag].sort((a, b) => a.localeCompare(b));
  }, [sortedEntries]);

  const filtered = useMemo(() => {
    return sortedEntries.filter((entry) => {
      if (!matchesSearch(entry, search)) return false;
      if (policyArea !== "all" && entry.categoriesLabel !== policyArea)
        return false;
      if (publicationFilter !== "all") {
        if (!entry.publicationTypes.includes(publicationFilter)) return false;
      }
      if (contentAtoms.size > 0) {
        const overlaps = entry.contentTypes.some((c) => contentAtoms.has(c));
        if (!overlaps) return false;
      }
      if (selectedTags.size === 0) return true;
      return entry.tags.some((t) => selectedTags.has(t));
    });
  }, [
    sortedEntries,
    search,
    policyArea,
    publicationFilter,
    contentAtoms,
    selectedTags,
  ]);

  const hasActiveFilters =
    search.trim().length > 0 ||
    policyArea !== "all" ||
    publicationFilter !== "all" ||
    contentAtoms.size > 0 ||
    selectedTags.size > 0;

  function toggleContentAtom(atom: string) {
    setContentAtoms((prev) => {
      const next = new Set(prev);
      if (next.has(atom)) next.delete(atom);
      else next.add(atom);
      return next;
    });
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function clearFilters() {
    setSearch("");
    setPolicyArea("all");
    setPublicationFilter("all");
    setContentAtoms(new Set());
    setSelectedTags(new Set());
  }

  const selectClass = `w-full max-w-xl border border-brand-ink/18 bg-brand-canvas px-4 py-3 text-sm font-medium text-brand-ink shadow-none ${controlFocusRing}`;

  return (
    <div className="border-b border-brand-ink/10 bg-brand-canvas">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <header className="mb-12 flex max-w-3xl flex-col gap-4 lg:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-bordeaux">
            Library
          </p>
          <h1 className="font-serif text-5xl font-semibold tracking-tight text-brand-plum sm:text-6xl">
            {archivePageIntro.title}
          </h1>
          <p className="text-lg leading-relaxed text-brand-ink/85">
            {archivePageIntro.description}
          </p>
        </header>

        <section
          aria-labelledby={filtersLabelId}
          className="mb-14 border border-brand-ink/12 bg-white/40 p-6 backdrop-blur-[1px] sm:p-8 lg:mb-16"
        >
          <h2 id={filtersLabelId} className="sr-only">
            Search and filters
          </h2>

          <div className="flex flex-col gap-10 lg:gap-12">
            <div className="flex flex-col gap-3">
              <label
                htmlFor={searchId}
                className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-ink/60"
              >
                Search
              </label>
              <div className="relative max-w-xl">
                <input
                  id={searchId}
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Titles, summaries, EPIC taxonomy, contributors, URLs…"
                  className={`w-full border border-brand-ink/18 bg-brand-canvas px-4 py-3.5 pr-14 text-base text-brand-ink placeholder:text-brand-ink/35 ${controlFocusRing}`}
                  autoComplete="off"
                />
                <span
                  className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-brand-plum/55"
                  aria-hidden
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    />
                    <path
                      d="M16.25 16.25 21 21"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor={policyAreaId}
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-ink/60"
                >
                  Policy portfolio
                </label>
                <select
                  id={policyAreaId}
                  value={policyArea === "all" ? "" : policyArea}
                  onChange={(e) =>
                    setPolicyArea(e.target.value === "" ? "all" : e.target.value)
                  }
                  className={selectClass}
                >
                  <option value="">All portfolios</option>
                  {policyAreas.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor={publicationId}
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-ink/60"
                >
                  Publication format
                </label>
                <select
                  id={publicationId}
                  value={publicationFilter}
                  onChange={(e) => setPublicationFilter(e.target.value)}
                  className={selectClass}
                >
                  <option value="all">All formats</option>
                  {publicationKinds.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {availableContentAtoms.length > 0 ? (
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-ink/60">
                    Content mediums
                  </p>
                  <p className="mt-2 text-[0.75rem] leading-relaxed text-brand-ink/50">
                    If selected, an entry matches when it carries any of those content-type labels from
                    the catalogue export.
                  </p>
                </div>
                <div
                  className="flex flex-wrap gap-2 sm:gap-3"
                  role="group"
                  aria-label="Filter by content mediums"
                >
                  {availableContentAtoms.map((atom) => {
                    const on = contentAtoms.has(atom);
                    return (
                      <button
                        key={atom}
                        type="button"
                        onClick={() => toggleContentAtom(atom)}
                        aria-pressed={on}
                        className={`rounded-full px-4 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] transition ${controlFocusRing} ${
                          on
                            ? "bg-brand-plum text-brand-canvas"
                            : "border border-brand-ink/15 bg-brand-canvas text-brand-ink/80 hover:border-brand-plum/35"
                        }`}
                      >
                        {atom}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-ink/60">
                Topic tags
                <span className="block pt-2 text-[0.6rem] font-normal normal-case tracking-normal text-brand-ink/45">
                  Entries match when they contain any selected tag.
                </span>
              </p>
              <div
                className="max-h-48 overflow-y-auto border border-brand-ink/12 bg-brand-canvas p-4"
                tabIndex={0}
                aria-label="Scrollable topic tag list"
              >
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => {
                    const selected = selectedTags.has(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        aria-pressed={selected}
                        className={`max-w-[16rem] rounded-sm border px-3 py-2 text-left text-[0.8rem] font-medium leading-snug transition ${controlFocusRing} ${
                          selected
                            ? "border-brand-bordeaux bg-brand-bordeaux/[0.06] text-brand-bordeaux"
                            : "border-brand-ink/12 bg-brand-canvas text-brand-ink/85 hover:border-brand-accent/50"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand-ink/10 pt-6">
              <p className="text-sm text-brand-ink/70" aria-live="polite">
                <span className="font-semibold text-brand-plum">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "entry" : "entries"}
                {hasActiveFilters ? " match filters." : " in the catalogue."}
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className={`text-sm font-semibold uppercase tracking-[0.08em] text-brand-bordeaux underline decoration-brand-accent underline-offset-4 ${controlFocusRing} rounded`}
                >
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>
        </section>

        {filtered.length === 0 ? (
          <div
            className="border border-dashed border-brand-ink/20 bg-brand-canvas/80 px-10 py-16 text-center"
            role="status"
          >
            <p className="font-serif text-2xl font-semibold text-brand-plum">
              No entries match these filters.
            </p>
            <p className="mt-3 text-brand-ink/75">
              Broaden the portfolio, rotate publication formats, or remove topic constraints.
            </p>
          </div>
        ) : (
          <ul className="grid gap-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-10 lg:items-stretch">
            {filtered.map((entry) => (
              <li key={entry.id} className="flex h-full min-h-0 min-w-0">
                <ArchiveEntryCard entry={entry} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
