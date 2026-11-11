import type {
  ProjectItem,
  CertificateItem,
  DisciplineCategory,
  SkillDomain,
} from '../utils/portfolioLogic';

export const HERO_MONOLITH_IMAGE =
  '/src/assets/images/hero_monolith_sculpture_1794372318673.jpg';

export const DISCIPLINE_CATEGORIES: DisciplineCategory[] = [
  'All Works',
  'Horology & Industrial',
  'Spatial Architecture',
  'Moving Image',
  'Acoustic Systems',
];

export const STUDIO_METRICS = [
  {
    index: '01',
    value: '14',
    unit: 'Permanent Collections',
    context: 'Zürich · Geneva · Tokyo · Milan',
  },
  {
    index: '02',
    value: '0.004',
    unit: 'Millimeter Tolerance',
    context: '5-Axis CNC Titanium & Basalt Fabrication',
  },
  {
    index: '03',
    value: '38',
    unit: 'International Citations',
    context: 'Grand Prix d’Horlogerie · Red Dot Laureate · Cannes Craft',
  },
  {
    index: '04',
    value: '100%',
    unit: 'Bespoke Commissioned',
    context: 'Zero Commercial Templates · Handcrafted Systems',
  },
];

export const ABOUT_STORY_TIMELINE = [
  {
    year: '2019',
    city: 'Zürich',
    milestone: 'Computational Brutalism Research',
    detail:
      'Founded acoustic and structural concrete prototyping lab at ETH Zürich, uniting parametric geometry with raw volcanic basalt.',
  },
  {
    year: '2021',
    city: 'Geneva',
    milestone: 'Haute Horlogerie Industrial Division',
    detail:
      'Commissioned to re-architect tourbillon bridge geometry and low-reflectance PVD titanium enclosures for independent Swiss maisons.',
  },
  {
    year: '2024',
    city: 'Kyoto & Paris',
    milestone: '35mm Stage & Moving Image Directorate',
    detail:
      'Directed synchronized DMX carbon-arc lighting and Kodak Double-X photochemical title sequences for contemporary opera.',
  },
  {
    year: '2026',
    city: 'Global Atelier',
    milestone: 'Autonomous Spatial & Neural Systems',
    detail:
      'Integrating real-time GLSL optical simulation, physical CNC instrumentation, and spatial architecture under a single directorate.',
  },
];

