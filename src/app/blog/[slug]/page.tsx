import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ZodiacMatch",
      url: "https://zodiacmatch.xyz",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zodiacmatch.xyz/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
        <article className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm mb-10"
            style={{ color: "var(--color-fg-tertiary)" }}
          >
            ← Back to blog
          </Link>

          <time
            className="text-xs font-medium uppercase tracking-wider mb-3 block"
            style={{ color: "var(--color-accent)" }}
          >
            {post.date}
          </time>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-12" style={{ color: "var(--color-fg-secondary)" }}>
            {post.description}
          </p>

          <div className="prose-container max-w-none">
            {post.sections.map((section, i) => (
              <section key={i} className="mb-10">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 leading-snug">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-base leading-relaxed mb-4 last:mb-0"
                    style={{ color: "var(--color-fg)" }}
                  >
                    {p}
                  </p>
                ))}
                {section.faq && (
                  <div className="mt-8 space-y-4">
                    {section.faq.map((item, k) => (
                      <details
                        key={k}
                        className="rounded-xl overflow-hidden"
                        style={{
                          background: "var(--color-surface)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        <summary
                          className="cursor-pointer font-medium px-5 py-4 text-sm leading-snug"
                        >
                          {item.question}
                        </summary>
                        <p
                          className="px-5 pb-4 text-sm leading-relaxed"
                          style={{ color: "var(--color-fg-secondary)" }}
                        >
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--color-border)" }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-medium text-sm"
              style={{ color: "var(--color-accent)" }}
            >
              ← Back to free zodiac compatibility tool
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://zodiacmatch.xyz/blog/${post.slug}`,
      siteName: "ZodiacMatch",
      type: "article",
      locale: "en_US",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}
