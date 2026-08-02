import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { OfficialHeader } from "@/app/components/official-header";
import { SiteFooter } from "@/app/components/site-footer";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://excuse-me.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Excuse Me — Professionally Generated Excuses",
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Generate a believable, corporate, dramatic, detailed, or completely unhinged excuse for almost any everyday situation.",
  applicationName: SITE_NAME,
  authors: [{ name: "Department of No" }],
  keywords: [
    "excuse generator",
    "funny excuses",
    "Department of No",
    "Excuse Me",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: SITE_NAME,
    title: "Excuse Me — Professionally Generated Excuses",
    description: SITE_TAGLINE,
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: "Excuse Me — a service of the Department of No",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excuse Me — Professionally Generated Excuses",
    description: SITE_TAGLINE,
    images: ["/social-card.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} ${ibmPlexMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased" suppressHydrationWarning>
        <OfficialHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
