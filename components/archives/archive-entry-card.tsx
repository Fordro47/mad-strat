import type { ArchiveEntry } from "@/lib/archive-types";

function formatArchiveDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

const cardFocusRing =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-plum";

function formatWordCount(n: number | null): string | null {
  if (n === null || Number.isNaN(n)) return null;
  return n.toLocaleString("en-US");
}

export function ArchiveEntryCard({ entry }: { entry: ArchiveEntry }) {
  const wc = formatWordCount(entry.wordCount);
  const permalink = entry.permalink;

  return (
    <article className="group flex h-full w-full min-h-[22rem] flex-col overflow-hidden border border-brand-ink/12 bg-brand-canvas shadow-[0px_42px_90px_-78px_rgb(68_33_61_/_0.5)] transition hover:border-brand-plum/35 sm:min-h-[24rem]">
      <div className="shrink-0 border-b border-brand-ink/10 bg-white/55 px-6 py-4 backdrop-blur-sm">
        <div className="flex min-h-[2.75rem] flex-wrap content-start gap-2">
          {entry.contentTypes.map((ct) => (
            <span
              key={ct}
              className="rounded-sm border border-brand-ink/12 bg-brand-canvas px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-brand-ink/70"
            >
              {ct}
            </span>
          ))}
          {wc ? (
            <span className="rounded-sm border border-brand-bordeaux/25 bg-brand-bordeaux/[0.06] px-2.5 py-1 font-mono text-[0.65rem] tabular-nums uppercase tracking-[0.08em] text-brand-bordeaux">
              {wc} words
            </span>
          ) : (
            <span className="rounded-sm border border-dashed border-brand-ink/14 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-brand-ink/45">
              Word count —
            </span>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-8">
        <div className="flex min-h-0 flex-1 flex-col gap-4 border-l-[3px] border-brand-accent pl-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-medium">
            <time
              dateTime={entry.date}
              className="text-[0.7rem] uppercase tracking-[0.2em] text-brand-bordeaux"
            >
              {formatArchiveDate(entry.date)}
            </time>
            <span aria-hidden className="text-brand-ink/25">
              ·
            </span>
            <span className="line-clamp-2 max-w-full text-xs leading-snug text-brand-ink/75">
              {entry.categoriesLabel}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="line-clamp-3 font-serif text-2xl font-semibold leading-snug tracking-tight text-brand-plum group-hover:text-brand-bordeaux sm:text-[1.725rem]">
              {entry.title}
            </h2>
            {entry.authors.length > 0 ? (
              <p className="line-clamp-2 text-[0.95rem] italic leading-snug text-brand-ink/68">
                {entry.authors.join(" · ")}
              </p>
            ) : null}

            <div className="flex min-h-[2rem] flex-wrap gap-2">
              {entry.publicationTypes.map((pt) => (
                <span
                  key={pt}
                  className="max-w-full truncate rounded-full border border-brand-plum/20 bg-brand-plum/[0.04] px-3 py-1 text-[0.7rem] font-medium text-brand-plum"
                  title={pt}
                >
                  {pt}
                </span>
              ))}
            </div>
          </div>

          <p className="line-clamp-4 text-[0.98rem] leading-relaxed text-brand-ink/88">
            {entry.summary}
          </p>

          {permalink ? (
            <div className="mt-auto shrink-0 border-t border-brand-ink/10 pt-6">
              <a
                href={permalink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex w-full items-center justify-center rounded-full bg-brand-plum px-6 py-2.5 text-center text-[0.7rem] font-bold uppercase tracking-[0.09em] text-brand-canvas transition hover:bg-brand-bordeaux sm:w-fit ${cardFocusRing}`}
              >
                Read on epicforamerica.org
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
