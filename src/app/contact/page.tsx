import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — ZodiacMatch",
  description: "Get in touch with the ZodiacMatch team. Suggestions, questions, or sign combinations you want us to add?",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <main className="max-w-2xl mx-auto px-5 py-16 sm:py-24">
      <Link href="/" className="inline-flex items-center gap-1 text-sm mb-10" style={{ color: "#999" }}>← Back to compatibility tool</Link>
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Contact</h1>

      <div className="text-[#555] leading-relaxed space-y-4">
        <p>
          Have a suggestion for a new feature? Found a sign combination you think could be
          improved? Or just want to share your zodiac compatibility story? We'd love to hear it.
        </p>
        <p>
          We're open to feedback, collaboration, and ideas for making the tool better.
        </p>
        <p className="mt-6">
          Email: <a href="mailto:support@zodiacmatch.xyz" className="text-[#c0392b] underline font-medium">support@zodiacmatch.xyz</a>
        </p>
        <p className="text-sm mt-8 p-4 rounded-xl" style={{ background: "#fafafa", border: "1px solid #eee" }}>
          Response time: usually within 24–48 hours. We read every message.
        </p>
      </div>
    </main>
  );
}
