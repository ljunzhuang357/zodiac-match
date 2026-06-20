import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  animals,
  NAMES,
  authoritativeScore,
  genDeep,
  genElem,
  getScore,
  getAllPairings,
} from "@/data/zodiac";

const R = 314.16;

/* ─── Helpers ─── */

function nameToIndex(name: string): number {
  return NAMES.findIndex((n) => n.toLowerCase() === name);
}

function buildSlug(i: number, j: number): string {
  return `${animals[i].name.toLowerCase()}-${animals[j].name.toLowerCase()}`;
}

function scoreClass(s: number) {
  return s >= 80 ? "high" : s >= 60 ? "mid" : "low";
}
function tagLabel(s: number) {
  return s >= 80
    ? "Great Match"
    : s >= 65
      ? "Good Match"
      : s >= 50
        ? "Average Match"
        : "Challenging Match";
}
function tagClass(s: number) {
  return s >= 80
    ? "tag-great"
    : s >= 65
      ? "tag-good"
      : s >= 50
        ? "tag-okay"
        : "tag-tough";
}
function arcColor(s: number) {
  return s >= 80 ? "#2e7d32" : s >= 60 ? "#e65100" : "#c62828";
}

const SITE = "https://zodiacmatch.xyz";

/* ─── Static Paths ─── */

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (let i = 0; i < 12; i++) {
    for (let j = i + 1; j < 12; j++) {
      params.push({ slug: buildSlug(i, j) });
    }
  }
  return params;
}

