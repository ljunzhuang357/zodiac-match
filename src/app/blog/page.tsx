import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Chinese Zodiac Compatibility Blog — Guides & Match Insights",
  description:
    "Read our complete guides to Chinese zodiac compatibility. Learn how the 12 animals match, the role of five elements, and which pairings work best for love.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Chinese Zodiac Compatibility Blog — Guides & Match Insights",
    description:
      "Read our complete guides to Chinese zodiac compatibility. Learn how the 12 animals match, the role of five elements, and which pairings work best for love.",
    url: "https://zodiacmatch.xyz/blog",
    siteName: "ZodiacMatch",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinese Zodiac Compatibility Blog — Guides & Match Insights",
    description:
      "Read our complete guides to Chinese zodiac compatibility. Learn how the 12 animals match, the role of five elements, and which pairings work best for love.",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <div className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm mb-10"
          style={{ color: "var(--color-fg-tertiary)" }}
        >
          ← Back to compatibility tool
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Chinese Zodiac Compatibility
        </h1>
        <p className="text-base mb-12 leading-relaxed" style={{ color: "var(--color-fg-secondary)" }}>
          In-depth guides to help you find your best animal match.
        </p>

        <div className="flex flex-col gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-5 sm:p-6 rounded-xl transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <time
                className="text-xs font-medium uppercase tracking-wider mb-2 block"
                style={{ color: "var(--color-accent)" }}
              >
                {post.date}
              </time>
              <h2 className="text-lg sm:text-xl font-semibold mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-fg-secondary)" }}>
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