export const PHILOSOPHY_CHAPTERS = [
  {
    index: '01',
    title: 'Subtraction as Luxury',
    category: 'Spatial & Material Discipline',
    statement:
      'True permanence requires the courage to remove everything ornamental until only mass, shadow, and proportion remain.',
    detail:
      'We reject decorative trends, synthetic gradients, and disposable digital templates. Whether carving a subterranean concrete gallery or machining a 40-millimeter titanium watch bridge, every surface is governed by light absorption and structural honesty.',
    metricLabel: 'Surface Reflectance Target',
    metricValue: '≤ 3.2% Matte Albedo',
  },
  {
    index: '02',
    title: 'Tactile Physics & Weight',
    category: 'Industrial & Digital Choreography',
    statement:
      'Digital interfaces should possess the inertia, resistance, and optical precision of a mechanical camera shutter.',
    detail:
      'Motion in our studio is never decorative filler. Every transition follows physical momentum, optical depth-of-field, and directional rim lighting—rewarding deliberate exploration rather than competing for attention.',
    metricLabel: 'Motion Easing Standard',
    metricValue: 'Cubic-Bezier (0.16, 1, 0.3, 1)',
  },
  {
    index: '03',
    title: 'Chromatic Restraint',
    category: 'Monochrome & 640nm Crimson',
    statement:
      'When an entire environment is composed in obsidian, ash, and silver, a single thread of crimson commands absolute authority.',
    detail:
      'Inspired by darkroom safelights, ruby watch bearings, and nocturnal architectural beacons, our signature #C1121F accent functions strictly as a precision instrument marker—guiding the eye to moments of tension and action.',
    metricLabel: 'Primary Chromatic Wavelength',
    metricValue: '640nm Deep Cinema Red',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'chronos-calibre-ix',
    catalogNumber: '01',
    title: 'Chronos Calibre IX',
    subtitle: 'Monolithic Titanium Tourbillon & Exhibition Vault',
    client: 'Manufacture Contemporaine de Genève',
    location: 'Geneva, Switzerland',
    year: '2026',
    discipline: 'Horology & Industrial',
    featuredSpan: 'wide',
    image: '/src/assets/images/project_chronos_horology_1794372319253.jpg',
    fallbackGradient: 'from-[#141416] via-[#0B0B0D] to-[#050505]',
    aspectRatio: '16:9',
    summary:
      'Industrial housing, exposed flying tourbillon bridge architecture, and interactive macro-optical inspection table engineered from bead-blasted Grade 5 titanium.',
    architecturalBrief:
      'Commissioned to strip away centuries of ornate baroque watchmaking excess, Chronos Calibre IX treats mechanical timekeeping as stark brutalist sculpture. Every bridge is milled to absorb stray light while synthetic crimson rubies act as the sole chromatic focal anchors.',
    executionNarrative:
      'Over 14 months in Geneva, our industrial studio re-engineered the mainplate geometry and designed the physical collector showroom display—combining low-iron anti-reflective sapphire with a motorized 3200K rim-lighting ring that reveals gear teeth only as the viewer approaches.',
    techStack: [
      '5-Axis CNC Titanium CAD',
      'WebGL Raymarched Optics',
      'GLSL Specular Shaders',
      'Embedded DMX Telemetry',
    ],
    links: [
      { label: 'Inspect Full Monograph', action: 'monograph' },
      { label: 'Commission Similar Scope', action: 'commission' },
    ],
    materialsAndSpecs: [
      'PVD Matte-Black Grade 5 Titanium Bridges',
      'Synthetic Crimson Corundum Jewel Bearings',
      '18.4g Total Mechanical Movement Mass',
      'Sapphire Crystal with Dual-Side Optical Coating',
    ],
    deliverables: [
      'Calibre Bridge Architecture & CAD',
      'Physical Collector Vault & Lighting Instrument',
      '6K Macro Anamorphic Film Direction',
      'Interactive Showroom Inspection Terminal',
    ],
    exhibitionMetric: '12 Numbered Pieces · 21,600 vph Oscillation',
    lightingNotes: {
      angle: '28° Grazing Rim',
      kelvin: '3100K Tungsten',
      lens: 'Leica 90mm APO-Macro',
      aperture: 'f/4.0',
    },
  },
  {
    id: 'obsidian-sanctuary',
    catalogNumber: '02',
    title: 'Obsidian Sanctuary',
    subtitle: 'Subterranean Sound & Light Pavilion',
    client: 'Fondation d’Art Brutaliste',
    location: 'Vals, Graubünden',
    year: '2025',
    discipline: 'Spatial Architecture',
    featuredSpan: 'standard',
    image: '/src/assets/images/project_obsidian_pavilion_1794372321029.jpg',
    fallbackGradient: 'from-[#180709] via-[#0B0B0D] to-[#050505]',
    aspectRatio: '4:3',
    summary:
      'A board-formed black basalt concrete pavilion cantilevered over a still reflection basin, anchored by a single monochromatic 640nm deep-red light atrium.',
    architecturalBrief:
      'Set against the alpine twilight of Graubünden, the pavilion rejects exterior ornament in favor of raw mass and calibrated reflection. Visitors cross a 42-meter submerged granite threshold before entering the crimson decompression gallery.',
    executionNarrative:
      'We directed both the structural material palette and the permanent architectural lighting system. Custom narrow-spectrum LEDs embedded within cast concrete reveals eliminate glare on the black water mirror outside.',
    techStack: [
      'Parametric Rhino / Grasshopper',
      '640nm Narrow-Spectrum Photometry',
      'Finite Element Acoustic Solver',
      'Real-Time Spatial Twin',
    ],
    links: [
      { label: 'Inspect Full Monograph', action: 'monograph' },
      { label: 'Commission Similar Scope', action: 'commission' },
    ],
    materialsAndSpecs: [
      'Board-Formed Volcanic Basalt Concrete',
      'Hot-Rolled Blackened Structural Steel',
      '640nm Narrow-Spectrum Crimson Atrium Glazing',
      'Zero-Ripple Black Slate Reflection Basin',
    ],
    deliverables: [
      'Architectural Concept & Spatial Direction',
      'Permanent Nocturnal Lighting Choreography',
      'Wayfinding & Monolithic Bronze Typography',
      'Acoustic Reverberation Calibration',
    ],
    exhibitionMetric: '1,650 sqm Span · 4.2s Acoustic Decay',
    lightingNotes: {
      angle: '12° Horizon Elevation',
      kelvin: '1900K / 640nm Red',
      lens: '24mm Perspective Control',
      aperture: 'f/5.6',
    },
  },
  {
    id: 'nocturne-act-iv',
    catalogNumber: '03',
    title: 'Nocturne — Act IV',
    subtitle: 'Stage Scenography & Anamorphic Title Direction',
    client: 'Opéra National Contemporain',
    location: 'Paris, France',
    year: '2025',
    discipline: 'Moving Image',
    featuredSpan: 'standard',
    image: '/src/assets/images/project_nocturne_cinema_1794372321108.jpg',
    fallbackGradient: 'from-[#161214] via-[#0B0B0D] to-[#050505]',
    aspectRatio: '4:3',
    summary:
      'Monumental 18-meter raw wool acoustic drapery and high-contrast 35mm theatrical spotlight choreography for a modern avant-garde opera.',
    architecturalBrief:
      'Tasked with unifying live stage architecture and cinema title projections, we treated light itself as a physical blade—carving performers out of complete darkness using a twin-beam carbon-arc and crimson optical rig.',
    executionNarrative:
      'Shot on Kodak Double-X 5222 monochrome stock alongside custom red-filtered optical passes, the title sequence and physical stage monolith move in synchronized timecode with the orchestral percussion.',
    techStack: [
      '35mm Kodak Double-X Pipeline',
      'Houdini Volumetric Light Sim',
      'SMPTE Timecode DMX Engine',
      'Anamorphic Optical Compositing',
    ],
    links: [
      { label: 'Inspect Full Monograph', action: 'monograph' },
      { label: 'Commission Similar Scope', action: 'commission' },
    ],
    materialsAndSpecs: [
      '18m Heavyweight Carbon-Dyed Acoustic Wool',
      'Cast Concrete & Brushed Steel Stage Podium',
      '35mm Kodak Double-X Film Stock Transfer',
      'DMX-Synchronized Dual-Beam Theatrical Rig',
    ],
    deliverables: [
      'Main Stage Scenography & Podium Design',
      '35mm Anamorphic Title Sequence',
      'Live Timecode Lighting Score',
      'Collector Monograph Publication',
    ],
    exhibitionMetric: '42 Sold-Out Performances · 70mm Archival Print',
    lightingNotes: {
      angle: '62° Overhead Key',
      kelvin: '5400K Carbon Arc',
      lens: '50mm Anamorphic Prime',
      aperture: 'f/2.0',
    },
  },
  {
    id: 'kinetix-m1-synth',
    catalogNumber: '04',
    title: 'Kinetix Model 01',
    subtitle: 'Tactile Analog Acoustic Instrument',
    client: 'Kinetix Audio Laboratories',
    location: 'Berlin & Kyoto',
    year: '2026',
    discipline: 'Acoustic Systems',
    featuredSpan: 'wide',
    image: '/src/assets/images/project_kinetix_acoustic_1794372321841.jpg',
    fallbackGradient: 'from-[#121215] via-[#0B0B0D] to-[#050505]',
    aspectRatio: '4:3',
    summary:
      'CNC-machined matte-black anodized aluminum field synthesizer with weighted stainless steel rotary encoders and a single ruby-glass vacuum indicator.',
    architecturalBrief:
      'Modern audio hardware often suffers from chaotic plastic interfaces and rainbow LED matrices. Kinetix Model 01 restores instrument dignity through blind-operated tactile knurling, dual-ball-bearing rotary resistance, and a single optical crimson peak jewel.',
    executionNarrative:
      'Every enclosure is carved from a solid 6.2kg billet of 6061-T6 aluminum. The four central rotary dials feature micro-engraved vernier scales inspired by 1960s Leica rangefinder lenses.',
    techStack: [
      'Embedded Rust DSP Engine',
      'Monoblock 6061-T6 CNC CAD',
      'Analog Voltage Telemetry',
      'WebAudio Spatial Synthesizer',
    ],
    links: [
      { label: 'Inspect Full Monograph', action: 'monograph' },
      { label: 'Commission Similar Scope', action: 'commission' },
    ],
    materialsAndSpecs: [
      'Monoblock CNC 6061-T6 Type-III Anodized Aluminum',
      '316L Stainless Steel Knurled Vernier Encoders',
      'Custom Ruby-Glass Optical Peak Indicator',
      'Carbon-Weave Acoustic Isolation Baseplate',
    ],
    deliverables: [
      'Industrial Enclosure & Mechanical Engineering',
      'Haptic Torque & Knurling Specification',
      'Embedded Single-Lens Optical Telemetry',
      'Bespoke Flight Case & Packaging System',
    ],
    exhibitionMetric: '500 Collector Units · Red Dot Best of the Best',
    lightingNotes: {
      angle: '45° Cross Studio Key',
      kelvin: '4000K Neutral Diffusion',
      lens: '65mm Macro Cine',
      aperture: 'f/5.6',
    },
  },
];

