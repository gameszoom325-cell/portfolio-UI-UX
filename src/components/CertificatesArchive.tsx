import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { CERTIFICATES_ARCHIVE } from '../data/portfolioData';
import {
  computeCertificateGalleryScrubState,
  type CertificateItem,
} from '../utils/portfolioLogic';

gsap.registerPlugin(ScrollTrigger);

interface CertificatesArchiveProps {
  onInspectCertificate: (certificate: CertificateItem) => void;
}

export const CertificatesArchive: React.FC<CertificatesArchiveProps> = ({
  onInspectCertificate,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 40 });

  const totalCerts = CERTIFICATES_ARCHIVE.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: () => `+=${totalCerts * 85}%`,
      pin: true,
      scrub: 0.75,
      onUpdate: (self) => {
        setScrubProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [totalCerts]);

  const galleryState = computeCertificateGalleryScrubState(
    scrubProgress,
    totalCerts
  );
  const activeCertificate =
    CERTIFICATES_ARCHIVE[galleryState.focusedIndex] || CERTIFICATES_ARCHIVE[0];

  const jumpToCertIndex = (idx: number) => {
    if (totalCerts <= 1) return;
    setScrubProgress(idx / (totalCerts - 1));
  };

  const handleCycle = (direction: 'next' | 'prev') => {
    const delta = direction === 'next' ? 1 : -1;
    const nextIdx =
      (galleryState.focusedIndex + delta + totalCerts) % totalCerts;
    jumpToCertIndex(nextIdx);
  };

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
    const y = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
    setSpotlightPos({ x, y });
  };

  return (
    <section
      id="archive"
      ref={sectionRef}
      className="relative z-10 flex h-screen w-full flex-col justify-between overflow-hidden border-t border-white/[0.08] bg-[#050505] pt-20 pb-8"
    >
      {/* Overhead Gallery Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(680px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(193, 18, 31, 0.13), rgba(255, 255, 255, 0.03) 45%, transparent 75%)`,
        }}
      />

      {/* Top Luxury Archive Header */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-4 lg:flex-row lg:items-end">
          <div className="space-y-1">
            <p className="font-mono text-xs tracking-[0.2em] text-[#C1121F] uppercase">
              Scene 04 · Verified Credentials & Laureates
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#F5F5F5]">
              The Institutional Certificate Vault
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono text-xs text-[#D9D9D9]/65 tabular-nums">
              CHARTER 0{galleryState.focusedIndex + 1} / 0{totalCerts}
            </span>
            <button
              type="button"
              onClick={() => handleCycle('prev')}
              aria-label="Previous certificate in vault stack"
              data-cursor-label="PREV"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.12] bg-[#0B0B0D] text-[#F5F5F5] transition-colors hover:border-[#C1121F] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleCycle('next')}
              aria-label="Next certificate in vault stack"
              data-cursor-label="NEXT"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.12] bg-[#0B0B0D] text-[#F5F5F5] transition-colors hover:border-[#C1121F] hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Horizontal Sliding & Scaling Gallery Stage */}
      <div
        onMouseMove={handleStageMouseMove}
        className="relative z-10 mx-auto flex flex-1 w-full max-w-[1440px] items-center px-6 sm:px-12 lg:px-16"
        style={{ perspective: '1300px' }}
      >
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left 7 Columns: Horizontal Scroll-Linked Stack Stage */}
          <div className="relative h-[380px] sm:h-[400px] lg:col-span-7 flex items-center justify-center">
            {CERTIFICATES_ARCHIVE.map((cert, idx) => {
              const cardState = galleryState.cards[idx] || {
                index: idx,
                scale: 1,
                opacity: 1,
                spotlightIntensity: 1,
                rotateYDeg: 0,
                isFocused: idx === 0,
              };
              const delta = idx - scrubProgress * (totalCerts - 1);

              return (
                <div
                  key={cert.id}
                  style={{
                    transform: `translate3d(${delta * 62}%, ${Math.abs(delta) * 14}px, 0) scale(${cardState.scale}) rotateY(${cardState.rotateYDeg}deg)`,
                    opacity: cardState.opacity,
                    zIndex: cardState.isFocused ? 30 : 20 - Math.abs(idx - galleryState.focusedIndex),
                    pointerEvents: cardState.isFocused ? 'auto' : 'none',
                    transition:
                      'transform 220ms cubic-bezier(0.16, 1, 0.3, 1), opacity 220ms ease',
                  }}
                  className={`absolute inset-x-0 mx-auto w-full max-w-2xl rounded-2xl border p-7 sm:p-9 shadow-[0_35px_100px_rgba(0,0,0,0.95)] backdrop-blur-xl ${
                    cardState.isFocused
                      ? 'border-white/[0.22] bg-[#0B0B0D]/95'
                      : 'border-white/[0.07] bg-[#111111]/75'
                  }`}
                >
                  {/* Dynamic Spotlight Sweep on Active Certificate */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                      opacity: cardState.spotlightIntensity,
                      background: `radial-gradient(420px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(193, 18, 31, 0.16), rgba(255, 255, 255, 0.05) 45%, transparent 72%)`,
                    }}
                  />

                  <div className="relative z-10 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3.5 font-mono text-xs text-[#D9D9D9]/75">
                      <span className="text-[#C1121F] tracking-[0.16em]">
                        {cert.archiveCode}
                      </span>
                      <span className="tabular-nums">
                        SERIAL: {cert.verificationHash}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <p className="font-mono text-xs tracking-[0.12em] text-[#D9D9D9]/70 uppercase">
                        {cert.institution} · {cert.location}
                      </p>
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F5F5F5]">
                        {cert.title}
                      </h3>
                    </div>

                    <p className="text-sm leading-relaxed text-[#D9D9D9]/85">
                      {cert.citationSummary}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
                      <div className="space-y-0.5 font-mono text-[11px] text-[#D9D9D9]/70">
                        <div>CONFERRED: {cert.conferredDate}</div>
                        <div className="text-[#F5F5F5]">{cert.distinctionLevel}</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onInspectCertificate(cert)}
                        data-cursor-label="OPEN"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#C1121F] bg-[#C1121F] px-4 py-2.5 font-mono text-xs tracking-[0.14em] text-white uppercase whitespace-nowrap shrink-0 transition-colors hover:bg-[#a30f1a]"
                      >
                        <span>Open Charter</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 5 Columns: Active Credential Spotlight Inspection Panel */}
          <div className="lg:col-span-5 space-y-5 rounded-2xl border border-white/[0.1] bg-[#0B0B0D]/85 p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.16em] text-[#C1121F] uppercase">
                Active Vault Charter
              </span>
              <ShieldCheck className="h-5 w-5 text-[#C1121F]" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-serif text-2xl text-[#F5F5F5]">
                {activeCertificate.institution}
              </h4>
              <p className="font-mono text-xs text-[#D9D9D9]/65">
                Signatory: {activeCertificate.directorSignatory}
              </p>
            </div>

            <div className="space-y-2 border-t border-white/[0.08] pt-4">
              <p className="font-mono text-[11px] tracking-[0.14em] text-[#D9D9D9]/60 uppercase">
                Verified Technical Pillars
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#F5F5F5]">
                {activeCertificate.technicalPillars.map((pillar) => (
                  <li key={pillar} className="flex items-center gap-2.5">
                    <span className="h-1 w-3 bg-[#C1121F]" />
                    <span>{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-xs text-[#D9D9D9]/65">
              <span>{activeCertificate.accreditationBody}</span>
              <button
                type="button"
                onClick={() => onInspectCertificate(activeCertificate)}
                data-cursor-label="OPEN"
                className="text-[#C1121F] underline underline-offset-4 hover:text-white whitespace-nowrap shrink-0"
              >
                Inspect Full Seal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Archival Rail Switcher */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-4 lg:grid-cols-4">
          {CERTIFICATES_ARCHIVE.map((cert, idx) => {
            const isSelected = idx === galleryState.focusedIndex;
            return (
              <div
                key={cert.id}
                className={`flex items-center justify-between rounded-xl border px-4 py-2.5 transition-all ${
                  isSelected
                    ? 'border-[#C1121F] bg-[#111111]'
                    : 'border-white/[0.08] bg-[#0B0B0D]/80 hover:border-white/25'
                }`}
              >
                <button
                  type="button"
                  onClick={() => jumpToCertIndex(idx)}
                  data-cursor-label="SELECT"
                  className="text-left min-w-0 pr-2"
                >
                  <div className="font-mono text-[10px] text-[#C1121F]">
                    {cert.archiveCode}
                  </div>
                  <div className="truncate font-serif text-sm text-[#F5F5F5]">
                    {cert.institution}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => onInspectCertificate(cert)}
                  data-cursor-label="OPEN"
                  className="font-mono text-[10px] tracking-[0.12em] text-[#D9D9D9] hover:text-[#C1121F] uppercase whitespace-nowrap shrink-0"
                >
                  Open →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
