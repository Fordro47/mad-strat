import type { Metadata } from "next";
import { ArchiveExplorer } from "@/components/archives/archive-explorer";
import { archiveEntries } from "@/lib/archives-content";

export const metadata: Metadata = {
  title: "Archives",
  description:
    "Search Madni Strategies archives of policy briefs, commentary, publications, and media appearances.",
};

export default function ArchivesPage() {
  return <ArchiveExplorer entries={archiveEntries} />;
}
