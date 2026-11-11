import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [label, setLabel] = useState<string>('');
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      const labeledEl = target?.closest('[data-cursor-label]') as HTMLElement | null;
      if (labeledEl) {
        const nextLabel = labeledEl.getAttribute('data-cursor-label') || '';
        setLabel(nextLabel);
      } else {
        setLabel('');
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const renderLoop = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;

      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        ringPos.current.x += dx * 0.18;
        ringPos.current.y += dy * 0.18;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringPos.current.x.toFixed(1)}px, ${ringPos.current.y.toFixed(1)}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop, isVisible]);

  if (!isDesktop) return null;

  const hasLabel = label.length > 0;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Inner precision reticle dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#C1121F] transition-transform duration-75"
      />

      {/* Smooth interpolated outer ring / context label badge */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 flex items-center justify-center"
      >
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-200 ease-out ${
            hasLabel
              ? 'h-16 w-16 border-[#C1121F]/80 bg-[#050505]/90 backdrop-blur-md shadow-[0_0_25px_rgba(193,18,31,0.28)]'
              : isPressed
              ? 'h-7 w-7 border-white/80 bg-white/10'
              : 'h-9 w-9 border-white/25 bg-transparent'
          }`}
        >
          {hasLabel && (
            <span className="font-mono text-[10px] font-medium tracking-[0.18em] text-[#F5F5F5] uppercase whitespace-nowrap">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