export const SKILLS_ECOSYSTEM_DATA: SkillDomain[] = [
  {
    id: 'ai-ml',
    index: '01',
    title: 'AI / ML & Neural Optics',
    subtitle: 'Real-Time Generative Shaders, Inverse Rendering & Vision Systems',
    signatureAnimation: 'neural-pulse',
    architectureNote:
      'We train custom diffusion LoRAs, neural radiance fields, and latency-locked computer vision pipelines that drive physical museum installations and spatial projection mapping at 120Hz.',
    nodes: [
      { id: 'ai-1', label: 'PyTorch & TensorRT', proficiency: '98% · Core Runtime', x: 20, y: 26 },
      { id: 'ai-2', label: 'Neural Radiance & 3DGS', proficiency: '95% · Spatial Reconstruction', x: 52, y: 18 },
      { id: 'ai-3', label: 'Real-Time Pose & Depth CV', proficiency: '94% · Interactive Sensors', x: 80, y: 34 },
      { id: 'ai-4', label: 'Custom Diffusion Pipelines', proficiency: '96% · Bespoke Models', x: 35, y: 68 },
      { id: 'ai-5', label: 'Audio-Reactive Neural Latent', proficiency: '92% · Live Stage Sync', x: 72, y: 74 },
    ],
    connections: [
      [0, 1],
      [1, 2],
      [0, 3],
      [1, 3],
      [3, 4],
      [2, 4],
    ],
  },
  {
    id: 'web-dev',
    index: '02',
    title: 'Web Development & Spatial UI',
    subtitle: 'Scroll-Driven Cinema, Custom WebGL Shaders & High-Frame-Rate Interfaces',
    signatureAnimation: 'matrix-grid',
    architectureNote:
      'Browsers are treated as real-time film projectors. We engineer custom GSAP ScrollTrigger scrub engines, post-processing WebGL pipelines, and sub-millisecond tactile DOM physics.',
    nodes: [
      { id: 'web-1', label: 'React 19 & Next-Gen DOM', proficiency: '99% · UI Architecture', x: 18, y: 32 },
      { id: 'web-2', label: 'GSAP ScrollTrigger & Scrub', proficiency: '99% · Choreography Engine', x: 50, y: 22 },
      { id: 'web-3', label: 'Three.js / WebGL / GLSL', proficiency: '96% · Custom Shaders', x: 82, y: 30 },
      { id: 'web-4', label: 'WebGPU & Compute Passes', proficiency: '91% · Particle & Light Sim', x: 30, y: 72 },
      { id: 'web-5', label: '60fps Compositor Physics', proficiency: '98% · Zero-Layout-Shift', x: 68, y: 70 },
    ],
    connections: [
      [0, 1],
      [1, 2],
      [1, 4],
      [0, 3],
      [3, 4],
      [2, 4],
    ],
  },
  {
    id: 'programming',
    index: '03',
    title: 'Systems Programming',
    subtitle: 'Deterministic TypeScript, Embedded Rust DSP & High-Concurrency Engines',
    signatureAnimation: 'kinetic-orbit',
    architectureNote:
      'From bare-metal microcontrollers inside anodized acoustic synthesizers to distributed timecode servers running live opera rigs, our code is strictly typed and deterministic.',
    nodes: [
      { id: 'prog-1', label: 'TypeScript (Strict Mode)', proficiency: '99% · Primary Language', x: 22, y: 24 },
      { id: 'prog-2', label: 'Rust & Embedded DSP', proficiency: '94% · Hardware Audio', x: 56, y: 20 },
      { id: 'prog-3', label: 'C++20 & OpenGL / Vulkan', proficiency: '92% · Graphics Core', x: 82, y: 42 },
      { id: 'prog-4', label: 'Python Scientific Stack', proficiency: '97% · Simulation & ML', x: 28, y: 70 },
      { id: 'prog-5', label: 'GLSL / HLSL Shader Math', proficiency: '96% · Optical Raymarching', x: 64, y: 74 },
    ],
    connections: [
      [0, 1],
      [1, 2],
      [0, 3],
      [1, 4],
      [2, 4],
      [3, 4],
    ],
  },
  {
    id: 'tools',
    index: '04',
    title: 'Fabrication & Direction Tools',
    subtitle: 'Procedural Houdini FX, 5-Axis CNC CAD & Photochemical Cinema Optics',
    signatureAnimation: 'precision-axis',
    architectureNote:
      'Bridging digital simulation and physical mass requires fluency across industrial CAD, procedural node graphs, and large-format cinema camera systems.',
    nodes: [
      { id: 'tool-1', label: 'SideFX Houdini & VEX', proficiency: '96% · Procedural Sim', x: 20, y: 28 },
      { id: 'tool-2', label: 'Rhino 8 & Grasshopper', proficiency: '97% · Parametric CAD', x: 52, y: 18 },
      { id: 'tool-3', label: 'Cinema 4D & Octane / Redshift', proficiency: '98% · Look-Dev & Lighting', x: 80, y: 32 },
      { id: 'tool-4', label: 'Figma Design Systems', proficiency: '99% · Typographic Precision', x: 32, y: 72 },
      { id: 'tool-5', label: 'Leica / ARRI Optical Workflow', proficiency: '95% · 35mm & DI Grading', x: 70, y: 72 },
    ],
    connections: [
      [0, 1],
      [1, 2],
      [0, 3],
      [2, 4],
      [1, 4],
      [3, 4],
    ],
  },
];

