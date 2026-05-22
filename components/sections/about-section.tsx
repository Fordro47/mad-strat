import { about } from "@/lib/site-content";
import { SectionShell } from "@/components/section-shell";

export function AboutSection() {
  return (
    <SectionShell id="about" eyebrow="The practice" title={about.title} titleLevel={1}>
      <div className="flex max-w-3xl flex-col gap-6">
        <p className="text-xl font-medium leading-relaxed text-brand-ink">{about.lead}</p>
        {about.supporting.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed text-brand-ink/85">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-bordeaux">
          {about.focusAreasHeading}
        </p>

        <ul className="grid gap-6 md:grid-cols-2">
          {about.focusAreas.map((item) => (
            <li
              key={item.title}
              className="group flex flex-col gap-4 border border-brand-ink/15 bg-brand-canvas p-6 shadow-[0px_36px_80px_-64px_rgb(68_33_61_/_0.55)] transition hover:border-brand-accent/60 hover:shadow-none"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-px w-8 bg-brand-bordeaux transition-all group-hover:w-12 group-hover:bg-brand-accent"
                />
                <p className="font-serif text-2xl text-brand-plum">{item.title}</p>
              </div>
              <p className="text-base leading-relaxed text-brand-ink/80">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
