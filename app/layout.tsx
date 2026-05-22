import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Madni Strategies — Policy Consulting & Strategic Advisory",
    template: "%s | Madni Strategies",
  },
  description:
    "Boutique policy consulting and strategic advisory focused on federal budget and fiscal policy, strategic communications, policy analysis, conservative leadership, and women's advancement.",
  openGraph: {
    title: "Madni Strategies",
    description:
      "Principled policy. Strategic solutions. Serious policy expertise with editorial sophistication and institutional credibility.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-brand-canvas text-brand-ink">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-28 rounded-full bg-brand-plum px-4 py-2 text-sm font-medium text-brand-canvas transition focus:translate-y-0 focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div className="flex min-h-dvh flex-col">
          <main id="main-content" className="grow">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
