export type DisciplineCategory =
  | 'All Works'
  | 'Horology & Industrial'
  | 'Spatial Architecture'
  | 'Moving Image'
  | 'Acoustic Systems';

export type SkillDomainId = 'ai-ml' | 'web-dev' | 'programming' | 'tools';

export interface ProjectItem {
  id: string;
  catalogNumber: string;
  title: string;
  subtitle: string;
  client: string;
  location: string;
  year: string;
  discipline: Exclude<DisciplineCategory, 'All Works'>;
  featuredSpan: 'wide' | 'standard';
  image: string;
  fallbackGradient: string;
  aspectRatio: '16:9' | '4:3';
  summary: string;
  architecturalBrief: string;
  executionNarrative: string;
  techStack: string[];
  links: { label: string; action: 'monograph' | 'commission' }[];
  materialsAndSpecs: string[];
  deliverables: string[];
  exhibitionMetric: string;
  lightingNotes: {
    angle: string;
    kelvin: string;
    lens: string;
    aperture: string;
  };
}

export interface CertificateItem {
  id: string;
  archiveCode: string;
  title: string;
  institution: string;
  location: string;
  conferredDate: string;
  verificationHash: string;
  distinctionLevel: string;
  directorSignatory: string;
  citationSummary: string;
  technicalPillars: string[];
  accreditationBody: string;
}

export interface SkillDomain {
  id: SkillDomainId;
  index: string;
  title: string;
  subtitle: string;
  signatureAnimation: 'neural-pulse' | 'matrix-grid' | 'kinetic-orbit' | 'precision-axis';
  architectureNote: string;
  nodes: {
    id: string;
    label: string;
    proficiency: string;
    x: number;
    y: number;
  }[];
  connections: [number, number][];
}

export interface CardPhysicsResult {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
  sweepPosition: number;
  parallaxX: number;
  parallaxY: number;
}

export interface MagneticVector {
  dx: number;
  dy: number;
  isWithinField: boolean;
}

export interface StackCardTransform {
  id: string;
  stackIndex: number;
  zIndex: number;
  scale: number;
  translateY: number;
  translateX: number;
  rotateZ: number;
  opacity: number;
  isFront: boolean;
}

export interface CommissionFormInput {
  clientName: string;
  organization: string;
  email: string;
  discipline: string;
  timeline: string;
  allocationTier: string;
  projectBrief: string;
}

export interface CommissionValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof CommissionFormInput, string>>;
  dossierReference: string | null;
}

export interface HeroScrubState {
  progress: number;
  ambientLightOpacity: number;
  firstNameProgress: number;
  firstNameBlurPx: number;
  surnameProgress: number;
  surnameRotateX: number;
  subtitleProgress: number;
  exitScale: number;
  exitOpacity: number;
  phaseLabel: string;
}

export interface ProjectStageScrubState {
  activeIndex: number;
  trackTranslatePercent: number;
  items: {
    index: number;
    offsetFromActive: number;
    translateXPercent: number;
    imageParallaxPercent: number;
    scale: number;
    rotateYDeg: number;
    detailsOpacity: number;
    detailsTranslateXpx: number;
    isFocused: boolean;
  }[];
}

export interface CertificateGalleryScrubState {
  focusedIndex: number;
  trackTranslateXPercent: number;
  cards: {
    index: number;
    scale: number;
    opacity: number;
    spotlightIntensity: number;
    rotateYDeg: number;
    isFocused: boolean;
  }[];
}

export interface SkillsEcosystemScrubState {
  activeCategoryIndex: number;
  connectionDrawProgress: number;
  nodeRevealCount: number;
}

function clamp01(val: number): number {
  return Math.max(0, Math.min(1, val));
}

function mapRange(val: number, inMin: number, inMax: number): number {
  if (inMax <= inMin) return 0;
  return clamp01((val - inMin) / (inMax - inMin));
}

/**
 * Computes the Hero section's scroll-linked state across 0% -> 25% -> 50% -> 75% -> 100%.
 * Reversible at any scroll position.
 */
