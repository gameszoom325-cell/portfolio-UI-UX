import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCardPhysics,
  computeMagneticOffset,
  filterProjects,
  computeCertificateStack,
  cycleCertificateId,
  validateCommissionForm,
  computeParagraphStaggerDelay,
  computeHeroScrubState,
  computeProjectShowcaseScrubState,
  computeCertificateGalleryScrubState,
  computeSkillsEcosystemScrubState,
  type ProjectItem,
  type CertificateItem,
} from './portfolioLogic';

const mockProjects: ProjectItem[] = [
  {
    id: 'chronos',
    catalogNumber: '01',
    title: 'Chronos Tourbillon',
    subtitle: 'Calibre IX Monolith',
    client: 'Vacheron & Vance',
    location: 'Geneva',
    year: '2026',
    discipline: 'Horology & Industrial',
    featuredSpan: 'wide',
    image: '/test1.jpg',
    fallbackGradient: 'from-neutral-900 to-black',
    aspectRatio: '16:9',
    summary: 'Bespoke titanium tourbillon movement and tactile exhibition case.',
    architecturalBrief: 'Brief',
    executionNarrative: 'Narrative',
    techStack: ['5-Axis CNC Titanium', 'Sapphire Optics', 'WebGL Shader'],
    links: [{ label: 'Inspect Monograph', action: 'monograph' }],
    materialsAndSpecs: ['Grade 5 Titanium'],
    deliverables: ['Industrial CAD'],
    exhibitionMetric: '18.4g Total Movement Mass',
    lightingNotes: {
      angle: '32 deg',
      kelvin: '3200K',
      lens: '90mm Macro',
      aperture: 'f/4.0',
    },
  },
  {
    id: 'pavilion',
    catalogNumber: '02',
    title: 'Obsidian Sanctuary',
    subtitle: 'Nocturnal Art Pavilion',
    client: 'Kunsthalle Basel Foundation',
    location: 'Basel',
    year: '2025',
    discipline: 'Spatial Architecture',
    featuredSpan: 'standard',
    image: '/test2.jpg',
    fallbackGradient: 'from-neutral-900 to-black',
    aspectRatio: '4:3',
    summary: 'Cast basalt concrete pavilion with crimson optical light chamber.',
    architecturalBrief: 'Brief',
    executionNarrative: 'Narrative',
    techStack: ['Cast Basalt', '640nm Photometry', 'Acoustic CAD'],
    links: [{ label: 'Inspect Monograph', action: 'monograph' }],
    materialsAndSpecs: ['Blackened Steel'],
    deliverables: ['Spatial Direction'],
    exhibitionMetric: '1,400 sqm Monolithic Span',
    lightingNotes: {
      angle: '14 deg',
      kelvin: '2700K',
      lens: '24mm Tilt-Shift',
      aperture: 'f/5.6',
    },
  },
];