/* ─── Metadata ─── */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split("-");
  if (parts.length < 2) return {};
  const idxA = nameToIndex(parts[0]);
  const idxB = nameToIndex(parts[1]);
  if (idxA === -1 || idxB === -1) return {};

  const a = animals[idxA];
  const b = animals[idxB];
  const s = authoritativeScore(idxA, idxB);
  const d = getScore(idxA, idxB);

  const title = `${a.name} and ${b.name} Compatibility — ZodiacMatch`;
  const description = d
    ? `Discover ${a.name} and ${b.name} compatibility: ${s}% — ${d.desc} Read the full Chinese zodiac pairing analysis.`
    : `Discover ${a.name} and ${b.name} compatibility. Read the full Chinese zodiac pairing analysis.`;

  return {
    title,
    description,
    metadataBase: new URL(SITE),
    alternates: { canonical: `/compatibility/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/compatibility/${slug}`,
      siteName: "ZodiacMatch",
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ─── Page ─── */

export default async function CompatibilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parts = slug.split("-");
  if (parts.length < 2) notFound();
  const idxA = nameToIndex(parts[0]);
  const idxB = nameToIndex(parts[1]);
  if (idxA === -1 || idxB === -1) notFound();

  const a = animals[idxA];
  const b = animals[idxB];
  const s = authoritativeScore(idxA, idxB);
  const data = getScore(idxA, idxB);
  if (!data) notFound();

  const deep = genDeep(idxA, idxB, s, animals);
  const elem = genElem(idxA, idxB, animals);
  const gaugeOffset = R - (s / 100) * R;

  /* Best / worst for each animal in the pair */
  function bestFor(idx: number) {
    return animals
      .filter((_, i) => i !== idx && authoritativeScore(idx, i) >= 80)
      .map((x) => x.name);
  }
  function worstFor(idx: number) {
    return animals
      .filter((_, i) => i !== idx && authoritativeScore(idx, i) < 45)
      .map((x) => x.name);
  }

  const bestA = bestFor(idxA);
  const bestB = bestFor(idxB);
  const worstA = worstFor(idxA);
  const worstB = worstFor(idxB);

  /* JSON-LD */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${a.name} and ${b.name} Compatibility`,
    description: data.desc,
    url: `${SITE}/compatibility/${slug}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable-content"],
    },
    mainEntity: {
      "@type": "ItemList",
      name: `${a.name} + ${b.name} Chinese Zodiac Compatibility`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Thing",
            name: a.name,
            description: a.trait,
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Thing",
            name: b.name,
            description: b.trait,
          },
        },
      ],
    },
    author: {
      "@type": "Organization",
      name: "ZodiacMatch",
      url: SITE,
    },
  };

  /* Pairing list links — same animal pairings for nav */
  const pairings = getAllPairings();
  const sorted = [...pairings].sort((x, y) => y.score - x.score);
  const top5 = sorted.slice(0, 5);
  const bot5 = sorted
    .filter((x) => x.score < 60)
    .sort((x, y) => x.score - y.score)
    .slice(0, 5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1040px] mx-auto px-6">
        {/* Nav */}
        <nav className="flex items-center justify-between py-5 border-b border-[#eeebe5] mb-8">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <Image
              src="/logo.png"
              alt=""
              width="32"
              height="32"
              style={{ objectFit: "contain" }}
            />
            <span className="text-base font-bold tracking-tight text-[#1a1816]">
              Zodiac<em className="not-italic text-[#c0392b]">Match</em>
            </span>
          </Link>
          <div className="flex gap-2 items-center">
            <Link
              href="/"
              className="text-xs text-[#8a847c] no-underline cursor-pointer px-2.5 py-1.5 rounded-md relative
                after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-[1.5px] after:bg-[#c0392b] after:rounded-sm
                after:transition-[left,right] after:duration-[0.35s] after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#1a1816]
                hover:after:left-[20%] hover:after:right-[20%]"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-xs text-[#8a847c] no-underline cursor-pointer px-2.5 py-1.5 rounded-md relative
                after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-[1.5px] after:bg-[#c0392b] after:rounded-sm
                after:transition-[left,right] after:duration-[0.35s] after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#1a1816]
                hover:after:left-[20%] hover:after:right-[20%]"
            >
              Blog
            </Link>
          </div>
        </nav>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#8a847c] mb-6">
          <Link href="/" className="text-[#8a847c] no-underline hover:text-[#1a1816]">
            Home
          </Link>
          <span className="select-none">/</span>
          <span className="text-[#8a847c]">Compatibility</span>
          <span className="select-none">/</span>
          <span className="text-[#1a1816] font-medium">
            {a.name} + {b.name}
          </span>
        </nav>

        {/* ─── Pairing Header ─── */}
        <section className="text-center mb-10 relative pt-4 speakable-content">
          <div className="absolute -top-15 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(192,57,43,0.04)_0%,transparent_70%)] pointer-events-none" />
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-[56px] leading-none">{a.emoji}</span>
            <span className="text-[28px] text-[#c0392b] font-light">+</span>
            <span className="text-[56px] leading-none">{b.emoji}</span>
          </div>
          <h1 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(32px,5vw,48px)] font-normal tracking-tight leading-[1.08] mb-2 text-balance">
            {a.name} + {b.name}
          </h1>
          <p className="text-sm text-[#8a847c] leading-relaxed max-w-[520px] mx-auto text-pretty mb-1">
            Chinese zodiac compatibility between {a.name} and {b.name}
          </p>
          <p className="text-[11px] text-[#8a847c]">
            {a.name}: {a.elem} element · {b.name}: {b.elem} element
          </p>
        </section>

        {/* ─── Score + Details ─── */}
        <div className="bg-white border border-[#eeebe5] rounded-[20px] p-9 mb-10">
          <div className="grid grid-cols-[auto_1fr] gap-8 items-center max-sm:grid-cols-1 max-sm:text-center">
            {/* Gauge */}
            <div className="text-center">
              <div className="inline-flex relative">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    className="gauge-bg"
                    cx="60"
                    cy="60"
                    r="50"
                  />
                  <circle
                    className="gauge-fg"
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={arcColor(s)}
                    strokeDasharray={R}
                    strokeDashoffset={gaugeOffset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={`text-[26px] font-bold leading-none ${
                      scoreClass(s) === "high"
                        ? "text-[#2e7d32]"
                        : scoreClass(s) === "mid"
                          ? "text-[#e65100]"
                          : "text-[#c62828]"
                    }`}
                  >
                    {s}%
                  </span>
                  <span className="text-[9px] text-[#8a847c] mt-0.5 tracking-wider uppercase">
                    Score
                  </span>
                </div>
              </div>
              <div className="text-lg font-semibold mt-2.5">{data.label}</div>
              <span
                className={`inline-block px-3.5 py-1 rounded-full text-[11px] font-medium mt-2 ${tagClass(s)}`}
              >
                {tagLabel(s)}
              </span>
            </div>

            {/* Insight + Element */}
            <div className="speakable-content">
              <div className="text-sm text-[#5a5650] leading-relaxed mb-3.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8a847c] block mb-0.5">
                  One-Line Verdict
                </span>
                {data.desc}
              </div>
              <div className="text-sm text-[#5a5650] leading-relaxed mb-3.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8a847c] block mb-0.5">
                  Deeper Insight
                </span>
                {deep}
              </div>
              <div className="text-sm text-[#5a5650] leading-relaxed">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8a847c] block mb-0.5">
                  Element Dynamic
                </span>
                {elem}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Animal Detail Cards ─── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Animal A */}
          <div className="bg-white border border-[#eeebe5] rounded-xl p-6 text-center">
            <span className="text-[42px] block mb-2">{a.emoji}</span>
            <h2 className="text-lg font-semibold mb-1">{a.name}</h2>
            <div className="text-[11px] text-[#8a847c] mb-2">{a.years}</div>
            <div className="text-[11px] text-[#8a847c] mb-2.5">
              Element: {a.elem}
            </div>
            <div className="text-sm text-[#5a5650] leading-relaxed mb-4">
              {a.trait}
            </div>
            <div className="border-t border-[#eeebe5] pt-4">
              <div className="text-sm font-semibold text-[#2e7d32] mb-1.5">
                Best Matches for {a.name}
              </div>
              <div className="text-sm text-[#5a5650] leading-[2]">
                {bestA.length
                  ? bestA.map((n) => <span key={n} className="inline-block mx-1">{n}</span>)
                  : <span className="text-xs text-[#8a847c]">None above 80%</span>}
              </div>
            </div>
            <div className="pt-3">
              <div className="text-sm font-semibold text-[#c62828] mb-1.5">
                Challenging for {a.name}
              </div>
              <div className="text-sm text-[#5a5650] leading-[2]">
                {worstA.length
                  ? worstA.map((n) => <span key={n} className="inline-block mx-1">{n}</span>)
                  : <span className="text-xs text-[#8a847c]">None below 45%</span>}
              </div>
            </div>
          </div>

          {/* Animal B */}
          <div className="bg-white border border-[#eeebe5] rounded-xl p-6 text-center">
            <span className="text-[42px] block mb-2">{b.emoji}</span>
            <h2 className="text-lg font-semibold mb-1">{b.name}</h2>
            <div className="text-[11px] text-[#8a847c] mb-2">{b.years}</div>
            <div className="text-[11px] text-[#8a847c] mb-2.5">
              Element: {b.elem}
            </div>
            <div className="text-sm text-[#5a5650] leading-relaxed mb-4">
              {b.trait}
            </div>
            <div className="border-t border-[#eeebe5] pt-4">
              <div className="text-sm font-semibold text-[#2e7d32] mb-1.5">
                Best Matches for {b.name}
              </div>
              <div className="text-sm text-[#5a5650] leading-[2]">
                {bestB.length
                  ? bestB.map((n) => <span key={n} className="inline-block mx-1">{n}</span>)
                  : <span className="text-xs text-[#8a847c]">None above 80%</span>}
              </div>
            </div>
            <div className="pt-3">
              <div className="text-sm font-semibold text-[#c62828] mb-1.5">
                Challenging for {b.name}
              </div>
              <div className="text-sm text-[#5a5650] leading-[2]">
                {worstB.length
                  ? worstB.map((n) => <span key={n} className="inline-block mx-1">{n}</span>)
                  : <span className="text-xs text-[#8a847c]">None below 45%</span>}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Element Breakdown ─── */}
        <section className="bg-white border border-[#eeebe5] rounded-2xl p-7 mb-10">
          <h3 className="text-[11px] tracking-wider uppercase text-[#8a847c] mb-3.5 font-medium">
            ★ Elements at Play
          </h3>
          <p className="text-sm text-[#5a5650] leading-relaxed mb-4">
            {a.name} belongs to the <strong>{a.elem}</strong> element, while{" "}
            {b.name} belongs to the <strong>{b.elem}</strong> element. Every
            pairing in the Chinese zodiac is shaped by how these elemental
            energies interact — generating, controlling, or coexisting.
          </p>
          <div className="grid grid-cols-5 gap-2.5 max-sm:grid-cols-3">
            {[
              { name: "Wood", icon: "🌳", cls: "e-wood" },
              { name: "Fire", icon: "🔥", cls: "e-fire" },
              { name: "Earth", icon: "⛰", cls: "e-earth" },
              { name: "Metal", icon: "⚙", cls: "e-metal" },
              { name: "Water", icon: "🌊", cls: "e-water" },
            ].map((e) => (
              <div
                key={e.name}
                className={`${e.cls} rounded-xl p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)]`}
              >
                <span className="text-2xl block mb-1.5">{e.icon}</span>
                <div className="text-xs font-semibold">{e.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Best & Worst Pairings ─── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-white border border-[#eeebe5] rounded-2xl p-7">
            <h3 className="text-[11px] tracking-wider uppercase text-[#8a847c] mb-4 font-medium">
              ★ Highest Scores Overall
            </h3>
            {top5.map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-2.5 border-b border-[#f3f0ea]">
                  <Link
                    href={`/compatibility/${buildSlug(p.i, p.j)}`}
                    className="text-sm font-medium text-[#1a1816] no-underline hover:text-[#c0392b] transition-colors"
                  >
                    {NAMES[p.i]} + {NAMES[p.j]}
                  </Link>
                  <span className="text-sm font-semibold px-3 py-1 rounded-lg bg-[#e8f5e9] text-[#2e7d32]">
                    {p.score}%
                  </span>
                </div>
                <div className="text-sm text-[#5a5650] leading-relaxed mt-1 mb-2">
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border border-[#eeebe5] rounded-2xl p-7">
            <h3 className="text-[11px] tracking-wider uppercase text-[#8a847c] mb-4 font-medium">
              ★ Lowest Scores Overall
            </h3>
            {bot5.map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-2.5 border-b border-[#f3f0ea]">
                  <Link
                    href={`/compatibility/${buildSlug(p.i, p.j)}`}
                    className="text-sm font-medium text-[#1a1816] no-underline hover:text-[#c0392b] transition-colors"
                  >
                    {NAMES[p.i]} + {NAMES[p.j]}
                  </Link>
                  <span className="text-sm font-semibold px-3 py-1 rounded-lg bg-[#fbe9e7] text-[#c62828]">
                    {p.score}%
                  </span>
                </div>
                <div className="text-sm text-[#5a5650] leading-relaxed mt-1 mb-2">
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Harmony Trios ─── */}
        <section className="text-center mb-10">
          <div className="text-[10px] font-medium uppercase tracking-wider text-[#8a847c] mb-4 font-['JetBrains_Mono',monospace]">
            Best Matches
          </div>
          <h2 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(26px,3.2vw,38px)] font-normal tracking-tight leading-[1.15] mb-2.5 text-balance">
            The four harmony trios
          </h2>
          <p className="text-sm text-[#8a847c] leading-relaxed max-w-[480px] mx-auto mb-8 text-pretty">
            Animals four years apart form the strongest bonds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {[
              {
                animals: "🐀 🐉 🐒",
                name: "Rat · Dragon · Monkey",
                desc: "The ambitious alliance. All three are driven, clever, and love a challenge.",
              },
              {
                animals: "🐂 🐍 🐓",
                name: "Ox · Snake · Rooster",
                desc: "The steady foundation. Patient, loyal, and hardworking — they value trust above all.",
              },
              {
                animals: "🐅 🐎 🐕",
                name: "Tiger · Horse · Dog",
                desc: "The adventure pack. Freedom-loving, passionate, and fiercely protective.",
              },
              {
                animals: "🐇 🐐 🐖",
                name: "Rabbit · Goat · Pig",
                desc: "The gentle hearts. Creative, kind, and deeply empathetic.",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white border border-[#eeebe5] rounded-xl p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[rgba(192,57,43,0.25)]"
              >
                <span className="text-[26px] block mb-1">{t.animals}</span>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-[#8a847c] leading-relaxed mt-1.5">
                  {t.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="mb-10">
          <div className="bg-[#1a1816] text-white text-center py-20 px-6 rounded-[20px]">
            <h2 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(28px,3.2vw,38px)] font-normal tracking-tight leading-[1.12] mb-2.5">
              Try another pairing
            </h2>
            <p className="text-sm text-white/55 leading-relaxed max-w-[400px] mx-auto mb-6">
              Not the match you were looking for? Explore all 66 Chinese zodiac
              pairings and find the one that speaks to you.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-[#1a1816] px-9 py-3 rounded-lg text-xs font-medium border-none cursor-pointer hover:bg-[#f0f0f0] transition-colors no-underline"
            >
              Back to Home
            </Link>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="border-t border-[#eeebe5] py-9 pb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-[#8a847c]">
              ✰ Zodiac<em className="not-italic text-[#c0392b]">Match</em> —
              Chinese Zodiac Compatibility Tool
            </span>
            <div className="flex gap-4">
              <Link
                href="/blog"
                className="text-xs text-[#8a847c] no-underline hover:text-[#1a1816]"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-xs text-[#8a847c] no-underline hover:text-[#1a1816]"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-xs text-[#8a847c] no-underline hover:text-[#1a1816]"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-xs text-[#8a847c] no-underline hover:text-[#1a1816]"
              >
                Privacy
              </Link>
            </div>
          </div>
          <p className="text-[10px] text-[#bbb] leading-relaxed mt-6 max-w-[600px]">
            Disclaimer: Zodiac compatibility is for entertainment and
            self-reflection only. Not a substitute for professional relationship
            advice.
          </p>
        </footer>
      </div>
    </>
  );
}