export function computeHeroScrubState(rawProgress: number): HeroScrubState {
  const p = clamp01(rawProgress);

  // 0% -> 25%: background wakes up, ambient light increases
  const ambientLightOpacity = Number((0.22 + mapRange(p, 0, 0.35) * 0.78).toFixed(3));

  // 0% -> 35%: first name reveals with blur-to-sharp
  const firstNameProgress = Number(mapRange(p, 0.04, 0.36).toFixed(3));
  const firstNameBlurPx = Number(((1 - firstNameProgress) * 10).toFixed(2));

  // 25% -> 60%: surname reveals with 3D perspective tilt
  const surnameProgress = Number(mapRange(p, 0.24, 0.58).toFixed(3));
  const surnameRotateX = Number(((1 - surnameProgress) * 28).toFixed(2));

  // 50% -> 82%: subtitle and magnetic CTA buttons appear
  const subtitleProgress = Number(mapRange(p, 0.48, 0.80).toFixed(3));

  // 85% -> 100%: cinematic depth transition into next scene
  const exitProgress = mapRange(p, 0.86, 1.0);
  const exitScale = Number((1 - exitProgress * 0.07).toFixed(3));
  const exitOpacity = Number((1 - exitProgress * 0.55).toFixed(3));

  let phaseLabel = '0% · AMBIENT AWAKENING';
  if (p >= 0.85) {
    phaseLabel = '100% · SCENE TRANSITION';
  } else if (p >= 0.55) {
    phaseLabel = '75% · DIRECTORATE & CONTROLS';
  } else if (p >= 0.28) {
    phaseLabel = '50% · MONOLITH IDENTITY';
  } else if (p >= 0.08) {
    phaseLabel = '25% · PRIMARY REVEAL';
  }

  return {
    progress: p,
    ambientLightOpacity,
    firstNameProgress,
    firstNameBlurPx,
    surnameProgress,
    surnameRotateX,
    subtitleProgress,
    exitScale,
    exitOpacity,
    phaseLabel,
  };
}

/**
 * Computes the pinned full-viewport Project Showcase scrub state.
 * Scroll drives Project 1 -> Project 2 -> Project 3 -> Project 4 with reversible parallax & 3D depth.
 */
export function computeProjectShowcaseScrubState(
  rawProgress: number,
  totalProjects: number
): ProjectStageScrubState {
  const count = Math.max(1, totalProjects);
  const p = clamp01(rawProgress);
  const continuousIndex = p * (count - 1);
  const activeIndex = Math.min(count - 1, Math.max(0, Math.round(continuousIndex)));
  const trackTranslatePercent = Number((-continuousIndex * 100).toFixed(2));

  const items = Array.from({ length: count }, (_, index) => {
    const offset = index - continuousIndex; // 0 when centered, +1 when entering from right, -1 when exiting left
    const absOffset = Math.abs(offset);

    const scale = Number(Math.max(0.82, 1 - absOffset * 0.14).toFixed(3));
    const rotateYDeg = Number(Math.max(-22, Math.min(22, -offset * 14)).toFixed(2));
    const imageParallaxPercent = Number(Math.max(-24, Math.min(24, offset * 18)).toFixed(2));
    const detailsOpacity = Number(clamp01(1 - absOffset * 1.45).toFixed(3));
    const detailsTranslateXpx = Number((offset * 64).toFixed(1));

    return {
      index,
      offsetFromActive: Number(offset.toFixed(3)),
      translateXPercent: Number((offset * 100).toFixed(2)),
      imageParallaxPercent,
      scale,
      rotateYDeg,
      detailsOpacity,
      detailsTranslateXpx,
      isFocused: index === activeIndex,
    };
  });

  return {
    activeIndex,
    trackTranslatePercent,
    items,
  };
}

/**
 * Computes the horizontal luxury Certificate Archive scroll state.
 */
