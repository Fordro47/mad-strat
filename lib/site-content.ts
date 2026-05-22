export type NavItem = {
  label: string;
  href: string;
};

export type FocusArea = {
  title: string;
  description: string;
};

export type Service = {
  title: string;
  summary: string;
  outcomes: readonly string[];
};

export type SiteBrand = {
  established: string;
  tagline: string;
};

export type SiteHero = {
  headline: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type SiteAbout = {
  title: string;
  lead: string;
  supporting: readonly string[];
  focusAreasHeading: string;
  focusAreas: readonly FocusArea[];
};

export type SiteServices = {
  title: string;
  intro: string;
  offerings: readonly Service[];
};

export type SiteContact = {
  title: string;
  lead: string;
  emailLabel: string;
  email: string;
};

export type SiteFooter = {
  finePrint: readonly string[];
  organization: string;
};

/** True when `pathname` (from usePathname) matches a top-level nav route. */
export function isActiveNavPath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export const siteBrand: SiteBrand = {
  established: "EST. 2026",
  tagline: "Principled Policy. Strategic Solutions.",
};

export const siteNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Archives", href: "/archives" },
  { label: "Contact", href: "/contact" },
];

export const hero: SiteHero = {
  headline: "Strategic advisory for disciplined policy outcomes.",
  subheading:
    "Madni Strategies is a boutique consulting practice helping leaders articulate priorities, steward federal budget and fiscal issues, and advance principled advocacy with credibility and restraint.",
  primaryCta: { label: "Request a briefing", href: "/contact" },
  secondaryCta: { label: "About the practice", href: "/about" },
};

export const about: SiteAbout = {
  title: "About Madni Strategies",
  lead:
    "We advise leaders navigating complex legislative and communications environments — particularly where reputational stakes, stewardship, and disciplined clarity intersect.",
  supporting: [
    "The identity is deliberately editorial: authored policy work with the polish of institutional communications and the rigor expected in Washington-facing environments.",
    "As a founder-led practice, engagements are calibrated for precision, confidentiality, and long-term credibility rather than spectacle.",
  ],
  focusAreasHeading: "Practice focus",
  focusAreas: [
    {
      title: "Federal budget & fiscal priorities",
      description:
        "Framing priorities, interpreting trade-offs, and helping leaders communicate fiscal seriousness without losing substance.",
    },
    {
      title: "Strategic communications",
      description:
        "Narratives, messaging architectures, and materials that withstand scrutiny from stakeholders and scrutiny-oriented audiences alike.",
    },
    {
      title: "Policy analysis",
      description:
        "Clear synthesis aimed at actionable decisions — from briefings for principals to sharper argumentation for allied coalitions.",
    },
    {
      title: "Conservative leadership & women's advancement",
      description:
        "Programs and counsel that elevate principled conservative leadership and widen influence for consequential women-led initiatives.",
    },
  ],
};

export const services: SiteServices = {
  title: "Services",
  intro:
    "Engagements vary by mandate. Below are representative ways clients collaborate with Madni Strategies — standalone or combined into a phased advisory program.",
  offerings: [
    {
      title: "Budget & fiscal policy counsel",
      summary:
        "Translate macro constraints into principal-ready narratives — from strategic positioning to disciplined communications around spending, revenue, and fiscal stewardship.",
      outcomes: [
        "Briefing narratives and decision memos calibrated for policymakers and allied stakeholders.",
        "Message architecture that survives technical scrutiny.",
      ],
    },
    {
      title: "Communications architecture",
      summary:
        "Editorial frameworks for reputational environments where tone, pacing, and evidence matter more than amplification.",
      outcomes: [
        "Stakeholder-aligned messaging that preserves credibility.",
        "Materials suitable for principals, allies, or select media contexts.",
      ],
    },
    {
      title: "Policy analysis programs",
      summary:
        "Structured research support and persuasive synthesis grounded in seriousness — not jargon for its own sake.",
      outcomes: [
        "Tight argumentative framing for contested issues.",
        "Clear storylines anchored in institutional tone.",
      ],
    },
    {
      title: "Leadership advising",
      summary:
        "Founder-forward counsel positioning women shaping conservative leadership for durable influence.",
      outcomes: [
        "Platform development and stewardship across speaking, publishing, and institutional priorities.",
      ],
    },
  ],
};

export const contact: SiteContact = {
  title: "Contact",
  lead:
    "Madni Strategies works with leaders and institutions that value discretion, seriousness, and long-term reputational stewardship. Reach out to initiate a briefing conversation.",
  emailLabel: "Email",
  email: "consulting@madnistrategies.com",
};

export const footer: SiteFooter = {
  organization: "Madni Strategies",
  finePrint: [
    "Washington-facing policy consulting & strategic advisory",
    `${siteBrand.established}`,
  ],
};
