import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — ZodiacMatch",
  description: "ZodiacMatch is a free Chinese zodiac compatibility tool. Learn about the system, how scores are calculated, and what the elements mean for your relationships.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main className="max-w-2xl mx-auto px-5 py-16 sm:py-24">
      <Link href="/" className="inline-flex items-center gap-1 text-sm mb-10" style={{ color: "#999" }}>← Back to compatibility tool</Link>
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">About ZodiacMatch</h1>

      <div className="text-[#555] leading-relaxed space-y-4">
        <p>
          Chinese zodiac compatibility is a centuries-old system that maps personalities and
          relationships through 12 animal signs. Each sign carries unique traits, elements, and
          dynamics that influence how two people connect. ZodiacMatch makes this system
          instantly accessible—pick two animals and see your compatibility score in seconds.
        </p>
        <p>
          The compatibility ratings are based on traditional Chinese zodiac principles:
          the four harmonious trios (animals that naturally support each other), the six
          conflicting pairs (signs that tend to clash), and the five elements cycle (which
          determines how energies interact). Each of the 66 unique pairings has been evaluated
          across multiple dimensions: natural harmony, communication style, emotional connection,
          and long-term potential.
        </p>
        <p>
          Most zodiac resources are either oversimplified (just "good" or "bad") or buried in
          dense cultural references. We built ZodiacMatch to be the middle ground: detailed enough
          to be useful, simple enough to use in five seconds. No account, no sign-up, no charge.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-3 text-[#1a1a1a]">How Compatibility Is Calculated</h2>
        <p>
          Each pairing starts with a base score derived from traditional compatibility rules—
          harmonious trios score higher, conflicting pairs score lower. The element interaction
          (based on the five elements' generating and controlling cycles) then adjusts the score
          up or down. The result is a 0–100 scale that reflects both the natural dynamic and the
          elemental influence between two signs.
        </p>
        <p>
          We also provide detailed insights for each pairing: strengths to build on, challenges
          to watch for, and the deeper dynamic beneath the surface compatibility. Every pairing
          has strengths—even the traditionally "conflicting" ones.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-3 text-[#1a1a1a]">Disclaimer</h2>
        <p className="text-sm p-4 rounded-xl" style={{ background: "#faf6f1", border: "1px solid #eeebe5" }}>
          <strong>For entertainment and informational purposes only.</strong> Chinese zodiac compatibility
          is a traditional system of personality insight, not a scientific or psychological assessment.
          Compatibility scores are for guidance and self-reflection—they are not predictions or
          substitutes for professional relationship advice.
        </p>
      </div>
    </main>
  );
}