export function computeCertificateGalleryScrubState(
  rawProgress: number,
  totalCerts: number
): CertificateGalleryScrubState {
  const count = Math.max(1, totalCerts);
  const p = clamp01(rawProgress);
  const continuousIndex = p * (count - 1);
  const focusedIndex = Math.min(count - 1, Math.max(0, Math.round(continuousIndex)));
  const trackTranslateXPercent = Number((-continuousIndex * 100).toFixed(2));

  const cards = Array.from({ length: count }, (_, index) => {
    const delta = index - continuousIndex;
    const distance = Math.abs(delta);
    const scale = Number(Math.max(0.84, 1.02 - distance * 0.14).toFixed(3));
    const opacity = Number(Math.max(0.28, 1 - distance * 0.45).toFixed(3));
    const spotlightIntensity = Number(clamp01(1 - distance * 0.85).toFixed(3));
    const rotateYDeg = Number(Math.max(-18, Math.min(18, -delta * 10)).toFixed(2));

    return {
      index,
      scale,
      opacity,
      spotlightIntensity,
      rotateYDeg,
      isFocused: index === focusedIndex,
    };
  });

  return {
    focusedIndex,
    trackTranslateXPercent,
    cards,
  };
}

/**
 * Computes the progressive technical ecosystem state as the user scrolls through the Skills section.
 */
export function computeSkillsEcosystemScrubState(
  rawProgress: number,
  totalCategories = 4,
  nodesPerCategory = 5
): SkillsEcosystemScrubState {
  const p = clamp01(rawProgress);
  const catCount = Math.max(1, totalCategories);
  const activeCategoryIndex = Math.min(
    catCount - 1,
    Math.floor(p * catCount * 0.999)
  );
  const localCatProgress = (p * catCount) - activeCategoryIndex;
  const connectionDrawProgress = Number(clamp01(0.25 + localCatProgress * 0.95).toFixed(3));
  const nodeRevealCount = Math.max(
    2,
    Math.min(nodesPerCategory, Math.ceil((0.2 + localCatProgress * 0.8) * nodesPerCategory))
  );

  return {
    activeCategoryIndex,
    connectionDrawProgress,
    nodeRevealCount,
  };
}

/**
 * Computes physical 3D tilt, specular glare coordinates, glass sweep progress,
 * and internal image parallax from pointer position relative to card bounds.
 */
export function calculateCardPhysics(
  mouseX: number,
  mouseY: number,
  rect: { left: number; top: number; width: number; height: number },
  maxTiltDeg = 7.5,
  maxParallaxPx = 14
): CardPhysicsResult {
  const safeWidth = Math.max(rect.width, 1);
  const safeHeight = Math.max(rect.height, 1);

  const rawNormX = (mouseX - rect.left) / safeWidth;
  const rawNormY = (mouseY - rect.top) / safeHeight;

  const normX = Math.max(0, Math.min(1, rawNormX));
  const normY = Math.max(0, Math.min(1, rawNormY));

  const centeredX = normX - 0.5;
  const centeredY = normY - 0.5;

  const rotateX = Number((-centeredY * 2 * maxTiltDeg).toFixed(2));
  const rotateY = Number((centeredX * 2 * maxTiltDeg).toFixed(2));

  const glareX = Number((normX * 100).toFixed(1));
  const glareY = Number((normY * 100).toFixed(1));

  const sweepPosition = Number(((normX * 0.65 + normY * 0.35) * 140 - 20).toFixed(1));

  const parallaxX = Number((-centeredX * 2 * maxParallaxPx).toFixed(2));
  const parallaxY = Number((-centeredY * 2 * maxParallaxPx).toFixed(2));

  return {
    rotateX,
    rotateY,
    glareX,
    glareY,
    sweepPosition,
    parallaxX,
    parallaxY,
  };
}

/**
 * Computes smooth magnetic attraction offset when the pointer enters a button's field.
 */
export function computeMagneticOffset(
  cursorX: number,
  cursorY: number,
  centerX: number,
  centerY: number,
  radius = 110,
  strength = 0.28
): MagneticVector {
  const deltaX = cursorX - centerX;
  const deltaY = cursorY - centerY;
  const distance = Math.hypot(deltaX, deltaY);

  if (distance >= radius || radius <= 0) {
    return { dx: 0, dy: 0, isWithinField: false };
  }

  const falloff = 1 - distance / radius;
  const pull = strength * (0.4 + 0.6 * falloff);

  return {
    dx: Number((deltaX * pull).toFixed(2)),
    dy: Number((deltaY * pull).toFixed(2)),
    isWithinField: true,
  };
}

