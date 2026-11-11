import React, { useEffect, useState } from 'react';
import { X, ArrowLeft, ArrowRight, Check, Aperture } from 'lucide-react';
import type { ProjectItem } from '../utils/portfolioLogic';
import { MagneticButton } from './MagneticButton';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onInquireProject: (projectTitle: string, discipline: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNext,
  onPrev,
  onInquireProject,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'specifications'>('architecture');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
    setActiveTab('architecture');
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onNext, onPrev]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10"
    >
      {/* Glassmorphic Backdrop (Allowed on selected project overlays & dialogs) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050505]/85 backdrop-blur-xl transition-opacity"
      />

      {/* Dialog Container */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/[0.14] bg-[#0B0B0D]/95 shadow-[0_40px_120px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
        {/* Top Modal Header Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-[#D9D9D9]/80 uppercase">
            <span className="text-[#C1121F]">Monograph {project.catalogNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{project.discipline}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{project.year}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous project monograph"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-[#111111] text-[#D9D9D9] transition-colors hover:border-white/30 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next project monograph"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-[#111111] text-[#D9D9D9] transition-colors hover:border-white/30 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project monograph"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.15] bg-[#C1121F] text-white transition-colors hover:bg-[#a30f1a]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-8">
          {/* High-Resolution Hero Frame */}
          <div className="relative h-[280px] sm:h-[400px] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#050505]">
            {!imgError ? (
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#111111]">
                <span className="font-serif text-2xl text-[#F5F5F5]">
                  {project.title}
                </span>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent" />

            {/* Floating Glass Optical Telemetry Strip */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/[0.1] bg-[#050505]/80 px-4 py-2.5 backdrop-blur-md font-mono text-[11px] text-[#D9D9D9] tabular-nums">
              <div className="flex items-center gap-2">
                <Aperture className="h-3.5 w-3.5 text-[#C1121F]" />
                <span>ILLUMINATION: {project.lightingNotes.angle}</span>
              </div>
              <span>COLOR TEMP: {project.lightingNotes.kelvin}</span>
              <span>OPTICS: {project.lightingNotes.lens} ({project.lightingNotes.aperture})</span>
            </div>
          </div>

          {/* Title & Metadata Lead */}
          <div className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#D9D9D9]/70">
                <span>Client: {project.client}</span>
                <span aria-hidden="true">·</span>
                <span>Location: {project.location}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#C1121F] tabular-nums">{project.exhibitionMetric}</span>
              </div>
              <h2
                id="project-modal-title"
                className="font-serif text-3xl sm:text-4xl font-normal text-[#F5F5F5]"
              >
                {project.title} — <span className="italic text-[#D9D9D9]">{project.subtitle}</span>
              </h2>
            </div>

            {/* Interactive View Switcher */}
            <div className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#111111] p-1 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('architecture')}
                className={`rounded-md px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  activeTab === 'architecture'
                    ? 'bg-[#C1121F] text-white'
                    : 'text-[#D9D9D9]/70 hover:text-white'
                }`}
              >
                Editorial Narrative
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('specifications')}
                className={`rounded-md px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  activeTab === 'specifications'
                    ? 'bg-[#C1121F] text-white'
                    : 'text-[#D9D9D9]/70 hover:text-white'
                }`}
              >
                Materials & Deliverables
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'architecture' ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-mono text-xs tracking-[0.16em] text-[#C1121F] uppercase">
                  01. Architectural & Creative Brief
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#D9D9D9]/90">
                  {project.architecturalBrief}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-mono text-xs tracking-[0.16em] text-[#C1121F] uppercase">
                  02. Execution & Fabrication
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#D9D9D9]/90">
                  {project.executionNarrative}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-mono text-xs tracking-[0.16em] text-[#C1121F] uppercase">
                  Material Metallurgy & Tectonics
                </h3>
                <ul className="space-y-2.5">
                  {project.materialsAndSpecs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-3 text-sm text-[#F5F5F5]"
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#C1121F]" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-mono text-xs tracking-[0.16em] text-[#C1121F] uppercase">
                  Commission Deliverables
                </h3>
                <ul className="space-y-2.5">
                  {project.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-[#F5F5F5]"
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#C1121F]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
            <p className="font-mono text-xs text-[#D9D9D9]/65">
              Archival Reference: VA-{project.year}-{project.catalogNumber}
            </p>
            <MagneticButton
              onClick={() => onInquireProject(project.title, project.discipline)}
              variant="primary"
              cursorLabel="INQUIRE"
            >
              Commission Similar Scope
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
};
