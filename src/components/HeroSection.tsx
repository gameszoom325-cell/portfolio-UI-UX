import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Compass, Sliders } from 'lucide-react';
import { HERO_MONOLITH_IMAGE, STUDIO_METRICS } from '../data/portfolioData';
import {
  calculateCardPhysics,
  computeHeroScrubState,
} from '../utils/portfolioLogic';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onExploreWorks: () => void;
  onInspectArchive: () => void;
}

const FIRST_NAME_CHARS = 'JULIAN'.split('');
const SURNAME_CHARS = 'VANCE'.split('');

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWorks,
  onInspectArchive,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const monolithRef = useRef<HTMLDivElement>(null);

  const [scrubProgress, setScrubProgress] = useState(0.55);
  const [imageError, setImageError] = useState(false);
  const [lightIntensity, setLightIntensity] = useState<
    'crimson' | 'grazing' | 'studio'
  >('crimson');
  const [depthPhysics, setDepthPhysics] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 40,
    parallaxX: 0,
    parallaxY: 0,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=180%',
      pin: true,
      scrub: 0.65,
      onUpdate: (self) => {
        // At scroll=0, start with dramatic awakening state and scrub smoothly through 0 -> 1
        setScrubProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const heroState = computeHeroScrubState(scrubProgress);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!monolithRef.current) return;
    const rect = monolithRef.current.getBoundingClientRect();
    const result = calculateCardPhysics(e.clientX, e.clientY, rect, 6.5, 18);
    setDepthPhysics({
      rotateX: result.rotateX,
      rotateY: result.rotateY,
      glareX: result.glareX,
      glareY: result.glareY,
      parallaxX: result.parallaxX,
      parallaxY: result.parallaxY,
    });
  };

  const handleMouseLeave = () => {
    setDepthPhysics({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 40,
      parallaxX: 0,
      parallaxY: 0,
    });
  };

  const lightingOverlayMap = {
    crimson:
      'radial-gradient(circle at 50% 50%, rgba(193,18,31,0.26) 0%, rgba(5,5,5,0.25) 55%, rgba(5,5,5,0.85) 100%)',
    grazing:
      'linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(5,5,5,0.4) 48%, rgba(5,5,5,0.9) 100%)',
    studio:
      'radial-gradient(circle at 65% 30%, rgba(255,255,255,0.12) 0%, rgba(193,18,31,0.14) 45%, rgba(5,5,5,0.78) 100%)',
  };

  // Ensure initial opening state (0% scroll) has atmospheric silhouette visibility while scroll drives full reveal
  const effectiveFirstProgress = Math.max(0.28, heroState.firstNameProgress);
  const effectiveSurnameProgress = Math.max(0.18, heroState.surnameProgress);
  const effectiveSubtitleProgress = Math.max(0.25, heroState.subtitleProgress);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#050505] pt-20 pb-8"
    >
      {/* Scroll-driven Ambient Awakening Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: heroState.ambientLightOpacity,
          background:
            'radial-gradient(850px circle at 62% 45%, rgba(193, 18, 31, 0.14), rgba(255, 255, 255, 0.03) 45%, rgba(5, 5, 5, 0.96) 80%)',
        }}
      />

      {/* Main 100vh Pinned Stage Container */}
      <div
        style={{
          transform: `scale(${heroState.exitScale})`,
          opacity: heroState.exitOpacity,
          transition: 'transform 120ms ease-out, opacity 120ms ease-out',
        }}
        className="relative z-10 mx-auto flex flex-1 w-full max-w-[1440px] flex-col justify-center px-6 sm:px-12 lg:px-16"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left 7 Columns: Scroll-Scrubbed Split Typography & Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Scene Timecode & Interactive Scrub Milestones */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-[#D9D9D9]/80 uppercase">
                <span className="text-[#C1121F]">Scene 01</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{heroState.phaseLabel}</span>
              </div>

              {/* Interactive Timeline Scrub Controls (0% / 25% / 50% / 75% / 100%) */}
              <div
                role="group"
                aria-label="Scrub Hero Opening Timeline"
                className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0B0B0D] p-1"
              >
                {[
                  { label: '0%', val: 0 },
                  { label: '25%', val: 0.28 },
                  { label: '50%', val: 0.55 },
                  { label: '75%', val: 0.8 },
                  { label: '100%', val: 0.96 },
                ].map((step) => {
                  const isCurrent = Math.abs(scrubProgress - step.val) < 0.13;
                  return (
                    <button
                      key={step.label}
                      type="button"
                      onClick={() => setScrubProgress(step.val)}
                      className={`rounded px-2 py-0.5 font-mono text-[10px] tabular-nums transition-colors ${
                        isCurrent
                          ? 'bg-[#C1121F] text-white'
                          : 'text-[#D9D9D9]/60 hover:text-white'
                      }`}
                    >
                      {step.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Monumental Split-Text Masked Reveal (25% First Name -> 50% Surname) */}
            <div className="space-y-1" style={{ perspective: '1000px' }}>
              <h1
                aria-label="Julian Vance — Architecture of Shadow, Mass & Precision"
                className="font-serif text-[clamp(3rem,6.4vw,6.2rem)] font-normal leading-[0.96] tracking-tight text-[#F5F5F5] uppercase"
              >
                {/* 25% Scroll Reveal: First Name */}
                <span className="block overflow-hidden pb-1">
                  <span
                    style={{
                      transform: `translate3d(0, ${(1 - effectiveFirstProgress) * 65}%, 0) scale(${
                        1.06 - effectiveFirstProgress * 0.06
                      })`,
                      filter: `blur(${(1 - effectiveFirstProgress) * 6}px)`,
                      opacity: effectiveFirstProgress,
                      transition:
                        'transform 140ms cubic-bezier(0.16,1,0.3,1), filter 140ms ease, opacity 140ms ease',
                    }}
                    className="inline-flex tracking-[0.06em]"
                  >
                    {FIRST_NAME_CHARS.map((char, idx) => (
                      <span
                        key={idx}
                        style={{
                          transform: `translate3d(0, ${
                            (1 - effectiveFirstProgress) * (idx * 8)
                          }px, 0)`,
                        }}
                        className="inline-block"
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </span>

                {/* 50% Scroll Reveal: Surname in Italic Crimson & Ivory */}
                <span className="block overflow-hidden pt-1">
                  <span
                    style={{
                      transform: `translate3d(0, ${(1 - effectiveSurnameProgress) * 75}%, 0) rotateX(${
                        (1 - effectiveSurnameProgress) * 24
                      }deg)`,
                      filter: `blur(${(1 - effectiveSurnameProgress) * 8}px)`,
                      opacity: effectiveSurnameProgress,
                      transition:
                        'transform 140ms cubic-bezier(0.16,1,0.3,1), filter 140ms ease, opacity 140ms ease',
                    }}
                    className="inline-flex items-baseline gap-4"
                  >
                    <span className="italic text-[#C1121F]">
                      {SURNAME_CHARS.map((char, idx) => (
                        <span key={idx} className="inline-block">
                          {char}
                        </span>
                      ))}
                    </span>
                    <span className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[#D9D9D9]/70 uppercase not-italic">
                      Directorate
                    </span>
                  </span>
                </span>
              </h1>
            </div>

            {/* 75% Scroll Reveal: Subtitle & Magnetic Action Controls */}
            <div
              style={{
                transform: `translate3d(0, ${(1 - effectiveSubtitleProgress) * 28}px, 0)`,
                opacity: effectiveSubtitleProgress,
                filter: `blur(${(1 - effectiveSubtitleProgress) * 4}px)`,
                transition:
                  'transform 160ms cubic-bezier(0.16,1,0.3,1), opacity 160ms ease, filter 160ms ease',
              }}
              className="space-y-6 pt-2"
            >
              <p className="max-w-[56ch] text-base leading-[1.7] text-[#D9D9D9]/85 sm:text-lg">
                Architecture of Shadow, Mass & Precision. Navigating spatial
                brutalism, haute horlogerie mechanical systems, and 35mm moving
                image direction through scroll-linked choreography.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton
                  onClick={onExploreWorks}
                  variant="primary"
                  cursorLabel="EXPLORE"
                >
                  <span>Enter Project Showcase</span>
                  <ArrowDown className="h-4 w-4" />
                </MagneticButton>

                <MagneticButton
                  onClick={onInspectArchive}
                  variant="secondary"
                  cursorLabel="OPEN"
                >
                  <span>Credential Vault</span>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: 3D Perspective Monolith Stage */}
          <div
            className="lg:col-span-5"
            style={{
              perspective: '1300px',
              transform: `scale(${0.92 + heroState.ambientLightOpacity * 0.08})`,
              transition: 'transform 200ms ease-out',
            }}
          >
            <div
              ref={monolithRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              data-cursor-label="EXPLORE"
              style={{
                transform: `rotateX(${depthPhysics.rotateX}deg) rotateY(${depthPhysics.rotateY}deg)`,
                transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="group relative h-[340px] sm:h-[420px] w-full overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0B0B0D] shadow-[0_35px_90px_-20px_rgba(0,0,0,0.95)]"
            >
              {!imageError ? (
                <img
                  src={HERO_MONOLITH_IMAGE}
                  alt="Monumental matte-black brutalist obsidian monolith sculpture bisected by a single crimson laser light seam"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  style={{
                    transform: `scale(${1.04 + scrubProgress * 0.08}) translate3d(${depthPhysics.parallaxX}px, ${depthPhysics.parallaxY}px, 0)`,
                    filter: `brightness(${0.55 + heroState.ambientLightOpacity * 0.55}) contrast(1.08)`,
                    transition:
                      'transform 220ms cubic-bezier(0.16, 1, 0.3, 1), filter 220ms ease',
                  }}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#111111] to-[#050505] p-8 text-center">
                  <Compass className="mb-3 h-8 w-8 text-[#C1121F]" />
                  <span className="font-serif text-lg text-[#F5F5F5]">
                    Monolith Study No. IV — Obsidian & 640nm Seam
                  </span>
                </div>
              )}

              {/* Illumination Mode Scrim */}
              <div
                className="pointer-events-none absolute inset-0 transition-all duration-500"
                style={{ background: lightingOverlayMap[lightIntensity] }}
              />

              {/* Cursor Specular Glare */}
              <div
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  background: `radial-gradient(380px circle at ${depthPhysics.glareX}% ${depthPhysics.glareY}%, rgba(255,255,255,0.14), rgba(193,18,31,0.1) 35%, transparent 70%)`,
                }}
              />

              {/* Bottom Glass Illumination Bar */}
              <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.1] bg-[#050505]/80 px-4 py-2.5 backdrop-blur-md">
                <div className="space-y-0.5">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-[#F5F5F5] uppercase">
                    Study IV · 640nm Seam
                  </p>
                  <p className="font-mono text-[10px] text-[#D9D9D9]/65 tabular-nums">
                    SCROLL SCRUB: {Math.round(scrubProgress * 100)}%
                  </p>
                </div>

                <div
                  role="group"
                  aria-label="Showroom Illumination Profile"
                  className="flex items-center gap-1 rounded-lg bg-[#111111] p-1 border border-white/[0.08]"
                >
                  <Sliders className="ml-1.5 mr-1 h-3 w-3 text-[#C1121F]" />
                  {(['crimson', 'grazing', 'studio'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setLightIntensity(mode)}
                      className={`rounded-md px-2 py-1 font-mono text-[10px] tracking-[0.12em] uppercase whitespace-nowrap shrink-0 transition-colors ${
                        lightIntensity === mode
                          ? 'bg-[#C1121F] text-white'
                          : 'text-[#D9D9D9]/70 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Studio Telemetry & Scroll Prompt Strip */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-5 lg:grid-cols-4">
          {STUDIO_METRICS.map((metric) => (
            <div key={metric.index} className="space-y-0.5">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[11px] text-[#C1121F] tabular-nums">
                  {metric.index}.
                </span>
                <span className="font-serif text-2xl font-semibold tracking-tight text-[#F5F5F5] tabular-nums">
                  {metric.value}
                </span>
                <span className="text-[11px] font-medium tracking-[0.06em] text-[#D9D9D9] uppercase truncate">
                  {metric.unit}
                </span>
              </div>
              <p className="text-[11px] text-[#D9D9D9]/60 truncate">
                {metric.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