const mockCertificates: CertificateItem[] = [
  {
    id: 'cert-1',
    archiveCode: 'ARC-01',
    title: 'Grand Prix d’Horlogerie Craft Fellowship',
    institution: 'Fondation de la Haute Horlogerie',
    location: 'Geneva, Switzerland',
    conferredDate: 'October 2025',
    verificationHash: 'FHH-8841-992A-VA',
    distinctionLevel: 'Summa Cum Laude · Jury Unanimous Citation',
    directorSignatory: 'Dr. Henri-Luc Moreau',
    citationSummary: 'Awarded for micro-mechanical industrial form.',
    technicalPillars: ['Micromechanics', 'Metallurgy'],
    accreditationBody: 'Swiss Federal Horological Registry',
  },
  {
    id: 'cert-2',
    archiveCode: 'ARC-02',
    title: 'Master of Computational Brutalism & Spatial Light',
    institution: 'ETH Zürich — Department of Architecture',
    location: 'Zürich, Switzerland',
    conferredDate: 'June 2024',
    verificationHash: 'ETHZ-4092-771C-VA',
    distinctionLevel: 'First Class Honours with Medal',
    directorSignatory: 'Prof. Katarina Lindqvist',
    citationSummary: 'Research in monolithic acoustic and optical concrete structures.',
    technicalPillars: ['Structural Computation', 'Architectural Acoustics'],
    accreditationBody: 'Swiss Accreditation Council',
  },
  {
    id: 'cert-3',
    archiveCode: 'ARC-03',
    title: 'Red Dot: Best of the Best — Industrial Systems',
    institution: 'Design Zentrum Nordrhein Westfalen',
    location: 'Essen, Germany',
    conferredDate: 'March 2026',
    verificationHash: 'RD-2026-1190-VA',
    distinctionLevel: 'Best of the Best Laureate',
    directorSignatory: 'Prof. Dr. Peter Zec',
    citationSummary: 'Supreme distinction for tactile anodized acoustic instruments.',
    technicalPillars: ['Tactile Ergonomics', 'CNC Anodized Finishing'],
    accreditationBody: 'Red Dot International Jury',
  },
];

test('computeHeroScrubState progresses cleanly through 0%, 25%, 50%, 75%, and 100% milestones and reverses accurately', () => {
  const start = computeHeroScrubState(0);
  assert.equal(start.firstNameProgress, 0);
  assert.equal(start.surnameProgress, 0);
  assert.equal(start.subtitleProgress, 0);

  const quarter = computeHeroScrubState(0.25);
  assert.ok(quarter.firstNameProgress > 0.6);
  assert.ok(quarter.surnameProgress < 0.1);

  const half = computeHeroScrubState(0.5);
  assert.equal(half.firstNameProgress, 1);
  assert.ok(half.surnameProgress > 0.7);

  const threeQuarters = computeHeroScrubState(0.8);
  assert.equal(threeQuarters.surnameProgress, 1);
  assert.equal(threeQuarters.subtitleProgress, 1);

  const end = computeHeroScrubState(1);
  assert.ok(end.exitScale < 1);
  assert.ok(end.exitOpacity < 1);
});

test('computeProjectShowcaseScrubState transitions sequentially through all full-viewport projects', () => {
  const p0 = computeProjectShowcaseScrubState(0, 4);
  assert.equal(p0.activeIndex, 0);
  assert.equal(p0.trackTranslatePercent, 0);
  assert.equal(p0.items[0].isFocused, true);

  const pMid = computeProjectShowcaseScrubState(1 / 3, 4);
  assert.equal(pMid.activeIndex, 1);
  assert.equal(pMid.items[1].isFocused, true);

  const pEnd = computeProjectShowcaseScrubState(1, 4);
  assert.equal(pEnd.activeIndex, 3);
  assert.equal(pEnd.trackTranslatePercent, -300);
  assert.equal(pEnd.items[3].isFocused, true);
});

test('computeCertificateGalleryScrubState and computeSkillsEcosystemScrubState track horizontal archive and skill domains', () => {
  const certMid = computeCertificateGalleryScrubState(0.5, 3);
  assert.equal(certMid.focusedIndex, 1);
  assert.equal(certMid.cards[1].isFocused, true);

  const skills0 = computeSkillsEcosystemScrubState(0.1, 4, 5);
  assert.equal(skills0.activeCategoryIndex, 0);

  const skillsLast = computeSkillsEcosystemScrubState(0.95, 4, 5);
  assert.equal(skillsLast.activeCategoryIndex, 3);
  assert.equal(skillsLast.nodeRevealCount, 5);
});

test('calculateCardPhysics returns zero tilt and centered glare when pointer is at center', () => {
  const physics = calculateCardPhysics(
    200,
    150,
    { left: 0, top: 0, width: 400, height: 300 },
    8,
    12
  );
  assert.equal(physics.rotateX, 0);
  assert.equal(physics.rotateY, 0);
  assert.equal(physics.glareX, 50);
  assert.equal(physics.glareY, 50);
  assert.equal(physics.parallaxX, 0);
  assert.equal(physics.parallaxY, 0);
});