export const CERTIFICATES_ARCHIVE: CertificateItem[] = [
  {
    id: 'cert-gphg-horology',
    archiveCode: 'ARCHIVE · VIII-01',
    title: 'Grand Prix d’Horlogerie — Industrial Craft & Micro-Architecture',
    institution: 'Fondation de la Haute Horlogerie',
    location: 'Geneva, Switzerland',
    conferredDate: 'November 2025',
    verificationHash: 'FHH-2025-8841-992A-VA',
    distinctionLevel: 'Jury Unanimous Citation · Special Mechanical Craft',
    directorSignatory: 'Dr. Henri-Luc Moreau, Chair of the Curatorial Council',
    citationSummary:
      'Conferred in recognition of the Chronos Calibre IX titanium bridge architecture and exhibition vault, advancing the synthesis of brutalist structural form and haute horlogerie precision.',
    technicalPillars: [
      '5-Axis Micro-Milling & Titanium Metallurgy',
      'Zero-Distraction Optical Sapphire Framing',
      'Kinetic Rim-Lighting Instrument Engineering',
    ],
    accreditationBody: 'Grand Council of Geneva Horological Arts',
  },
  {
    id: 'cert-ethz-architecture',
    archiveCode: 'ARCHIVE · VIII-02',
    title: 'Executive Post-Master in Computational Brutalism & Spatial Acoustics',
    institution: 'ETH Zürich — Department of Architecture (D-ARCH)',
    location: 'Zürich, Switzerland',
    conferredDate: 'June 2024',
    verificationHash: 'ETHZ-2024-4092-771C-VA',
    distinctionLevel: 'Summa Cum Laude · Silver Medallion of the Rectorate',
    directorSignatory: 'Prof. Dr. Katarina Lindqvist, Chair of Digital Fabrication',
    citationSummary:
      'Awarded for original architectural thesis and full-scale structural prototyping of light-absorbing basalt concrete enclosures and low-frequency acoustic chambers.',
    technicalPillars: [
      'Parametric Formwork & Cast Basalt Tectonics',
      'Subterranean Reverberation & Waveguide Physics',
      'Nocturnal Architectural Photometry',
    ],
    accreditationBody: 'Swiss Federal Institute of Technology Registry',
  },
  {
    id: 'cert-reddot-laureate',
    archiveCode: 'ARCHIVE · VIII-03',
    title: 'Red Dot: Best of the Best — Bespoke Acoustic & Industrial Systems',
    institution: 'Design Zentrum Nordrhein Westfalen',
    location: 'Essen, Germany',
    conferredDate: 'March 2026',
    verificationHash: 'RDD-2026-1190-554E-VA',
    distinctionLevel: 'Best of the Best Laureate (Top 0.8% of Entries)',
    directorSignatory: 'Prof. Dr. Peter Zec, Founder & President',
    citationSummary:
      'Highest international industrial design accolade awarded for the Kinetix Model 01 synthesizer enclosure, cited for uncompromising tactile knurling and monolithic aluminum construction.',
    technicalPillars: [
      'Haptic Torque & Blind-Operated Ergonomics',
      'Monoblock 6061-T6 Anodized Surface Engineering',
      'Precision Vernier Scale Laser Etching',
    ],
    accreditationBody: 'International Red Dot Jury Directorate',
  },
  {
    id: 'cert-cannes-direction',
    archiveCode: 'ARCHIVE · VIII-04',
    title: 'Gold Lion & Craft Grand Prix — Film & Scenographic Title Direction',
    institution: 'International Festival of Creativity — Film Craft Jury',
    location: 'Cannes, France',
    conferredDate: 'June 2025',
    verificationHash: 'CLF-2025-7731-008B-VA',
    distinctionLevel: 'Gold Laureate · Direction & Lighting Cinematography',
    directorSignatory: 'Elena Rostova, Jury President for Film Craft',
    citationSummary:
      'Honoring the 35mm photochemical title sequence and live DMX carbon-arc stage choreography created for Opéra National Contemporain’s production of Nocturne Act IV.',
    technicalPillars: [
      '35mm Double-X Photochemical Cinematography',
      'Real-Time Timecode Stage Lighting Direction',
      'Editorial Title Typography & Optical Printing',
    ],
    accreditationBody: 'Cannes Film Craft Official Archive',
  },
];
