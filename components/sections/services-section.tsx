import { services } from "@/lib/site-content";
import { SectionShell } from "@/components/section-shell";

export function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="Collaboration models"
      title={services.title}
      titleLevel={1}
    >
      <p className="max-w-3xl text-lg leading-relaxed text-brand-ink/85">
        {services.intro}
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {services.offerings.map((service) => (
          <article
            key={service.title}
            className="relative flex flex-col gap-8 overflow-hidden border border-brand-plum/20 bg-white/40 px-8 py-10 backdrop-blur-sm shadow-[18px_-18px_0_0_rgb(175_199_217_/_0.45)] transition hover:border-brand-accent/65 hover:shadow-none"
          >
            <header className="flex flex-col gap-3">
              <p className="text-[0.6875rem] uppercase tracking-[0.24em] text-brand-bordeaux">
                Offering
              </p>
              <h3 className="font-serif text-3xl text-brand-plum">{service.title}</h3>
              <p className="text-base leading-relaxed text-brand-ink/85">{service.summary}</p>
            </header>

            <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-brand-ink/20 bg-brand-canvas/85 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-ink/60">
                Outcomes clients expect
              </p>
              <ul className="flex flex-col gap-3">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-base text-brand-ink/85">
                    <span aria-hidden className="mt-[0.625rem] h-px w-6 shrink-0 bg-brand-accent" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
