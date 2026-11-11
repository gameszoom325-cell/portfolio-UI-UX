import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#050505] py-16">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 px-6 sm:flex-row sm:items-center sm:px-12 lg:px-16">
        <div className="space-y-2">
          <p className="font-serif text-xl font-semibold tracking-[0.18em] text-[#F5F5F5] uppercase">
            Atelier Vance
          </p>
          <p className="font-mono text-xs text-[#D9D9D9]/60">
            © 2026 Atelier Vance S.A. · Geneva · Zürich · Kyoto. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-7 font-mono text-xs tracking-[0.14em] text-[#D9D9D9]/75 uppercase">
          <a href="#about" className="hover:text-white transition-colors">
            Story
          </a>
          <a href="#works" className="hover:text-white transition-colors">
            Showcase
          </a>
          <a href="#archive" className="hover:text-white transition-colors">
            Certificates
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            Ecosystem
          </a>
          <a href="#commission" className="hover:text-white transition-colors">
            Contact
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            data-cursor-label="TOP"
            aria-label="Return to top of showroom"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-[#0B0B0D] px-3.5 py-2 text-[#F5F5F5] transition-colors hover:border-[#C1121F] hover:text-white"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5 text-[#C1121F]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
