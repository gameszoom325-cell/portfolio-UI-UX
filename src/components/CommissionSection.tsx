import React, { useEffect, useState } from 'react';
import { FileCheck2, Send } from 'lucide-react';
import {
  validateCommissionForm,
  type CommissionFormInput,
} from '../utils/portfolioLogic';
import { MagneticButton } from './MagneticButton';

interface CommissionSectionProps {
  prefilledSubject?: { title: string; discipline: string } | null;
}

const DISCIPLINES = [
  'Horology & Industrial',
  'Spatial Architecture',
  'Moving Image',
  'Acoustic Systems',
];

const TIMELINES = ['Q3 / Q4 2026', 'Winter 2026 – 2027', 'Multi-Year Permanent'];

const ALLOCATIONS = ['$150k – $300k', '$300k – $750k', '$750k+ Institutional'];

export const CommissionSection: React.FC<CommissionSectionProps> = ({
  prefilledSubject,
}) => {
  const [form, setForm] = useState<CommissionFormInput>({
    clientName: '',
    organization: '',
    email: '',
    discipline: 'Spatial Architecture',
    timeline: 'Q3 / Q4 2026',
    allocationTier: '$300k – $750k',
    projectBrief: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CommissionFormInput, string>>
  >({});
  const [submittedDossier, setSubmittedDossier] = useState<{
    reference: string;
    clientName: string;
    discipline: string;
    timeline: string;
    allocationTier: string;
  } | null>(null);

  useEffect(() => {
    if (prefilledSubject) {
      setForm((prev) => ({
        ...prev,
        discipline: prefilledSubject.discipline,
        projectBrief: `Inquiring regarding a bespoke commission aligned with Monograph "${prefilledSubject.title}". Scope involves `,
      }));
      setSubmittedDossier(null);
    }
  }, [prefilledSubject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCommissionForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedDossier({
      reference: validation.dossierReference || 'VA-2026-1001',
      clientName: form.clientName.trim(),
      discipline: form.discipline,
      timeline: form.timeline,
      allocationTier: form.allocationTier,
    });
  };

  return (
    <section
      id="commission"
      className="relative z-10 flex min-h-screen w-full items-center border-t border-white/[0.08] bg-[#050505] py-24"
    >
      {/* Animated Final Scene Spotlight Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="animate-light-sweep absolute -top-1/4 right-1/4 h-[110vh] w-[45vw] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(193,18,31,0.16) 0%, rgba(255,255,255,0.03) 45%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          {/* Left 5 Columns: Monumental Final Scene Typography */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="font-mono text-xs tracking-[0.2em] text-[#C1121F] uppercase">
                Scene 06 · Final Act & Private Commissions
              </p>
              <h2
                className="font-serif text-[clamp(2.5rem,4.5vw,4.25rem)] font-normal leading-[1.06] tracking-tight text-[#F5F5F5]"
                style={{ textWrap: 'balance' }}
              >
                Initiate a New Studio <span className="italic text-[#C1121F]">Dossier.</span>
              </h2>
            </div>

            <p className="text-base leading-relaxed text-[#D9D9D9]/80">
              Atelier Vance accepts four major commissions per calendar year across
              spatial architecture, mechanical horology, and moving image direction.
              Direct inquiries are reviewed personally by our founding principals in
              Geneva and Zürich.
            </p>

            <div className="space-y-4 border-t border-white/[0.08] pt-6 font-mono text-xs text-[#D9D9D9]/75">
              <div>
                <span className="text-[#C1121F] uppercase">Geneva Showroom</span>
                <p className="mt-1 text-[#F5F5F5]">
                  Rue du Rhône 42, 1204 Genève, Switzerland
                </p>
              </div>
              <div>
                <span className="text-[#C1121F] uppercase">Zürich Fabrication Lab</span>
                <p className="mt-1 text-[#F5F5F5]">
                  Limmatstrasse 214, 8005 Zürich, Switzerland
                </p>
              </div>
              <div>
                <span className="text-[#C1121F] uppercase">Direct Dispatch</span>
                <p className="mt-1 text-[#F5F5F5]">directorate@ateliervance.ch</p>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Commission Configurator & Dossier Form */}
          <div className="lg:col-span-7">
            {submittedDossier ? (
              <div
                data-testid="commission-confirmation"
                className="rounded-2xl border border-[#C1121F]/60 bg-[#0B0B0D] p-8 sm:p-12 space-y-8 shadow-[0_30px_90px_rgba(193,18,31,0.18)]"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                  <div className="flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-[#C1121F] uppercase">
                    <FileCheck2 className="h-5 w-5" />
                    <span>Commission Dossier Registered</span>
                  </div>
                  <span className="font-mono text-xs text-[#F5F5F5] tabular-nums">
                    REF: {submittedDossier.reference}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-3xl text-[#F5F5F5]">
                    Thank you, {submittedDossier.clientName}.
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-[#D9D9D9]/85">
                    Your commission brief has been logged into the Atelier Vance
                    archival queue. A senior partner will transmit an encrypted
                    feasibility memorandum within 48 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 rounded-xl border border-white/[0.08] bg-[#050505] p-6 sm:grid-cols-3 font-mono text-xs">
                  <div>
                    <span className="text-[#D9D9D9]/55 uppercase">Discipline</span>
                    <p className="mt-1 text-[#F5F5F5]">{submittedDossier.discipline}</p>
                  </div>
                  <div>
                    <span className="text-[#D9D9D9]/55 uppercase">Target Horizon</span>
                    <p className="mt-1 text-[#F5F5F5]">{submittedDossier.timeline}</p>
                  </div>
                  <div>
                    <span className="text-[#D9D9D9]/55 uppercase">Allocation</span>
                    <p className="mt-1 text-[#C1121F] tabular-nums">
                      {submittedDossier.allocationTier}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedDossier(null)}
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] text-[#D9D9D9] uppercase hover:text-white underline underline-offset-4"
                >
                  Prepare Additional Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-white/[0.1] bg-[#0B0B0D]/90 p-8 sm:p-10 space-y-6 shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-xl"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="block font-mono text-xs tracking-[0.14em] text-[#D9D9D9]/80 uppercase mb-2"
                    >
                      Principal Name *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      value={form.clientName}
                      onChange={(e) =>
                        setForm({ ...form, clientName: e.target.value })
                      }
                      placeholder="e.g. Dr. Laurent Mercier"
                      className="w-full rounded-lg border border-white/[0.12] bg-[#050505] px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#D9D9D9]/35 focus:border-[#C1121F] focus:outline-none"
                    />
                    {errors.clientName && (
                      <p className="mt-1.5 font-mono text-xs text-[#C1121F]">
                        {errors.clientName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="client-org"
                      className="block font-mono text-xs tracking-[0.14em] text-[#D9D9D9]/80 uppercase mb-2"
                    >
                      Institution / Maison
                    </label>
                    <input
                      id="client-org"
                      type="text"
                      value={form.organization}
                      onChange={(e) =>
                        setForm({ ...form, organization: e.target.value })
                      }
                      placeholder="e.g. Kunsthalle Foundation"
                      className="w-full rounded-lg border border-white/[0.12] bg-[#050505] px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#D9D9D9]/35 focus:border-[#C1121F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="client-email"
                    className="block font-mono text-xs tracking-[0.14em] text-[#D9D9D9]/80 uppercase mb-2"
                  >
                    Official Email Address *
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="l.mercier@institution.ch"
                    className="w-full rounded-lg border border-white/[0.12] bg-[#050505] px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#D9D9D9]/35 focus:border-[#C1121F] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1.5 font-mono text-xs text-[#C1121F]">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Primary Discipline Selector */}
                <div>
                  <span className="block font-mono text-xs tracking-[0.14em] text-[#D9D9D9]/80 uppercase mb-2">
                    Commission Discipline
                  </span>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {DISCIPLINES.map((disc) => {
                      const active = form.discipline === disc;
                      return (
                        <button
                          key={disc}
                          type="button"
                          onClick={() => setForm({ ...form, discipline: disc })}
                          className={`rounded-lg border px-3 py-2.5 text-xs font-medium whitespace-nowrap truncate transition-colors ${
                            active
                              ? 'border-[#C1121F] bg-[#C1121F] text-white'
                              : 'border-white/[0.1] bg-[#050505] text-[#D9D9D9]/75 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {disc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline & Allocation Row */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="timeline-select"
                      className="block font-mono text-xs tracking-[0.14em] text-[#D9D9D9]/80 uppercase mb-2"
                    >
                      Exhibition / Delivery Horizon
                    </label>
                    <select
                      id="timeline-select"
                      value={form.timeline}
                      onChange={(e) =>
                        setForm({ ...form, timeline: e.target.value })
                      }
                      className="w-full rounded-lg border border-white/[0.12] bg-[#050505] px-4 py-3 text-sm text-[#F5F5F5] focus:border-[#C1121F] focus:outline-none"
                    >
                      {TIMELINES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="allocation-select"
                      className="block font-mono text-xs tracking-[0.14em] text-[#D9D9D9]/80 uppercase mb-2"
                    >
                      Capital Allocation Tier
                    </label>
                    <select
                      id="allocation-select"
                      value={form.allocationTier}
                      onChange={(e) =>
                        setForm({ ...form, allocationTier: e.target.value })
                      }
                      className="w-full rounded-lg border border-white/[0.12] bg-[#050505] px-4 py-3 text-sm text-[#F5F5F5] focus:border-[#C1121F] focus:outline-none"
                    >
                      {ALLOCATIONS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Architectural & Creative Brief */}
                <div>
                  <label
                    htmlFor="project-brief"
                    className="block font-mono text-xs tracking-[0.14em] text-[#D9D9D9]/80 uppercase mb-2"
                  >
                    Architectural & Creative Brief *
                  </label>
                  <textarea
                    id="project-brief"
                    rows={4}
                    value={form.projectBrief}
                    onChange={(e) =>
                      setForm({ ...form, projectBrief: e.target.value })
                    }
                    placeholder="Describe spatial dimensions, material requirements, or exhibition objectives..."
                    className="w-full rounded-lg border border-white/[0.12] bg-[#050505] px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#D9D9D9]/35 focus:border-[#C1121F] focus:outline-none"
                  />
                  {errors.projectBrief && (
                    <p className="mt-1.5 font-mono text-xs text-[#C1121F]">
                      {errors.projectBrief}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="font-mono text-[11px] text-[#D9D9D9]/55">
                    NDA Protection Active on Transmission
                  </span>

                  <MagneticButton
                    type="submit"
                    variant="primary"
                    cursorLabel="SUBMIT"
                  >
                    <span>Transmit Commission Dossier</span>
                    <Send className="h-3.5 w-3.5" />
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
