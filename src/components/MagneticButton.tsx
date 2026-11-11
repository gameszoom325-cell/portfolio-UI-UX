import React, { useRef, useState } from 'react';
import { computeMagneticOffset } from '../utils/portfolioLogic';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  cursorLabel?: string;
  className?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  cursorLabel = 'EXPLORE',
  className = '',
  type = 'button',
  ariaLabel,
}) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ dx: 0, dy: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const vector = computeMagneticOffset(
      e.clientX,
      e.clientY,
      centerX,
      centerY,
      110,
      0.26
    );
    setOffset({ dx: vector.dx, dy: vector.dy });
  };

  const handleMouseLeave = () => {
    setOffset({ dx: 0, dy: 0 });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center gap-3 px-6 py-3 text-xs font-medium tracking-[0.14em] uppercase whitespace-nowrap shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C1121F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]';

  const variantStyles = {
    primary:
      'bg-[#C1121F] text-[#F5F5F5] hover:bg-[#a30f1a] shadow-[0_10px_30px_-10px_rgba(193,18,31,0.55)] border border-[#C1121F]',
    secondary:
      'bg-[#0B0B0D]/90 text-[#F5F5F5] border border-white/20 hover:border-white/60 hover:bg-white/5',
    ghost:
      'bg-transparent text-[#D9D9D9] hover:text-white border border-transparent hover:border-white/15',
  }[variant];

  const transformStyle = {
    transform: `translate3d(${offset.dx}px, ${offset.dy}px, 0)`,
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor-label={cursorLabel}
        aria-label={ariaLabel}
        style={transformStyle}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-label={cursorLabel}
      aria-label={ariaLabel}
      style={transformStyle}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};
