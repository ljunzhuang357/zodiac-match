import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZodiacMatch — Chinese Zodiac Compatibility",
  description: "Find your animal match. Pick two Chinese zodiac signs and discover compatibility scores, deep insights, and element dynamics. Free, instant, no sign-up.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