test('calculateCardPhysics clamps out-of-bounds coordinates to physical limits', () => {
  const physics = calculateCardPhysics(
    900,
    -200,
    { left: 0, top: 0, width: 400, height: 300 },
    8,
    12
  );
  assert.equal(physics.rotateX, 8);
  assert.equal(physics.rotateY, 8);
  assert.equal(physics.glareX, 100);
  assert.equal(physics.glareY, 0);
  assert.equal(physics.parallaxX, -12);
  assert.equal(physics.parallaxY, 12);
});

test('computeMagneticOffset pulls within field and resets outside field', () => {
  const inside = computeMagneticOffset(120, 110, 100, 100, 100, 0.3);
  assert.equal(inside.isWithinField, true);
  assert.ok(inside.dx > 0);
  assert.ok(inside.dy > 0);

  const outside = computeMagneticOffset(300, 300, 100, 100, 100, 0.3);
  assert.equal(outside.isWithinField, false);
  assert.equal(outside.dx, 0);
  assert.equal(outside.dy, 0);
});

test('filterProjects filters accurately by discipline and search query', () => {
  const all = filterProjects(mockProjects, 'All Works');
  assert.equal(all.length, 2);

  const spatial = filterProjects(mockProjects, 'Spatial Architecture');
  assert.equal(spatial.length, 1);
  assert.equal(spatial[0].id, 'pavilion');

  const queried = filterProjects(mockProjects, 'All Works', 'Geneva');
  assert.equal(queried.length, 1);
  assert.equal(queried[0].id, 'chronos');
});

test('computeCertificateStack and cycleCertificateId manage luxury archive order', () => {
  const stack = computeCertificateStack(mockCertificates, 'cert-2');
  const frontCard = stack.find((c) => c.id === 'cert-2');
  assert.ok(frontCard);
  assert.equal(frontCard.isFront, true);
  assert.equal(frontCard.stackIndex, 0);
  assert.equal(frontCard.scale, 1);

  const nextId = cycleCertificateId(mockCertificates, 'cert-2', 'next');
  assert.equal(nextId, 'cert-3');

  const wrappedId = cycleCertificateId(mockCertificates, 'cert-3', 'next');
  assert.equal(wrappedId, 'cert-1');
});

test('validateCommissionForm rejects invalid inputs and issues deterministic reference on valid input', () => {
  const invalid = validateCommissionForm({
    clientName: 'A',
    organization: 'Test',
    email: 'invalid-email',
    discipline: 'Spatial Architecture',
    timeline: 'Q3 2026',
    allocationTier: '$150k – $300k',
    projectBrief: 'Too short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.clientName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.projectBrief);
  assert.equal(invalid.dossierReference, null);

  const valid = validateCommissionForm({
    clientName: 'Julian Vance',
    organization: 'Fondation Beyeler',
    email: 'j.vance@beyeler.ch',
    discipline: 'Spatial Architecture',
    timeline: 'Autumn 2026',
    allocationTier: '$250k – $500k',
    projectBrief:
      'Commissioning a permanent subterranean basalt exhibition hall with custom acoustic dampening.',
  });
  assert.equal(valid.valid, true);
  assert.ok(valid.dossierReference?.startsWith('VA-2026-'));
});

test('computeParagraphStaggerDelay increments sequentially and clamps at maximum delay', () => {
  assert.equal(computeParagraphStaggerDelay(0, 120, 85, 750), 120);
  assert.equal(computeParagraphStaggerDelay(1, 120, 85, 750), 205);
  assert.equal(computeParagraphStaggerDelay(2, 120, 85, 750), 290);
  assert.equal(computeParagraphStaggerDelay(20, 120, 85, 750), 750);
});
