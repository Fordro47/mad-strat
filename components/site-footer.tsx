import Image from "next/image";
import Link from "next/link";
import { footer, siteBrand } from "@/lib/site-content";

const focusRing =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-canvas";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-ink/10 bg-brand-plum text-brand-canvas">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-16 sm:px-8 lg:flex-row lg:justify-between">
        <div className="flex max-w-xl flex-col gap-5">
          <Link
            href="/"
            className={`inline-flex shrink-0 items-center gap-3 rounded-md ${focusRing}`}
          >
            <Image
              src="/media/logo.png"
              alt="Madni Strategies"
              width={170}
              height={56}
              className="h-9 w-auto"
            />
          </Link>
          <p className="font-serif text-2xl font-semibold">{footer.organization}</p>
          <p className="text-sm leading-relaxed text-brand-canvas/85">
            {siteBrand.tagline}
          </p>
        </div>
        <div className="flex flex-col gap-6 text-sm text-brand-canvas/90">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-accent/95">
            Contact
          </p>
          <Link
            className={`w-fit font-medium underline decoration-brand-accent underline-offset-[6px] ${focusRing}`}
            href="/contact"
          >
            Initiate an engagement
          </Link>
          {footer.finePrint.map((line) => (
            <p key={line} className="max-w-xs leading-relaxed text-brand-canvas/80">
              {line}
            </p>
          ))}
          <p className="text-xs text-brand-canvas/65">
            &copy; {year} Madni Strategies
          </p>
        </div>
      </div>
    </footer>
  );
}
