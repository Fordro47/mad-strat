"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { withBasePath, withoutBasePath } from "@/lib/base-path";
import { isActiveNavPath, siteBrand, siteNavItems } from "@/lib/site-content";

const focusRing =
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-plum";

export function SiteHeader() {
  const pathname = withoutBasePath(usePathname() ?? "");
  const [open, setOpen] = useState(false);
  const navId = useId();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-ink/10 bg-brand-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link
          href="/"
          className={`group inline-flex shrink-0 items-center gap-4 rounded-md sm:gap-5 ${focusRing}`}
          onClick={() => setOpen(false)}
        >
          <Image
            src={withBasePath("/media/logo.png")}
            alt="Madni Strategies"
            width={280}
            height={90}
            priority
            className="h-14 w-auto sm:h-16 md:h-[4.5rem]"
          />
          <span className="flex flex-col text-left leading-tight">
            <span className="font-serif text-xl font-semibold tracking-tight text-brand-plum sm:text-2xl md:text-[1.75rem]">
              Madni Strategies
            </span>
            <span className="mt-1 hidden text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-brand-ink/75 sm:inline md:text-xs">
              {siteBrand.established}
            </span>
          </span>
        </Link>

        <button
          type="button"
          className={`inline-flex items-center rounded-full border border-brand-ink/20 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-brand-ink sm:hidden ${focusRing}`}
          aria-expanded={open}
          aria-controls={navId}
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        <nav
          id={navId}
          aria-label="Primary"
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-4 border-t border-brand-ink/10 pt-4 sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-x-10 sm:border-0 sm:pt-0`}
        >
          {siteNavItems.map((item) => {
            const active = isActiveNavPath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md text-[0.9375rem] font-semibold uppercase tracking-[0.06em] transition ${focusRing} ${
                  active
                    ? "text-brand-plum underline decoration-2 underline-offset-[10px] decoration-brand-bordeaux"
                    : "text-brand-ink/85 no-underline hover:text-brand-plum hover:underline hover:decoration-brand-ink/25 hover:underline-offset-8"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
