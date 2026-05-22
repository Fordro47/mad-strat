import type { ReactNode } from "react";

export type SectionShellVariant = "canvas" | "plum";

type SectionShellProps = {
  id: string;
  title: string;
  eyebrow?: string;
  variant?: SectionShellVariant;
  /** Use `1` when this section is the main title of a standalone page. */
  titleLevel?: 1 | 2;
  children: ReactNode;
};

export function SectionShell({
  id,
  title,
  eyebrow,
  variant = "canvas",
  titleLevel = 2,
  children,
}: SectionShellProps) {
  const surface =
    variant === "plum"
      ? "bg-brand-plum text-brand-canvas border-brand-canvas/15"
      : "bg-brand-canvas text-brand-ink border-brand-ink/10";

  const headingClass =
    variant === "plum" ? "text-brand-canvas" : "text-brand-plum";

  const HeadingTag = titleLevel === 1 ? "h1" : "h2";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`border-t ${surface}`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-20 sm:px-8 lg:py-28">
        <header className="flex max-w-3xl flex-col gap-4">
          {eyebrow ? (
            <p
              className={`text-xs uppercase tracking-[0.22em] ${variant === "plum" ? "text-brand-accent" : "text-brand-bordeaux"}`}
            >
              {eyebrow}
            </p>
          ) : null}
          <HeadingTag
            id={`${id}-heading`}
            className={`font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl ${headingClass}`}
          >
            {title}
          </HeadingTag>
        </header>
        <div className="flex flex-col gap-12">{children}</div>
      </div>
    </section>
  );
}
