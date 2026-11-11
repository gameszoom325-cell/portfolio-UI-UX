/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS_DATA } from './data/portfolioData';
import {
  computeParagraphStaggerDelay,
  type ProjectItem,
  type CertificateItem,
} from './utils/portfolioLogic';
import { AmbientBackground } from './components/AmbientBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { CertificatesArchive } from './components/CertificatesArchive';
import { CertificateModal } from './components/CertificateModal';
import { SkillsEcosystemSection } from './components/SkillsEcosystemSection';
import { CommissionSection } from './components/CommissionSection';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateItem | null>(null);
  const [commissionPrefill, setCommissionPrefill] = useState<{
    title: string;
    discipline: string;
  } | null>(null);
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      setGlobalScrollProgress(window.scrollY / maxScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const applyParagraphStagger = () => {
      const containers = document.querySelectorAll(
        'section, footer, [role="dialog"]'
      );
      containers.forEach((container) => {
        const paragraphs = container.querySelectorAll('p');
        paragraphs.forEach((p, idx) => {
          const idxStr = String(idx);
          if (p.getAttribute('data-stagger-index') !== idxStr) {
            const delay = computeParagraphStaggerDelay(idx, 120, 85, 750);
            p.style.setProperty('--p-stagger-delay', `${delay}ms`);
            p.setAttribute('data-stagger-index', idxStr);
            p.classList.add('animate-paragraph-entrance');
          }
        });
      });
    };

    applyParagraphStagger();

    const observer = new MutationObserver(() => {
      applyParagraphStagger();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS_DATA.findIndex(
      (p) => p.id === selectedProject.id
    );
    const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
    setSelectedProject(PROJECTS_DATA[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS_DATA.findIndex(
      (p) => p.id === selectedProject.id
    );
    const prevIndex =
      (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    setSelectedProject(PROJECTS_DATA[prevIndex]);
  };

  const handleInquireFromProject = (title: string, discipline: string) => {
    setSelectedProject(null);
    setCommissionPrefill({ title, discipline });
    setTimeout(() => {
      scrollToSection('commission');
    }, 80);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#C1121F] selection:text-white">
      {/* Living Ambient Background & Film Grain */}
      <AmbientBackground />

      {/* Desktop Context-Aware Magnetic Cursor */}
      <CustomCursor />

      {/* Strict 3-Zone Glass Navigation Header with Scroll Progress Hairline */}
      <Navbar
        onOpenCommission={() => scrollToSection('commission')}
        scrollProgress={globalScrollProgress}
      />

      {/* Full-Screen Scroll-Driven Storytelling Scenes */}
      <main className="relative z-10">
        {/* SCENE 01: 100vh Pinned Hero Opening */}
        <HeroSection
          onExploreWorks={() => scrollToSection('works')}
          onInspectArchive={() => scrollToSection('archive')}
        />

        {/* SCENE 02: 100vh Pinned About & Storytelling Scene */}
        <PhilosophySection />

        {/* SCENE 03: 100vh Pinned Full-Viewport Project Showcase */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          onCommissionProject={handleInquireFromProject}
        />

        {/* SCENE 04: 100vh Pinned Horizontal Luxury Certificate Vault */}
        <CertificatesArchive
          onInspectCertificate={(cert) => setSelectedCertificate(cert)}
        />

        {/* SCENE 05: 100vh Pinned Interactive Technical Ecosystem */}
        <SkillsEcosystemSection />

        {/* SCENE 06: 100vh Final Contact & Commission Dossier Scene */}
        <CommissionSection prefilledSubject={commissionPrefill} />
      </main>

      {/* Quiet Editorial Footer */}
      <Footer />

      {/* Selected Project Glass Case Study Overlay */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
        onInquireProject={handleInquireFromProject}
      />

      {/* Selected Certificate Glass Charter Overlay */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}
