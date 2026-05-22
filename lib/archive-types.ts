/** Types for archival catalog rows (typically backed by CSV import). */

export type ArchiveLink = {
  label: string;
  href: string;
};

export type ArchiveEntry = {
  id: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** Listing blurb synthesized from CSV metadata. */
  summary: string;
  /** Original taxonomy string from Categories column — used as policy-area filter. */
  categoriesLabel: string;
  authors: readonly string[];
  /** Content Types column normalized (Blog, Publication, Resource, …). */
  contentTypes: readonly string[];
  /** Publication Types column normalized; empty CSV cells become Uncategorized. */
  publicationTypes: readonly string[];
  tags: readonly string[];
  permalink: string;
  /** Parsed word count where present; CSV may supply 0. */
  wordCount: number | null;
  status: string;
  links: readonly ArchiveLink[];
};
