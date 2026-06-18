import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://zodiacmatch.xyz";

export const metadata: Metadata = {
  title: "ZodiacMatch — Chinese Zodiac Compatibility",
  description: "Find your animal match. Pick two Chinese zodiac signs and discover compatibility scores, deep insights, and element dynamics. Free, instant, no sign-up.",
  metadataBase: new URL(SITE),
  alternates: { canonical: "/" },
  openGraph: {
    title: "ZodiacMatch — Chinese Zodiac Compatibility",
    description: "Find your animal match. Pick two Chinese zodiac signs and discover compatibility scores, deep insights, and element dynamics. Free, instant, no sign-up.",
    url: SITE,
    siteName: "ZodiacMatch",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZodiacMatch — Chinese Zodiac Compatibility",
    description: "Find your animal match. Pick two Chinese zodiac signs and discover compatibility scores, deep insights, and element dynamics.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-N3MQRNH3DJ"></script>
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-N3MQRNH3DJ');`
        }} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7353477339527364" crossOrigin="anonymous" />
      </head>
      <body className="font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
