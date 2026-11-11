import React, { useEffect, useState } from 'react';

export const AmbientBackground: React.FC = () => {
  const [pointer, setPointer] = useState({ x: 50, y: 35 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / Math.max(window.innerWidth, 1)) * 100;
      const y = (e.clientY / Math.max(window.innerHeight, 1)) * 100;
      setPointer({ x, y });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505]"
    >
      {/* Deep layered base depth */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out"
        style={{
          background: `radial-gradient(900px circle at ${pointer.x}% ${pointer.y}%, rgba(193, 18, 31, 0.055), rgba(255, 255, 255, 0.018) 38%, rgba(5, 5, 5, 0) 75%)`,
        }}
      />

      {/* Slow passing theatrical light beam */}
      <div
        className="animate-light-sweep absolute -top-1/3 left-1/4 h-[140vh] w-[42vw] rounded-full blur-3xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(193,18,31,0.045) 45%, rgba(5,5,5,0) 85%)',
        }}
      />

      {/* Secondary counterweight shadow gradient */}
      <div
        className="absolute bottom-0 right-0 h-[75vh] w-[65vw] opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 80% 80%, rgba(17, 17, 17, 0.9), rgba(5, 5, 5, 0) 70%)',
        }}
      />

      {/* Architectural vertical hairlines for subtle showroom spatial calibration */}
      <div className="mx-auto flex h-full max-w-[1440px] justify-between px-6 sm:px-12 lg:px-16 opacity-[0.035]">
        <div className="h-full w-px bg-white" />
        <div className="hidden md:block h-full w-px bg-white" />
        <div className="hidden lg:block h-full w-px bg-white" />
        <div className="h-full w-px bg-white" />
      </div>

      {/* Subtle 35mm SVG analog film grain */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.032] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="atelier-film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#atelier-film-grain)" />
      </svg>
    </div>
  );
};
