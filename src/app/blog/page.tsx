import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
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

const navLink = "text-xs text-[#8a847c] no-underline cursor-pointer px-2.5 py-1.5 rounded-md relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-[1.5px] after:bg-[#c0392b] after:rounded-sm after:transition-[left,right] after:duration-[0.35s] after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#1a1816] hover:after:left-[20%] hover:after:right-[20%]";

export default function BlogPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between py-5 border-b border-[#eeebe5] mb-12 max-w-[1040px] mx-auto px-6">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Image src="/logo.png" alt="" width="32" height="32" style={{ objectFit: "contain" }} />
          <span className="text-base font-bold tracking-tight text-[#1a1816]">Zodiac<em className="not-italic text-[#c0392b]">Match</em></span>
        </Link>
        <div className="flex gap-2 items-center">
          <Link href="/" className={navLink}>Home</Link>
          <Link href="/blog" className={navLink + " text-[#1a1816] after:left-[20%] after:right-[20%]"}>Blog</Link>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-5 pb-16 sm:pb-24">
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
