import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ABOUT_STORY_TIMELINE,
  PHILOSOPHY_CHAPTERS,
  PROJECTS_DATA,
} from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT_WORDS = [
  { text: 'We', highlight: false },
  { text: 'do', highlight: false },
  { text: 'not', highlight: false },
  { text: 'decorate', highlight: false },
  { text: 'surfaces—we', highlight: false },
  { text: 'carve', highlight: true },
  { text: 'permanent', highlight: true },
  { text: 'instruments', highlight: true },
  { text: 'from', highlight: false },
  { text: 'shadow,', highlight: true },
  { text: 'titanium,', highlight: false },
  { text: 'and', highlight: false },
  { text: 'light.', highlight: true },
];

export const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.5);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=170%',
      pin: true,
      scrub: 0.75,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        const nextIdx = Math.min(
          PHILOSOPHY_CHAPTERS.length - 1,
          Math.floor(self.progress * PHILOSOPHY_CHAPTERS.length * 0.99)
        );
        setActiveChapterIdx(nextIdx);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const activeChapter = PHILOSOPHY_CHAPTERS[activeChapterIdx];

  // Differential depth layer offsets driven by scroll
  const bgLayerOffset = (scrollProgress - 0.5) * -90;
  const midLayerOffset = (scrollProgress - 0.5) * -35;
  const fgLayerOffset = (scrollProgress - 0.5) * 28;
  const maskInsetPercent = Math.max(0, Math.round((1 - Math.min(1, scrollProgress * 1.45)) * 18));

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 flex h-screen w-full items-center overflow-hidden border-t border-white/[0.08] bg-[#0B0B0D]"
    >
      {/* LAYER 1: BACKGROUND PARALLAX ARCHITECTURE GRID */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate3d(0, ${bgLayerOffset}px, 0) scale(1.06)`,
          transition: 'transform 120ms linear',
        }}
        className="pointer-events-none absolute inset-0 z-0 opacity-35"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(750px circle at 20% 35%, rgba(193, 18, 31, 0.14), transparent 65%), radial-gradient(650px circle at 82% 75%, rgba(255, 255, 255, 0.05), transparent 65%)',
          }}
        />
      </div>

      {/* LAYER 2: MIDDLE STORYTELLING STAGE */}
      <div
        style={{
          transform: `translate3d(0, ${midLayerOffset}px, 0)`,
          transition: 'transform 120ms linear',
        }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-16"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left 7 Columns: Progressive Word-Highlighted Statement & Doctrine */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 font-mono text-xs tracking-[0.2em] text-[#C1121F] uppercase">
              <span>Scene 02 · Storytelling & Doctrine</span>
              <span className="text-[#D9D9D9]/65 tabular-nums">
                DEPTH PARALLAX · {Math.round(scrollProgress * 100)}%
              </span>
            </div>

            {/* Large Statement with Scroll-Linked Word Highlighting */}
            <h2
              className="font-serif text-[clamp(2rem,3.6vw,3.5rem)] font-normal leading-[1.14] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {STATEMENT_WORDS.map((wordObj, idx) => {
                const threshold = idx / STATEMENT_WORDS.length;
                const isLit = scrollProgress >= threshold * 0.85;
                return (
                  <span
                    key={idx}
                    className={`mr-[0.26em] inline-block transition-colors duration-300 ${
                      isLit
                        ? wordObj.highlight
                          ? 'italic text-[#C1121F]'
                          : 'text-[#F5F5F5]'
                        : 'text-[#D9D9D9]/35'
                    }`}
                  >
                    {wordObj.text}
                  </span>
                );
              })}
            </h2>

            {/* Interactive Doctrine Pillars */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PHILOSOPHY_CHAPTERS.map((chapter, idx) => {
                const isSelected = idx === activeChapterIdx;
                return (
                  <button
                    key={chapter.index}
                    type="button"
                    onClick={() => {
                      setActiveChapterIdx(idx);
                      setScrollProgress((idx + 0.5) / PHILOSOPHY_CHAPTERS.length);
                    }}
                    data-cursor-label="EXPLORE"
                    className={`rounded-xl border p-5 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-[#C1121F] bg-[#111111] shadow-[0_20px_50px_rgba(193,18,31,0.14)]'
                        : 'border-white/[0.08] bg-[#050505]/70 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase">
                      <span className="text-[#C1121F] tabular-nums">
                        {chapter.index}.
                      </span>
                      <span className="text-[#D9D9D9]/60">{chapter.metricValue}</span>
                    </div>
                    <h3 className="mt-2 font-serif text-xl text-[#F5F5F5]">
                      {chapter.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#D9D9D9]/75">
                      {chapter.statement}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 5 Columns: LAYER 3 FOREGROUND MASKED VISUAL & STUDIO TIMELINE */}
          <div
            style={{
              transform: `translate3d(0, ${fgLayerOffset}px, 0)`,
              transition: 'transform 120ms linear',
            }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Masked Visual Element with Clip-Path Reveal */}
            <div
              style={{
                clipPath: `inset(${maskInsetPercent}% ${maskInsetPercent}% ${maskInsetPercent}% ${maskInsetPercent}% round 16px)`,
                transition: 'clip-path 240ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative h-52 sm:h-60 w-full overflow-hidden rounded-2xl border border-white/[0.12] bg-[#050505]"
            >
              <img
                src={PROJECTS_DATA[1].image}
                alt="Architectural basalt concrete light study"
                referrerPolicy="no-referrer"
                style={{
                  transform: `scale(${1.05 + scrollProgress * 0.1})`,
                  transition: 'transform 200ms ease-out',
                }}
                className="h-full w-full object-cover object-center opacity-85"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-[#F5F5F5]">
                <span>{activeChapter.category}</span>
                <span className="text-[#C1121F] tabular-nums">
                  {activeChapter.metricValue}
                </span>
              </div>
            </div>

            {/* Studio Chronology Timeline */}
            <div className="rounded-2xl border border-white/[0.1] bg-[#050505]/90 p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.16em] text-[#D9D9D9]/70 uppercase">
                <span>Archival Studio Timeline</span>
                <span className="text-[#C1121F]">2019 — 2026</span>
              </div>

              <div className="space-y-3 border-l border-white/[0.12] pl-4">
                {ABOUT_STORY_TIMELINE.map((item, idx) => {
                  const isActiveMilestone =
                    scrollProgress >= idx * 0.22 && scrollProgress <= (idx + 1.5) * 0.28;
                  return (
                    <div key={item.year} className="relative space-y-0.5">
                      <span
                        className={`absolute -left-[21px] top-1.5 h-2 w-2 rounded-full transition-colors ${
                          isActiveMilestone ? 'bg-[#C1121F]' : 'bg-white/25'
                        }`}
                      />
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-[#C1121F] tabular-nums">
                          {item.year}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#F5F5F5]">{item.city}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#D9D9D9]/80">{item.milestone}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-[#D9D9D9]/65">
                        {item.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
