import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Globe, Terminal, Wrench } from 'lucide-react';
import { SKILLS_ECOSYSTEM_DATA } from '../data/portfolioData';
import {
  computeSkillsEcosystemScrubState,
  type SkillDomainId,
} from '../utils/portfolioLogic';

gsap.registerPlugin(ScrollTrigger);

const DOMAIN_ICONS: Record<SkillDomainId, React.ReactNode> = {
  'ai-ml': <Cpu className="h-4 w-4" />,
  'web-dev': <Globe className="h-4 w-4" />,
  programming: <Terminal className="h-4 w-4" />,
  tools: <Wrench className="h-4 w-4" />,
};

export const SkillsEcosystemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrubProgress, setScrubProgress] = useState(0.35);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const totalCategories = SKILLS_ECOSYSTEM_DATA.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=220%',
      pin: true,
      scrub: 0.7,
      onUpdate: (self) => {
        setScrubProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const ecosystemState = computeSkillsEcosystemScrubState(
    scrubProgress,
    totalCategories,
    5
  );
  const activeDomain =
    SKILLS_ECOSYSTEM_DATA[ecosystemState.activeCategoryIndex] ||
    SKILLS_ECOSYSTEM_DATA[0];

  const activeNode =
    activeDomain.nodes.find((n) => n.id === selectedNodeId) ||
    activeDomain.nodes[0];

  const selectDomainByIndex = (idx: number) => {
    setSelectedNodeId(null);
    setScrubProgress((idx + 0.65) / totalCategories);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 flex h-screen w-full flex-col justify-between overflow-hidden border-t border-white/[0.08] bg-[#0B0B0D] pt-20 pb-8"
    >
      {/* Top Ecosystem Header & Category Switcher */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-4 lg:flex-row lg:items-end">
          <div className="space-y-1">
            <p className="font-mono text-xs tracking-[0.2em] text-[#C1121F] uppercase">
              Scene 05 · Interactive Technical Ecosystem
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#F5F5F5]">
              Synaptic Engineering & Fabrication Graph
            </h2>
          </div>

          {/* 4 Domain Category Selectors */}
          <div
            role="tablist"
            aria-label="Technical Ecosystem Domains"
            className="flex flex-wrap lg:flex-nowrap items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#050505] p-1.5 shrink-0"
          >
            {SKILLS_ECOSYSTEM_DATA.map((domain, idx) => {
              const isActive = idx === ecosystemState.activeCategoryIndex;
              return (
                <button
                  key={domain.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => selectDomainByIndex(idx)}
                  data-cursor-label="EXPLORE"
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#C1121F] text-white shadow-sm'
                      : 'text-[#D9D9D9]/70 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {DOMAIN_ICONS[domain.id]}
                  <span>{domain.title.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Interactive Node-and-Connection Graph Viewport */}
      <div className="relative z-10 mx-auto flex flex-1 w-full max-w-[1440px] items-center px-6 sm:px-12 lg:px-16">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left 7 Columns: Live SVG Synaptic Graph Stage */}
          <div className="relative h-[340px] sm:h-[420px] lg:col-span-7 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
            {/* Domain-Specific Kinetic Background Geometry */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{
                background:
                  activeDomain.signatureAnimation === 'neural-pulse'
                    ? 'radial-gradient(circle at 50% 45%, rgba(193,18,31,0.22), transparent 65%)'
                    : activeDomain.signatureAnimation === 'matrix-grid'
                    ? 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)'
                    : activeDomain.signatureAnimation === 'kinetic-orbit'
                    ? 'radial-gradient(circle at 30% 60%, rgba(255,255,255,0.08), transparent 60%)'
                    : 'radial-gradient(circle at 75% 25%, rgba(193,18,31,0.18), transparent 60%)',
                backgroundSize:
                  activeDomain.signatureAnimation === 'matrix-grid'
                    ? '36px 36px'
                    : '100% 100%',
              }}
            />

            {/* SVG Animated Synaptic Connections */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {activeDomain.connections.map(([fromIdx, toIdx], cIdx) => {
                const fromNode = activeDomain.nodes[fromIdx];
                const toNode = activeDomain.nodes[toIdx];
                if (!fromNode || !toNode) return null;

                const isHighlighted =
                  activeNode.id === fromNode.id || activeNode.id === toNode.id;

                return (
                  <line
                    key={`${activeDomain.id}-${cIdx}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isHighlighted ? '#C1121F' : 'rgba(245, 245, 245, 0.22)'}
                    strokeWidth={isHighlighted ? '0.65' : '0.32'}
                    strokeDasharray="100"
                    strokeDashoffset={Math.round(
                      (1 - ecosystemState.connectionDrawProgress) * 100
                    )}
                    style={{ transition: 'stroke-dashoffset 240ms ease, stroke 200ms ease' }}
                  />
                );
              })}
            </svg>

            {/* Interactive Skill Nodes */}
            {activeDomain.nodes.map((node, nIdx) => {
              const isRevealed = nIdx < ecosystemState.nodeRevealCount;
              const isSelected = activeNode.id === node.id;

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  onMouseEnter={() => setSelectedNodeId(node.id)}
                  data-cursor-label="INSPECT"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: `translate(-50%, -50%) scale(${
                      isSelected ? 1.08 : isRevealed ? 1 : 0.85
                    })`,
                    opacity: isRevealed ? 1 : 0.35,
                    transition:
                      'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease',
                  }}
                  className={`absolute z-10 flex items-center gap-2.5 rounded-xl border px-3.5 py-2 text-left backdrop-blur-md ${
                    isSelected
                      ? 'border-[#C1121F] bg-[#C1121F] text-white shadow-[0_0_30px_rgba(193,18,31,0.45)]'
                      : 'border-white/[0.16] bg-[#0B0B0D]/90 text-[#F5F5F5] hover:border-white/50'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isSelected ? 'bg-white' : 'bg-[#C1121F]'
                    }`}
                  />
                  <span className="font-mono text-xs font-medium whitespace-nowrap">
                    {node.label}
                  </span>
                </button>
              );
            })}

            {/* Bottom Graph Telemetry Strip */}
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between font-mono text-[11px] text-[#D9D9D9]/65 tabular-nums">
              <span>DOMAIN {activeDomain.index} / 04 · {activeDomain.title}</span>
              <span>
                SYNAPSE LINK: {Math.round(ecosystemState.connectionDrawProgress * 100)}%
              </span>
            </div>
          </div>

          {/* Right 5 Columns: Selected Domain & Node Specification */}
          <div className="lg:col-span-5 space-y-6 rounded-2xl border border-white/[0.1] bg-[#050505]/90 p-7 sm:p-8 backdrop-blur-xl">
            <div className="space-y-2 border-b border-white/[0.08] pb-5">
              <div className="flex items-center justify-between font-mono text-xs text-[#C1121F] uppercase">
                <span>Domain {activeDomain.index} Architecture</span>
                <span>{activeDomain.signatureAnimation}</span>
              </div>
              <h3 className="font-serif text-3xl text-[#F5F5F5]">
                {activeDomain.title}
              </h3>
              <p className="text-xs text-[#D9D9D9]/70">{activeDomain.subtitle}</p>
            </div>

            <p className="text-sm leading-relaxed text-[#D9D9D9]/85">
              {activeDomain.architectureNote}
            </p>

            {/* Active Node Telemetry Box */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0B0B0D] p-5 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#C1121F] uppercase">Focused Node</span>
                <span className="text-[#F5F5F5] tabular-nums">
                  {activeNode.proficiency}
                </span>
              </div>
              <div className="font-serif text-2xl text-[#F5F5F5]">
                {activeNode.label}
              </div>
              <p className="font-mono text-[11px] text-[#D9D9D9]/60">
                COORDINATES: X:{activeNode.x}% · Y:{activeNode.y}% · ACTIVE IN PRODUCTION
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Progress Indicator */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-xs text-[#D9D9D9]/60">
          <span>SCROLL OR SELECT A NODE TO INSPECT TECHNICAL TOPOLOGY</span>
          <span className="tabular-nums text-[#F5F5F5]">
            ECOSYSTEM SCRUB: {Math.round(scrubProgress * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
};
