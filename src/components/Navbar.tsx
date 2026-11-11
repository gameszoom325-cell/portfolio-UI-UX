import React from 'react';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  onOpenCommission: () => void;
  scrollProgress?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommission,
  scrollProgress = 0,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full border-b border-white/[0.08] bg-[#050505]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-6 py-3.5 sm:px-12 lg:px-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          data-cursor-label="OPENING"
          className="font-serif text-lg sm:text-xl font-semibold tracking-[0.18em] text-[#F5F5F5] uppercase whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1121F]"
        >
          Atelier Vance
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Showroom Navigation"
          className="hidden md:flex items-center gap-7 text-xs font-medium tracking-[0.14em] text-[#D9D9D9] uppercase"
        >
          <a
            href="#about"
            data-cursor-label="STORY"
            className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C1121F] after:transition-all after:duration-200 hover:after:w-full"
          >
            Story
          </a>
          <a
            href="#works"
            data-cursor-label="VIEW"
            className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C1121F] after:transition-all after:duration-200 hover:after:w-full"
          >
            Showcase
          </a>
          <a
            href="#archive"
            data-cursor-label="OPEN"
            className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C1121F] after:transition-all after:duration-200 hover:after:w-full"
          >
            Certificates
          </a>
          <a
            href="#skills"
            data-cursor-label="EXPLORE"
            className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C1121F] after:transition-all after:duration-200 hover:after:w-full"
          >
            Ecosystem
          </a>
          <a
            href="#commission"
            data-cursor-label="CONTACT"
            className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C1121F] after:transition-all after:duration-200 hover:after:w-full"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <MagneticButton
            href="#commission"
            onClick={onOpenCommission}
            variant="primary"
            cursorLabel="INQUIRE"
            className="px-5 py-2 text-[11px]"
          >
            Private Inquiry
          </MagneticButton>
        </div>
      </div>

      {/* Scroll-linked crimson timeline progress hairline */}
      <div className="h-[1.5px] w-full bg-white/[0.04]">
        <div
          className="h-full bg-[#C1121F] transition-transform duration-75 origin-left"
          style={{
            transform: `scaleX(${Math.max(0.02, Math.min(1, scrollProgress))})`,
          }}
        />
      </div>
    </header>
  );
};
