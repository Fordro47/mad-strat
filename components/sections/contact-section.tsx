import Link from "next/link";
import { contact, siteBrand } from "@/lib/site-content";

const focusRing =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-plum";

export function ContactSection() {
  return (
    <section aria-labelledby="contact-heading">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-10 border border-brand-ink/15 bg-white/65 p-8 shadow-[0px_62px_120px_-92px_rgb(92_26_51_/_0.55)] lg:grid-cols-[minmax(0,_1fr)_minmax(0,_0.8fr)] lg:p-12">
          <div className="flex flex-col gap-6 border-l-[3px] border-brand-accent pl-6">
            <p className="text-xs uppercase tracking-[0.24em] text-brand-bordeaux">Engagements</p>
            <div className="flex flex-col gap-3">
              <h1 id="contact-heading" className="font-serif text-5xl font-semibold text-brand-plum">
                {contact.title}
              </h1>
              <p className="text-sm uppercase tracking-[0.2em] text-brand-ink/70">
                {siteBrand.tagline}
              </p>
            </div>
            <p className="text-lg leading-relaxed text-brand-ink/85">{contact.lead}</p>
          </div>

          <div className="flex flex-col gap-8 rounded-[1.125rem] border border-brand-ink/10 bg-brand-canvas p-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.24em] text-brand-bordeaux">
                {contact.emailLabel}
              </span>
              <Link
                className={`w-fit font-serif text-2xl text-brand-plum underline decoration-brand-accent underline-offset-[6px] ${focusRing}`}
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </Link>
            </div>
            <dl className="grid gap-4 text-sm leading-relaxed text-brand-ink/80">
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-brand-ink/60">
                  Scheduling
                </dt>
                <dd>Share context, timelines, stakeholders, and any confidentiality requirements.</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.16em] text-brand-ink/60">
                  Principals-first
                </dt>
                <dd>
                  Consultations prioritize clarity around trade-offs — not inflated promises or flashy
                  deliverables disconnected from stewardship.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