/**
 * Filters projects by discipline category and optional text query.
 */
export function filterProjects(
  projects: ProjectItem[],
  discipline: DisciplineCategory,
  searchQuery = ''
): ProjectItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesDiscipline =
      discipline === 'All Works' || project.discipline === discipline;

    if (!matchesDiscipline) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      project.title,
      project.subtitle,
      project.client,
      project.location,
      project.discipline,
      project.summary,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

/**
 * Computes the ordered stack transforms for the luxury Certificate Archive vault.
 */
export function computeCertificateStack(
  certificates: CertificateItem[],
  activeId: string
): StackCardTransform[] {
  const total = certificates.length;
  if (total === 0) return [];

  const activeIdx = Math.max(
    0,
    certificates.findIndex((item) => item.id === activeId)
  );

  return certificates.map((item, idx) => {
    const relativeOrder = (idx - activeIdx + total) % total;
    const isFront = relativeOrder === 0;

    return {
      id: item.id,
      stackIndex: relativeOrder,
      zIndex: total - relativeOrder,
      scale: Number(Math.max(0.84, 1 - relativeOrder * 0.045).toFixed(3)),
      translateY: relativeOrder * 18,
      translateX: relativeOrder * 14,
      rotateZ: Number((relativeOrder * 1.4).toFixed(2)),
      opacity: Number(Math.max(0.25, 1 - relativeOrder * 0.22).toFixed(2)),
      isFront,
    };
  });
}

/**
 * Cycles the active certificate ID forward or backward in the archive stack.
 */
export function cycleCertificateId(
  certificates: CertificateItem[],
  currentId: string,
  direction: 'next' | 'prev'
): string {
  if (certificates.length === 0) return '';
  const currentIdx = certificates.findIndex((c) => c.id === currentId);
  const safeIdx = currentIdx === -1 ? 0 : currentIdx;
  const delta = direction === 'next' ? 1 : -1;
  const nextIdx = (safeIdx + delta + certificates.length) % certificates.length;
  return certificates[nextIdx].id;
}

/**
 * Validates the Private Studio Commission inquiry form and generates a deterministic
 * archival dossier code when valid.
 */
export function validateCommissionForm(
  input: CommissionFormInput
): CommissionValidationResult {
  const errors: Partial<Record<keyof CommissionFormInput, string>> = {};

  const trimmedName = input.clientName.trim();
  const trimmedEmail = input.email.trim();
  const trimmedBrief = input.projectBrief.trim();

  if (trimmedName.length < 2) {
    errors.clientName = 'Please provide your full name or principal contact.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please provide a valid institutional or studio email address.';
  }

  if (!input.discipline.trim()) {
    errors.discipline = 'Please select a primary commission discipline.';
  }

  if (trimmedBrief.length < 20) {
    errors.projectBrief =
      'Please include at least 20 characters detailing architectural or creative scope.';
  }

  const valid = Object.keys(errors).length === 0;
  if (!valid) {
    return { valid: false, errors, dossierReference: null };
  }

  let checksum = 0;
  const seed = `${trimmedName.toUpperCase()}:${trimmedEmail.toLowerCase()}:${trimmedBrief.length}`;
  for (let i = 0; i < seed.length; i++) {
    checksum = (checksum * 31 + seed.charCodeAt(i)) % 9000;
  }
  const codeNumber = String(1000 + checksum).padStart(4, '0');

  return {
    valid: true,
    errors: {},
    dossierReference: `VA-2026-${codeNumber}`,
  };
}

/**
 * Computes a bounded staggered entrance delay (in ms) for paragraph elements
 * within a section or dialog so sequential paragraphs cascade smoothly.
 */
export function computeParagraphStaggerDelay(
  indexInSection: number,
  baseDelayMs = 120,
  stepMs = 85,
  maxDelayMs = 750
): number {
  const safeIndex = Math.max(0, Math.floor(indexInSection));
  return Math.min(maxDelayMs, baseDelayMs + safeIndex * stepMs);
}
