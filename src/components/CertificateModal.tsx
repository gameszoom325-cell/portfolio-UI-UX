import React, { useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { CertificateItem } from '../utils/portfolioLogic';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  useEffect(() => {
    if (!certificate) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Glass Overlay Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050505]/85 backdrop-blur-xl"
      />

      {/* Luxury Archival Charter Dialog */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.16] bg-[#0B0B0D]/95 p-6 sm:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
        {/* Subtle Crimson Spotlight Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#C1121F]/15 blur-3xl"
        />

        <div className="relative z-10 space-y-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-[#C1121F] uppercase">
              <ShieldCheck className="h-4 w-4" />
              <span>{certificate.archiveCode} · Verified Institutional Record</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close certificate overlay"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.15] bg-[#111111] text-[#F5F5F5] transition-colors hover:border-[#C1121F] hover:bg-[#C1121F]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Charter Main Heading */}
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.14em] text-[#D9D9D9]/70 uppercase">
              {certificate.institution} · {certificate.location}
            </p>
            <h2
              id="certificate-modal-title"
              className="font-serif text-3xl sm:text-4xl font-normal text-[#F5F5F5]"
            >
              {certificate.title}
            </h2>
            <p className="font-mono text-xs text-[#C1121F]">
              {certificate.distinctionLevel}
            </p>
          </div>

          {/* Citation Prose */}
          <div className="rounded-xl border border-white/[0.08] bg-[#050505]/80 p-6 space-y-3">
            <p className="font-mono text-[11px] tracking-[0.15em] text-[#D9D9D9]/60 uppercase">
              Official Jury & Academic Citation
            </p>
            <p className="font-serif text-lg sm:text-xl italic leading-relaxed text-[#F5F5F5]">
              “{certificate.citationSummary}”
            </p>
          </div>

          {/* Technical Pillars */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs tracking-[0.16em] text-[#D9D9D9]/70 uppercase">
              Evaluated Domains & Mastered Competencies
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {certificate.technicalPillars.map((pillar) => (
                <div
                  key={pillar}
                  className="rounded-lg border border-white/[0.08] bg-[#111111] p-4 text-xs leading-relaxed text-[#F5F5F5]"
                >
                  <CheckCircle2 className="mb-2 h-4 w-4 text-[#C1121F]" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signatory & Verification Hash Footer */}
          <div className="grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-2 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-[#D9D9D9]/55 uppercase">Conferring Signatory</span>
              <p className="text-[#F5F5F5]">{certificate.directorSignatory}</p>
              <p className="text-[#D9D9D9]/65">{certificate.accreditationBody}</p>
            </div>
            <div className="space-y-1 sm:text-right">
              <span className="text-[#D9D9D9]/55 uppercase">Cryptographic Registry Hash</span>
              <p className="text-[#C1121F] tabular-nums">{certificate.verificationHash}</p>
              <p className="text-[#D9D9D9]/65 tabular-nums">Conferred {certificate.conferredDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
