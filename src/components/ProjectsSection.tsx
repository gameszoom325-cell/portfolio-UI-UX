import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import {
  DISCIPLINE_CATEGORIES,
  PROJECTS_DATA,
} from '../data/portfolioData';
import {
  calculateCardPhysics,
  computeProjectShowcaseScrubState,
  filterProjects,
  type CardPhysicsResult,
  type DisciplineCategory,
  type ProjectItem,
} from '../utils/portfolioLogic';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onCommissionProject?: (title: string, discipline: string) => void;
}

const DEFAULT_PHYSICS: CardPhysicsResult = {
  rotateX: 0,
  rotateY: 0,
  glareX: 50,
  glareY: 50,
  sweepPosition: 40,
  parallaxX: 0,
  parallaxY: 0,
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onCommissionProject,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [selectedDiscipline, setSelectedDiscipline] =
    useState<DisciplineCategory>('All Works');
  const [scrubProgress, setScrubProgress] = useState(0);
  const [physics, setPhysics] = useState<CardPhysicsResult>(DEFAULT_PHYSICS);
  const [isHoveringStage, setIsHoveringStage] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filteredProjects = filterProjects(PROJECTS_DATA, selectedDiscipline);
  const totalProjects = filteredProjects.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || totalProjects <= 1) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: () => `+=${totalProjects * 95}%`,
      pin: true,
      scrub: 0.75,
      onUpdate: (self) => {
        setScrubProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [totalProjects]);

  const stageState = computeProjectShowcaseScrubState(
    scrubProgress,
    totalProjects
  );
  const activeProject =
    filteredProjects[stageState.activeIndex] || filteredProjects[0];

  const jumpToProjectIndex = (idx: number) => {
    if (totalProjects <= 1) {
      setScrubProgress(0);
      return;
    }
    setScrubProgress(idx / (totalProjects - 1));
  };

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    setPhysics(calculateCardPhysics(e.clientX, e.clientY, rect, 6.5, 18));
  };

  const handleStageMouseLeave = () => {
    setIsHoveringStage(false);
    setPhysics(DEFAULT_PHYSICS);
  };

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative z-10 flex h-screen w-full flex-col justify-between overflow-hidden border-t border-white/[0.08] bg-[#050505] pt-20 pb-8"
    >
      {/* Top Bar: Scene Header, Discipline Filter & Reel Scrubber */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs tracking-[0.2em] text-[#C1121F] uppercase">
              Scene 03 · Pinned Project Showcase
            </span>
            <span aria-hidden="true" className="text-white/20">
              |
            </span>
            <span className="font-mono text-xs text-[#D9D9D9]/70 tabular-nums">
              SHOWING {filteredProjects.length} OF {PROJECTS_DATA.length} ARCHIVAL MONOGRAPHS
            </span>
          </div>

          {/* Interactive Discipline Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter projects by studio discipline"
            className="flex flex-wrap lg:flex-nowrap items-center gap-1 rounded-xl border border-white/[0.08] bg-[#0B0B0D] p-1 shrink-0"
          >
            {DISCIPLINE_CATEGORIES.map((category) => {
              const isActive = selectedDiscipline === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => {
                    setSelectedDiscipline(category);
                    setScrubProgress(0);
                  }}
                  data-cursor-label="FILTER"
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-medium tracking-[0.05em] whitespace-nowrap shrink-0 transition-all duration-150 ${
                    isActive
                      ? 'bg-[#C1121F] text-white shadow-sm'
                      : 'text-[#D9D9D9]/75 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Full-Viewport Horizontal Scrub Stage */}
      <div
        ref={stageRef}
        onMouseMove={handleStageMouseMove}
        onMouseEnter={() => setIsHoveringStage(true)}
        onMouseLeave={handleStageMouseLeave}
        className="relative z-10 mx-auto flex flex-1 w-full max-w-[1440px] items-center overflow-hidden px-6 sm:px-12 lg:px-16"
        style={{ perspective: '1400px' }}
      >
        <div className="relative h-[70vh] max-h-[640px] w-full">
          {filteredProjects.map((project, index) => {
            const itemState = stageState.items[index] || {
              index,
              offsetFromActive: 0,
              translateXPercent: 0,
              imageParallaxPercent: 0,
              scale: 1,
              rotateYDeg: 0,
              detailsOpacity: 1,
              detailsTranslateXpx: 0,
              isFocused: true,
            };

            const isFocused = itemState.isFocused;
            const tiltX = isFocused && isHoveringStage ? physics.rotateX : 0;
            const tiltY =
              itemState.rotateYDeg +
              (isFocused && isHoveringStage ? physics.rotateY : 0);

            return (
              <article
                key={project.id}
                aria-hidden={!isFocused}
                style={{
                  transform: `translate3d(${itemState.translateXPercent}%, 0, 0) scale(${itemState.scale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                  opacity: Math.max(0, 1 - Math.abs(itemState.offsetFromActive) * 0.85),
                  zIndex: isFocused ? 20 : 10 - Math.abs(index - stageState.activeIndex),
                  pointerEvents: isFocused ? 'auto' : 'none',
                  transition:
                    'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease-out',
                }}
                className="absolute inset-0 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center"
              >
                {/* Left 7 Columns: Physical 3D Full-Stage Visual Frame */}
                <div className="relative h-[300px] sm:h-[420px] lg:h-full lg:col-span-7 overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0B0B0D] shadow-[0_40px_110px_-20px_rgba(0,0,0,0.95)]">
                  {!imgErrors[project.id] ? (
                    <img
                      src={project.image}
                      alt={`${project.title} — ${project.subtitle}`}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImgErrors((prev) => ({ ...prev, [project.id]: true }))
                      }
                      style={{
                        transform: `scale(1.12) translate3d(${
                          itemState.imageParallaxPercent +
                          (isFocused ? physics.parallaxX * 0.4 : 0)
                        }%, ${isFocused ? physics.parallaxY : 0}px, 0)`,
                        transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${project.fallbackGradient} p-8 text-center`}
                    >
                      <Layers className="mb-3 h-8 w-8 text-[#C1121F]" />
                      <span className="font-serif text-2xl text-[#F5F5F5]">
                        {project.title}
                      </span>
                    </div>
                  )}

                  {/* Measured Contrast Scrim */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/25 to-transparent" />

                  {/* Cursor Specular Light Reflection */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                    style={{
                      opacity: isFocused ? 0.9 : 0.2,
                      background: `radial-gradient(460px circle at ${physics.glareX}% ${physics.glareY}%, rgba(255, 255, 255, 0.16), rgba(193, 18, 31, 0.12) 40%, transparent 72%)`,
                    }}
                  />

                  {/* Diagonal Glass Highlight Sweep */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      opacity: isFocused && isHoveringStage ? 0.85 : 0.25,
                      background: `linear-gradient(115deg, transparent ${
                        physics.sweepPosition - 18
                      }%, rgba(255, 255, 255, 0.14) ${
                        physics.sweepPosition
                      }%, rgba(193, 18, 31, 0.08) ${
                        physics.sweepPosition + 8
                      }%, transparent ${physics.sweepPosition + 24}%)`,
                    }}
                  />

                  {/* Top Archival Overlay Index */}
                  <div className="absolute top-5 left-6 right-6 flex items-center justify-between font-mono text-xs tracking-[0.18em] text-[#F5F5F5] uppercase">
                    <span className="text-[#C1121F]">
                      PROJECT {project.catalogNumber} / 0{PROJECTS_DATA.length}
                    </span>
                    <span className="tabular-nums">
                      {project.location} · {project.year}
                    </span>
                  </div>

                  {/* Bottom Optical Spec Strip */}
                  <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between font-mono text-[11px] text-[#D9D9D9]/80 tabular-nums">
                    <span>
                      OPTICS: {project.lightingNotes.lens} · {project.lightingNotes.aperture}
                    </span>
                    <span>{project.exhibitionMetric}</span>
                  </div>
                </div>

                {/* Right 5 Columns: Side-Sliding Narrative, Tech Stack & Interactive Links */}
                <div
                  style={{
                    transform: `translate3d(${itemState.detailsTranslateXpx}px, 0, 0)`,
                    opacity: itemState.detailsOpacity,
                    transition:
                      'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease',
                  }}
                  className="lg:col-span-5 flex flex-col justify-between space-y-6 rounded-2xl border border-white/[0.1] bg-[#0B0B0D]/90 p-6 sm:p-8 backdrop-blur-xl"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs tracking-[0.14em] text-[#D9D9D9]/70 uppercase">
                      <span className="text-[#C1121F]">{project.discipline}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.client}</span>
                    </div>

                    <div>
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#F5F5F5]">
                        {project.title}
                      </h2>
                      <p className="mt-1 font-mono text-xs tracking-[0.08em] text-[#C1121F] uppercase">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base leading-relaxed text-[#D9D9D9]/85">
                      {project.summary}
                    </p>
                  </div>

                  {/* Technology & Fabrication Stack (Unboxed typographic list) */}
                  <div className="space-y-2 border-t border-white/[0.08] pt-4">
                    <p className="font-mono text-[11px] tracking-[0.16em] text-[#D9D9D9]/55 uppercase">
                      Technology & Fabrication Stack
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#F5F5F5]">
                      {project.techStack.map((tech, tIdx) => (
                        <React.Fragment key={tech}>
                          <span>{tech}</span>
                          {tIdx < project.techStack.length - 1 && (
                            <span aria-hidden="true" className="text-[#C1121F]">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Primary & Secondary Project Actions */}
                  <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.08] pt-5">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      data-cursor-label="VIEW"
                      aria-label={`View case study ${project.title} for ${project.client}`}
                      className="inline-flex items-center gap-2.5 rounded-lg border border-[#C1121F] bg-[#C1121F] px-5 py-3 font-mono text-xs font-medium tracking-[0.14em] text-white uppercase whitespace-nowrap shrink-0 transition-colors hover:bg-[#a30f1a]"
                    >
                      <span>Inspect Monograph</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>

                    {onCommissionProject && (
                      <button
                        type="button"
                        onClick={() =>
                          onCommissionProject(project.title, project.discipline)
                        }
                        data-cursor-label="INQUIRE"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-[#111111] px-4 py-3 font-mono text-xs tracking-[0.14em] text-[#F5F5F5] uppercase whitespace-nowrap shrink-0 transition-colors hover:border-white/50"
                      >
                        <span>Commission Scope</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Bottom Project Reel Scrubber & Direct Navigation Controls */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
          <div className="flex items-center gap-2">
            {filteredProjects.map((proj, idx) => {
              const isCurrent = idx === stageState.activeIndex;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => jumpToProjectIndex(idx)}
                  data-cursor-label="SELECT"
                  className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs transition-all whitespace-nowrap shrink-0 ${
                    isCurrent
                      ? 'border-[#C1121F] bg-[#C1121F]/20 text-white'
                      : 'border-white/[0.08] bg-[#0B0B0D] text-[#D9D9D9]/60 hover:text-white'
                  }`}
                >
                  <span className="text-[#C1121F] tabular-nums">
                    {proj.catalogNumber}
                  </span>
                  <span className="hidden sm:inline">{proj.title}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-[#D9D9D9]/60 uppercase">
              Active: {activeProject?.title}
            </span>
            <button
              type="button"
              onClick={() =>
                jumpToProjectIndex(Math.max(0, stageState.activeIndex - 1))
              }
              aria-label="Previous project in showcase"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.12] bg-[#0B0B0D] text-[#F5F5F5] hover:border-[#C1121F]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                jumpToProjectIndex(
                  Math.min(totalProjects - 1, stageState.activeIndex + 1)
                )
              }
              aria-label="Next project in showcase"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.12] bg-[#0B0B0D] text-[#F5F5F5] hover:border-[#C1121F]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
