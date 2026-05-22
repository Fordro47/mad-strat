import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/base-path";
import { hero, siteBrand } from "@/lib/site-content";

const focusRing =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-plum";

export function HeroSection() {
  return (
    <section
      aria-labelledby="home-heading"
      className="border-b border-brand-ink/10 bg-brand-canvas"
    >
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 lg:pb-32 lg:pt-28">
        <div
          className="pointer-events-none absolute inset-y-12 left-5 hidden w-px bg-gradient-to-b from-brand-accent via-brand-bordeaux to-transparent opacity-85 sm:block lg:inset-y-16"
          aria-hidden
        />

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-14 xl:gap-16">
          <div className="flex w-full max-w-3xl flex-col gap-10 sm:pl-10 lg:max-w-none lg:flex-1 lg:pb-2">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-bordeaux">
                {siteBrand.established}
              </p>
              <span aria-hidden className="h-1 w-1 rounded-full bg-brand-bordeaux/60" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-ink/70">
                {siteBrand.tagline}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <h1
                id="home-heading"
                className="font-serif text-[2.375rem] font-semibold leading-tight tracking-[-0.02em] text-brand-plum sm:text-6xl lg:text-[3.35rem] xl:text-[3.85rem]"
              >
                {hero.headline}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-brand-ink/85 lg:text-xl">
                {hero.subheading}
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <Link
                href={hero.primaryCta.href}
                className={`inline-flex items-center justify-center rounded-full bg-brand-plum px-9 py-3 text-sm font-semibold uppercase tracking-[0.07em] text-brand-canvas transition hover:bg-brand-bordeaux ${focusRing}`}
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className={`inline-flex items-center justify-center rounded-full border border-brand-ink/20 bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-[0.07em] text-brand-ink hover:border-brand-plum hover:text-brand-plum ${focusRing}`}
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="flex w-full shrink-0 justify-center lg:w-auto lg:justify-end lg:py-4">
            <figure className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]">
              <div
                className="pointer-events-none absolute -inset-3 border border-brand-ink/[0.06] bg-brand-plum/[0.03]"
                aria-hidden
              />
              <div className="relative overflow-hidden border border-brand-ink/12 bg-brand-canvas shadow-[18px_18px_0_0_rgb(175_199_217_/_0.35)]">
                <Image
                  src={withBasePath("/media/Brittany_Madni_Headshot.JPG")}
                  alt="Brittany Madni"
                  width={680}
                  height={850}
                  priority
                  className="h-auto w-full object-cover object-top"
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 280px"
                />
              </div>
              <figcaption className="sr-only">Brittany Madni — Madni Strategies</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
