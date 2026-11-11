import React, { useRef, useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import {
  calculateCardPhysics,
  type ProjectItem,
  type CardPhysicsResult,
} from '../utils/portfolioLogic';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  index: number;
}

const DEFAULT_PHYSICS: CardPhysicsResult = {
  rotateX: 0,
  rotateY: 0,
  glareX: 50,
  glareY: 50,
  sweepPosition: -30,
  parallaxX: 0,
  parallaxY: 0,
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  index,
}) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [physics, setPhysics] = useState<CardPhysicsResult>(DEFAULT_PHYSICS);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nextPhysics = calculateCardPhysics(e.clientX, e.clientY, rect, 7, 14);
    setPhysics(nextPhysics);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPhysics(DEFAULT_PHYSICS);
  };

  const isWide = project.featuredSpan === 'wide';

  return (
    <div
      className={`animate-subtle-float ${
        isWide ? 'lg:col-span-7' : 'lg:col-span-5'
      }`}
      style={{
        perspective: '1300px',
        animationDelay: `${index * 0.9}s`,
      }}
    >
      <button
        ref={cardRef}
        type="button"
        onClick={() => onSelect(project)}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor-label="VIEW"
        aria-label={`View case study ${project.title} for ${project.client}`}
        style={{
          transform: isHovered
            ? `rotateX(${physics.rotateX}deg) rotateY(${physics.rotateY}deg) translate3d(0, -4px, 12px)`
            : 'rotateX(0deg) rotateY(0deg) translate3d(0, 0px, 0px)',
          transition: isHovered
            ? 'transform 140ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease'
            : 'transform 550ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 550ms ease',
        }}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B0B0D] text-left shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] hover:border-white/[0.24] hover:shadow-[0_35px_90px_-15px_rgba(193,18,31,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1121F]"
      >
        {/* Visual Media Viewport with Parallax & Glass Highlight Sweep */}
        <div className="relative h-[320px] sm:h-[380px] w-full overflow-hidden bg-[#111111]">
          {!imgFailed ? (
            <img
              src={project.image}
              alt={`${project.title} — ${project.subtitle}`}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              style={{
                transform: isHovered
                  ? `scale(1.09) translate3d(${physics.parallaxX}px, ${physics.parallaxY}px, 0)`
                  : 'scale(1.03) translate3d(0px, 0px, 0)',
                transition: isHovered
                  ? 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div
              className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${project.fallbackGradient} p-8 text-center`}
            >
              <Layers className="mb-3 h-8 w-8 text-[#C1121F]" />
              <span className="font-serif text-xl text-[#F5F5F5]">
                {project.title}
              </span>
            </div>
          )}

          {/* Measured Contrast Scrim */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/30 to-transparent" />

          {/* Cursor-Following Specular Radial Light Reflection */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(380px circle at ${physics.glareX}% ${physics.glareY}%, rgba(255, 255, 255, 0.16), rgba(193, 18, 31, 0.1) 40%, transparent 72%)`,
            }}
          />

          {/* Diagonal Glass Highlight Sweep */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.85 : 0,
              background: `linear-gradient(115deg, transparent ${
                physics.sweepPosition - 18
              }%, rgba(255, 255, 255, 0.14) ${
                physics.sweepPosition
              }%, rgba(193, 18, 31, 0.08) ${
                physics.sweepPosition + 8
              }%, transparent ${physics.sweepPosition + 24}%)`,
            }}
          />

          {/* Top Archival Index Line (Unboxed text, no pill) */}
          <div className="absolute top-5 left-6 right-6 flex items-center justify-between text-xs font-mono tracking-[0.16em] text-[#F5F5F5]/85">
            <span>
              {project.catalogNumber}. {project.discipline}
            </span>
            <span className="tabular-nums text-[#D9D9D9]/75">{project.year}</span>
          </div>
        </div>

        {/* Physical Card Plinth / Editorial Copy */}
        <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div className="space-y-3">
            {/* Unboxed Metadata Line with Typographic Separators */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-[#D9D9D9]/65 uppercase">
              <span>{project.client}</span>
              <span aria-hidden="true" className="text-[#C1121F]">
                ·
              </span>
              <span>{project.location}</span>
              <span aria-hidden="true" className="text-[#C1121F]">
                ·
              </span>
              <span className="tabular-nums">{project.exhibitionMetric}</span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="mt-0.5 text-xs font-medium tracking-[0.06em] text-[#C1121F] uppercase">
                  {project.subtitle}
                </p>
              </div>

              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-[#111111] text-[#F5F5F5] transition-all duration-200 group-hover:border-[#C1121F] group-hover:bg-[#C1121F] group-hover:text-white">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>

            <p className="pt-1 text-sm leading-relaxed text-[#D9D9D9]/80 max-w-[65ch]">
              {project.summary}
            </p>
          </div>

          {/* Bottom Hairline Optical Spec */}
          <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4 font-mono text-[11px] text-[#D9D9D9]/60 tabular-nums">
            <span>
              OPTICS: {project.lightingNotes.lens} · {project.lightingNotes.aperture}
            </span>
            <span className="text-[#F5F5F5] group-hover:text-[#C1121F] transition-colors uppercase tracking-[0.14em]">
              Inspect Dossier
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};
