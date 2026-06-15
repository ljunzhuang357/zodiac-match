"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { animals, NAMES, authoritativeScore, genDeep, genElem, getScore, getAllPairings } from "@/data/zodiac";

const R = 314.16; // circumference

export default function Page() {
  const [selA, setSelA] = useState(-1);
  const [selB, setSelB] = useState(-1);
  const [result, setResult] = useState<{ score: number; label: string; desc: string; deep: string; elem: string } | null>(null);
  const [detailIdx, setDetailIdx] = useState<number | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Scroll reveal
  useEffect(() => {
    const o = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("ok"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".rv:not(.ok)").forEach((el) => o.observe(el));
    return () => o.disconnect();
  }, []);

  // FAQ toggle (delegation)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".q-btn");
      if (target) target.parentElement?.classList.toggle("open");
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const checkMatch = useCallback((a: number, b: number) => {
    if (a === -1 || b === -1) return;
    const data = getScore(a, b);
    if (!data) return;
    const s = authoritativeScore(a, b);
    setResult({
      score: s,
      label: data.label,
      desc: data.desc,
      deep: genDeep(a, b, s, animals),
      elem: genElem(a, b, animals),
    });
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, []);

  const handleSelect = (which: "A" | "B", val: number) => {
    if (which === "A") { setSelA(val); if (selB !== -1 && val !== -1) checkMatch(val, selB); }
    else { setSelB(val); if (selA !== -1 && val !== -1) checkMatch(selA, val); }
  };

  const handleGridClick = (i: number) => {
    if (selA === -1) { setSelA(i); }
    else if (selB === -1 && i !== selA) { setSelB(i); checkMatch(selA, i); }
    else if (i === selA) { if (selB !== -1) { setSelA(selB); setSelB(-1); } else { setSelA(-1); } }
    else if (i === selB) { setSelB(-1); }
    else { setSelB(i); checkMatch(selA, i); }
    setDetailIdx(i);
  };

  const pairings = getAllPairings();
  const sorted = [...pairings].sort((a, b) => b.score - a.score);
  const top5 = sorted.slice(0, 5);
  const bot5 = sorted.filter((x) => x.score < 60).sort((a, b) => a.score - b.score).slice(0, 5);

  const bestForDetail = detailIdx !== null
    ? animals.filter((_, i) => i !== detailIdx && authoritativeScore(detailIdx, i) >= 80).map((a) => a.name)
    : [];
  const worstForDetail = detailIdx !== null
    ? animals.filter((_, i) => i !== detailIdx && authoritativeScore(detailIdx, i) < 45).map((a) => a.name)
    : [];

  const scoreClass = (s: number) => s >= 80 ? "high" : s >= 60 ? "mid" : "low";
  const tagLabel = (s: number) => s >= 80 ? "Great Match" : s >= 65 ? "Good Match" : s >= 50 ? "Average Match" : "Challenging Match";
  const tagClass = (s: number) => s >= 80 ? "tag-great" : s >= 65 ? "tag-good" : s >= 50 ? "tag-okay" : "tag-tough";
  const arcColor = (s: number) => s >= 80 ? "#2e7d32" : s >= 60 ? "#e65100" : "#c62828";

  const gaugeOffset = result ? R - (result.score / 100) * R : R;

  return (
    <div className="max-w-[1040px] mx-auto px-6">
      {/* Nav */}
      <nav className="flex items-center justify-between py-5 border-b border-[#eeebe5] mb-12">
        <div className="text-base font-bold tracking-tight flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-7 h-7 bg-[#1a1816] text-white rounded-lg text-sm">✰</span>
          Zodiac<em className="not-italic text-[#c0392b]">Match</em>
        </div>
        <div className="flex gap-2 items-center">
          {["Signs", "Scores", "Elements", "FAQ"].map((label, idx) => (
            <a key={label} onClick={() => document.getElementById(["animals","matches","elements","faqBox"][idx])?.scrollIntoView({ behavior: "smooth" })}
               className="text-xs text-[#8a847c] no-underline cursor-pointer px-2.5 py-1.5 rounded-md relative
                          after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:right-1/2 after:h-[1.5px] after:bg-[#c0392b] after:rounded-sm
                          after:transition-[left,right] after:duration-[0.35s] after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#1a1816]
                          hover:after:left-[20%] hover:after:right-[20%]">
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center mb-12 relative pt-5">
        <div className="absolute -top-15 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(192,57,43,0.04)_0%,transparent_70%)] pointer-events-none" />
        <h1 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(40px,7vw,64px)] font-normal tracking-tight leading-[1.08] mb-3.5 text-balance">
          Find your <em className="italic text-[#c0392b]">animal</em> match
        </h1>
        <p className="text-sm text-[#8a847c] leading-relaxed max-w-[520px] mx-auto text-pretty">
          Chinese zodiac compatibility, reimagined. Pick two signs and see what the ancient animals say about your connection.
        </p>
      </section>

      {/* Picker */}
      <div className="rv ok d2">
        <div className="picker flex items-center justify-center gap-3.5 mb-12 flex-wrap">
          <select value={selA} onChange={(e) => handleSelect("A", parseInt(e.target.value))}
            className="px-5 py-3 bg-white border border-[#eeebe5] rounded-xl text-sm font-sans text-[#1a1816] cursor-pointer outline-none min-w-[150px]
                       appearance-none focus:border-[#c0392b] focus:shadow-[0_0_0_3px_rgba(192,57,43,0.1),inset_0_-2px_0_#c0392b] transition-[border-color,box-shadow]">
            <option value="-1">Your sign</option>
            {animals.map((a, i) => <option key={i} value={i}>{a.name}</option>)}
          </select>
          <span className="text-[#c0392b] text-lg font-light">→</span>
          <select value={selB} onChange={(e) => handleSelect("B", parseInt(e.target.value))}
            className="px-5 py-3 bg-white border border-[#eeebe5] rounded-xl text-sm font-sans text-[#1a1816] cursor-pointer outline-none min-w-[150px]
                       appearance-none focus:border-[#c0392b] focus:shadow-[0_0_0_3px_rgba(192,57,43,0.1),inset_0_-2px_0_#c0392b] transition-[border-color,box-shadow]">
            <option value="-1">Their sign</option>
            {animals.map((a, i) => <option key={i} value={i}>{a.name}</option>)}
          </select>
          <button onClick={() => checkMatch(selA, selB)}
            className="px-9 py-3 bg-[#c0392b] text-white rounded-lg text-xs font-medium border-none cursor-pointer
                       transition-[background,transform] duration-200 active:scale-[0.96] hover:bg-[#a93226] hover:-translate-y-px">
            Check Match
          </button>
        </div>
      </div>

      {/* Result */}
      <div ref={resultRef} className={`rv ${result ? "ok" : ""}`} style={{ display: result ? "block" : "none" }}>
        {result && (
          <div className="bg-white border border-[#eeebe5] rounded-[20px] p-9 mb-12 text-center">
            <div className="grid grid-cols-[auto_1fr] gap-8 items-center text-left max-sm:grid-cols-1 max-sm:text-center">
              {/* Gauge */}
              <div className="text-center">
                <div className="inline-flex relative">
                  <svg width="110" height="110" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                    <circle className="gauge-bg" cx="60" cy="60" r="50" />
                    <circle className="gauge-fg" cx="60" cy="60" r="50"
                      stroke={arcColor(result.score)}
                      strokeDasharray={R}
                      strokeDashoffset={gaugeOffset} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-[26px] font-bold leading-none ${scoreClass(result.score) === "high" ? "text-[#2e7d32]" : scoreClass(result.score) === "mid" ? "text-[#e65100]" : "text-[#c62828]"}`}>
                      {result.score}%
                    </span>
                    <span className="text-[9px] text-[#8a847c] mt-0.5 tracking-wider uppercase">Score</span>
                  </div>
                </div>
                <div className="text-lg font-semibold mt-2.5">{result.label}</div>
                <div className="text-sm text-[#5a5650] leading-relaxed max-w-[480px] mx-auto my-1.5">{result.desc}</div>
                <span className={`inline-block px-3.5 py-1 rounded-full text-[11px] font-medium mt-2 ${tagClass(result.score)}`}>{tagLabel(result.score)}</span>
              </div>
              {/* Details */}
              <div>
                <div className="text-sm text-[#5a5650] leading-relaxed mb-3.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8a847c] block mb-0.5">Deeper Insight</span>
                  {result.deep}
                </div>
                <div className="text-sm text-[#5a5650] leading-relaxed">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8a847c] block mb-0.5">Element Dynamic</span>
                  {result.elem}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animal Grid */}
      <section id="animals" className="rv ok d3">
        <div className="text-[11px] tracking-widest uppercase text-[#8a847c] mb-3.5 font-medium">★ The Twelve Animals</div>
        <div className="grid grid-cols-6 gap-2 mb-12 max-lg:grid-cols-4 max-sm:grid-cols-3">
          {animals.map((a, i) => (
            <div key={i} onClick={() => handleGridClick(i)}
              className={`relative bg-white border border-[#eeebe5] rounded-xl p-4 text-center cursor-pointer transition-all duration-[0.35s]
                          hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[#d9d2c9]
                          before:content-[''] before:absolute before:inset-[-1px] before:rounded-inherit before:opacity-0 before:transition-opacity before:duration-300
                          before:bg-[radial-gradient(300px_circle_at_var(--mx,50%)_var(--my,50%),rgba(192,57,43,0.1),transparent_60%)] before:pointer-events-none
                          ${selA === i ? "animal-sel-a" : selB === i ? "animal-sel-b" : ""}`}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
                e.currentTarget.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
              }}>
              <span className="text-[28px] block mb-1.5 relative">{a.emoji}</span>
              <div className="text-sm font-semibold mb-0.5">{a.name}</div>
              <div className="text-[9px] text-[#8a847c]">{a.years}</div>
              {selA === i && <span className="absolute -top-1.5 -right-1.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-md text-white bg-[#c0392b]">You</span>}
              {selB === i && <span className="absolute -top-1.5 -right-1.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-md text-white bg-[#2d7d9a]">Them</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Animal Detail */}
      {detailIdx !== null && (
        <section className="grid grid-cols-3 gap-3 mb-12 max-md:grid-cols-1 rv ok">
          <div className="bg-white border border-[#eeebe5] rounded-xl p-5 text-center">
            <span className="text-[36px] block mb-2">{animals[detailIdx].emoji}</span>
            <div className="text-sm font-semibold mb-0.5">{animals[detailIdx].name}</div>
            <div className="text-[11px] text-[#8a847c] mb-2">{animals[detailIdx].years}</div>
            <div className="text-[11px] text-[#8a847c] mb-2.5">Element: {animals[detailIdx].elem}</div>
            <div className="text-sm text-[#5a5650] leading-relaxed">{animals[detailIdx].trait}</div>
          </div>
          <div className="bg-white border border-[#eeebe5] rounded-xl p-5 text-center">
            <div className="text-sm font-semibold text-[#2e7d32] mb-2">★ Best Matches</div>
            <div className="text-sm text-[#5a5650] leading-[2.2]">
              {bestForDetail.length ? bestForDetail.map((n) => <div key={n}>{n}</div>) : <div className="mt-2.5">None above 80%</div>}
            </div>
          </div>
          <div className="bg-white border border-[#eeebe5] rounded-xl p-5 text-center">
            <div className="text-sm font-semibold text-[#c62828] mb-2">☆ Challenging</div>
            <div className="text-sm text-[#5a5650] leading-[2.2]">
              {worstForDetail.length ? worstForDetail.map((n) => <div key={n}>{n}</div>) : <div className="mt-2.5">None below 45%</div>}
            </div>
          </div>
        </section>
      )}

      {/* Best & Worst */}
      <section id="matches" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 rv ok">
        <div className="bg-white border border-[#eeebe5] rounded-2xl p-7">
          <h3 className="text-[11px] tracking-wider uppercase text-[#8a847c] mb-4 font-medium">★ Highest Scores</h3>
          {top5.map((p, i) => (
            <div key={i}>
              <div className="flex items-center justify-between py-2.5 border-b border-[#f3f0ea]">
                <span className="text-sm font-medium">{NAMES[p.i]} + {NAMES[p.j]}</span>
                <span className="text-sm font-semibold px-3 py-1 rounded-lg bg-[#e8f5e9] text-[#2e7d32]">{p.score}%</span>
              </div>
              <div className="text-sm text-[#5a5650] leading-relaxed mt-1 mb-2">{p.desc}</div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-[#eeebe5] rounded-2xl p-7">
          <h3 className="text-[11px] tracking-wider uppercase text-[#8a847c] mb-4 font-medium">★ Lowest Scores</h3>
          {bot5.map((p, i) => (
            <div key={i}>
              <div className="flex items-center justify-between py-2.5 border-b border-[#f3f0ea]">
                <span className="text-sm font-medium">{NAMES[p.i]} + {NAMES[p.j]}</span>
                <span className="text-sm font-semibold px-3 py-1 rounded-lg bg-[#fbe9e7] text-[#c62828]">{p.score}%</span>
              </div>
              <div className="text-sm text-[#5a5650] leading-relaxed mt-1 mb-2">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Five Elements */}
      <section id="elements" className="bg-white border border-[#eeebe5] rounded-2xl p-7 mb-12 rv ok">
        <h3 className="text-[11px] tracking-wider uppercase text-[#8a847c] mb-3.5 font-medium">★ The Five Elements</h3>
        <p className="text-sm text-[#5a5650] leading-relaxed mb-4">Beyond the animals, the five elements (Wood, Fire, Earth, Metal, Water) add depth to every reading. Each year cycles through an element...</p>
        <div className="grid grid-cols-5 gap-2.5 max-sm:grid-cols-3">
          {[
            { name: "Wood", icon: "🌳", cls: "e-wood" },
            { name: "Fire", icon: "🔥", cls: "e-fire" },
            { name: "Earth", icon: "⛰", cls: "e-earth" },
            { name: "Metal", icon: "⚙", cls: "e-metal" },
            { name: "Water", icon: "🌊", cls: "e-water" },
          ].map((e) => (
            <div key={e.name} className={`${e.cls} rounded-xl p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)]`}>
              <span className="text-2xl block mb-1.5">{e.icon}</span>
              <div className="text-xs font-semibold">{e.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="text-center mb-15 rv ok">
        <div className="text-[10px] font-medium uppercase tracking-wider text-[#8a847c] mb-4 font-['JetBrains_Mono',monospace]">How It Works</div>
        <h2 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(26px,3.2vw,38px)] font-normal tracking-tight leading-[1.15] mb-2.5 text-balance">Three clicks to your reading</h2>
        <p className="text-sm text-[#8a847c] leading-relaxed max-w-[480px] mx-auto mb-8 text-pretty">No sign-up, no astrology degree needed.</p>
        <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {[
            { num: "01", title: "Pick Two Signs", desc: "Choose your birth year animal and the other person's." },
            { num: "02", title: "Check the Match", desc: "Hit the button and our compatibility matrix calculates your score instantly." },
            { num: "03", title: "Read the Breakdown", desc: "See the score plus a detailed insight into how the two animals connect." },
            { num: "04", title: "Explore Deeper", desc: "Click any animal card to learn its traits, element, and best matches." },
          ].map((s) => (
            <div key={s.num} className="bg-white border border-[#eeebe5] rounded-xl p-7 text-center transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <div className="text-[28px] font-bold text-[#c0392b] tracking-tight mb-1.5">{s.num}</div>
              <h4 className="text-sm font-semibold mb-1">{s.title}</h4>
              <p className="text-xs text-[#8a847c] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mb-15 rv ok">
        <div className="text-[10px] font-medium uppercase tracking-wider text-[#8a847c] mb-4 text-center font-['JetBrains_Mono',monospace]">About</div>
        <h2 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(26px,3.2vw,38px)] font-normal tracking-tight leading-[1.15] mb-2.5 text-balance text-center">Why Chinese zodiac?</h2>
        <p className="text-sm text-[#8a847c] leading-relaxed max-w-[480px] mx-auto mb-8 text-pretty text-center">The Chinese zodiac is one of the oldest systems for understanding human relationships.</p>
        <div className="bg-white border border-[#eeebe5] rounded-2xl p-9 space-y-3.5">
          <p className="text-sm text-[#5a5650] leading-relaxed">The Chinese zodiac (生肖) follows a 12-year cycle, each year represented by an animal. Unlike Western astrology, the Chinese zodiac anchors you to a larger cycle — the year you were born reveals your core temperament, your strengths, and the kinds of people you naturally click with.</p>
          <p className="text-sm text-[#5a5650] leading-relaxed">Compatibility is determined by three factors: the natural relationships between the animals, the five elements, and the balance of yin and yang energy. Together, these create a rich map of human connection.</p>
          <p className="text-sm text-[#5a5650] leading-relaxed">Not all pairings are meant to be easy — and that's the point. The zodiac shows you where growth, patience, and understanding are needed most.</p>
        </div>
      </section>

      {/* Features */}
      <section className="text-center mb-15 rv ok">
        <div className="text-[10px] font-medium uppercase tracking-wider text-[#8a847c] mb-4 font-['JetBrains_Mono',monospace]">Why Use This</div>
        <h2 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(26px,3.2vw,38px)] font-normal tracking-tight leading-[1.15] mb-2.5 text-balance">Built for curiosity, not confusion</h2>
        <p className="text-sm text-[#8a847c] leading-relaxed max-w-[480px] mx-auto mb-8 text-pretty">Clear, useful insight without the spiritual jargon.</p>
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          {[
            { icon: "⚡", title: "Free & Instant", desc: "No sign-up, no paywall, no limits. Pick two signs and get your reading immediately." },
            { icon: "🧩", title: "All 66 Pairings", desc: "Every unique combination of the twelve animals has been evaluated — not just the popular ones." },
            { icon: "🔥", title: "Element-Powered", desc: "Beyond the animals, the five elements add depth to every pairing." },
            { icon: "📖", title: "Plain Language", desc: "No vague spiritual talk. Each insight tells you clearly what works, what's hard, and why." },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-[#eeebe5] rounded-xl p-7 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <span className="text-[22px] block mb-2">{f.icon}</span>
              <h4 className="text-sm font-semibold mb-1">{f.title}</h4>
              <p className="text-sm text-[#8a847c] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Harmony Trios */}
      <section className="text-center mb-15 rv ok">
        <div className="text-[10px] font-medium uppercase tracking-wider text-[#8a847c] mb-4 font-['JetBrains_Mono',monospace]">Best Matches</div>
        <h2 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(26px,3.2vw,38px)] font-normal tracking-tight leading-[1.15] mb-2.5 text-balance">The four harmony trios</h2>
        <p className="text-sm text-[#8a847c] leading-relaxed max-w-[480px] mx-auto mb-8 text-pretty">Animals four years apart form the strongest bonds.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {[
            { animals: "🐀 🐉 🐒", name: "Rat · Dragon · Monkey", desc: "The ambitious alliance. All three are driven, clever, and love a challenge." },
            { animals: "🐂 🐍 🐓", name: "Ox · Snake · Rooster", desc: "The steady foundation. Patient, loyal, and hardworking — they value trust above all." },
            { animals: "🐅 🐎 🐕", name: "Tiger · Horse · Dog", desc: "The adventure pack. Freedom-loving, passionate, and fiercely protective." },
            { animals: "🐇 🐐 🐖", name: "Rabbit · Goat · Pig", desc: "The gentle hearts. Creative, kind, and deeply empathetic." },
          ].map((t) => (
            <div key={t.name} className="bg-white border border-[#eeebe5] rounded-xl p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[rgba(192,57,43,0.25)]">
              <span className="text-[26px] block mb-1">{t.animals}</span>
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-[#8a847c] leading-relaxed mt-1.5">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faqBox" className="mb-15 rv ok">
        <div className="text-[10px] font-medium uppercase tracking-wider text-[#8a847c] mb-4 text-center font-['JetBrains_Mono',monospace]">FAQ</div>
        <h2 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(26px,3.2vw,38px)] font-normal tracking-tight leading-[1.15] mb-2.5 text-balance text-center">Common questions</h2>
        <p className="text-sm text-[#8a847c] leading-relaxed max-w-[480px] mx-auto mb-8 text-pretty text-center">Quick answers to the things people ask most.</p>
        <div className="max-w-[640px] mx-auto">
          {[
            { q: "How is the compatibility score calculated?", a: "Scores are based on traditional Chinese zodiac compatibility principles — the four harmonious trios, the six conflicting pairs, and the five elements cycle. Each of the 66 unique pairings has been evaluated for natural harmony, communication style, and long-term potential." },
            { q: "What if my sign has a low score with someone I care about?", a: "Chinese zodiac compatibility is a guide, not a verdict. A low score means more natural friction — but many of the strongest relationships are built on navigating differences well." },
            { q: "How do the five elements affect compatibility?", a: "Each birth year carries one of five elements. Elements that nourish each other in the generating cycle create smoother connections. When elements clash, the relationship may have more friction — but also more potential for growth." },
            { q: "How do I find my Chinese zodiac sign?", a: "Find your birth year under each animal — the cycle runs every 12 years. If born in January or February, check whether the Lunar New Year had passed in your birth year." },
            { q: "Is this really free? No sign-up?", a: "Yes. No sign-up, no credit card, no hidden limits. Every pairing, every score, every insight is fully accessible to everyone, always." },
          ].map((item) => (
            <div key={item.q} className="border-b border-[#eeebe5] last:border-b-0">
              <button className="q-btn flex justify-between items-center w-full py-[18px] text-sm font-medium bg-none border-none cursor-pointer font-sans text-[#1a1816] text-left hover:text-[#c0392b] transition-colors">
                {item.q}
                <span className="arr text-xs text-[#ccc] shrink-0 ml-3 transition-transform duration-300">▾</span>
              </button>
              <div className="q-a px-0 pb-[18px] hidden text-sm text-[#5a5650] leading-relaxed">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rv ok">
        <div className="bg-[#1a1816] text-white text-center py-20 px-6 rounded-[20px] mb-12">
          <h2 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(28px,3.2vw,38px)] font-normal tracking-tight leading-[1.12] mb-2.5">Ready to find your match?</h2>
          <p className="text-sm text-white/55 leading-relaxed max-w-[400px] mx-auto mb-6">It takes five seconds. Pick two animals and discover what the zodiac says about your connection.</p>
          <button onClick={() => { const el = document.querySelector('.picker'); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            className="bg-white text-[#1a1816] px-9 py-3 rounded-lg text-xs font-medium border-none cursor-pointer hover:bg-[#f0f0f0] transition-colors">
            Check Your Match
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#eeebe5] py-9 pb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs text-[#8a847c]">✰ Zodiac<em className="not-italic text-[#c0392b]">Match</em> — Chinese Zodiac Compatibility Tool</span>
          <a href="#" className="text-xs text-[#8a847c] no-underline hover:text-[#1a1816]">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
