import React, { useState, useEffect } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onScrollDown: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollDown }) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [btnMagnet, setBtnMagnet] = useState({ x: 0, y: 0 });

  // Mouse move parallax (±12px)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to +1
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
      setParallax({
        x: xRatio * 12,
        y: yRatio * 12,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
    setBtnMagnet({ x, y });
  };

  const handleBtnMouseLeave = () => {
    setBtnMagnet({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-[#F5F5F3] text-black flex flex-col justify-between overflow-hidden select-none pt-24 pb-8 sm:pb-12 px-6 sm:px-12"
    >
      {/* Top spacing placeholder for absolute navbar */}
      <div className="w-full h-8 sm:h-12" />

      {/* Centerpiece: Giant Stacked Typography + Overlapping Parallax Backlit Silhouette */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto my-auto">
        {/* Giant Headline */}
        <div className="relative z-10 text-center flex flex-col items-center">
          <h1 className="font-display font-black text-[13vw] sm:text-[10vw] lg:text-[8.5rem] tracking-[-0.04em] leading-[0.82] uppercase text-[#0A0A0A] drop-shadow-sm">
            EXPLORE MY
          </h1>
          <h1 className="font-display font-black text-[13vw] sm:text-[10vw] lg:text-[8.5rem] tracking-[-0.04em] leading-[0.82] uppercase bg-gradient-to-b from-[#18181b] via-[#52525b] to-[#d4d4d8] bg-clip-text text-transparent -mt-2 sm:-mt-4">
            PORTFOLIO
          </h1>
        </div>

        {/* Backlit Silhouette Creator Portrait with Mouse-Move Depth Parallax (±12px) */}
        <div
          className="relative z-20 -mt-16 sm:-mt-24 md:-mt-32 w-56 sm:w-72 md:w-96 flex justify-center pointer-events-none transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          }}
        >
          {/* Subtle soft white backlight halo */}
          <div className="absolute inset-0 -top-6 rounded-full bg-white/60 filter blur-2xl scale-110" />

          <img
            src="/assets/hero_creator_silhouette.png"
            alt={PERSONAL_INFO.name}
            className="relative z-10 w-full object-contain filter contrast-125 brightness-95 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
          />

          {/* Fade transition at bottom to merge into warm white */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#F5F5F3] to-transparent pointer-events-none z-20" />
        </div>
      </div>

      {/* Bottom Corner Micro-Copy & Navigation */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-4 border-t border-black/[0.08]">
        {/* Bottom-Left: Designer Est. 2025 + Magnetic Arrow Button */}
        <div className="flex flex-col items-start space-y-3">
          <span className="text-[11px] font-mono-tech tracking-[0.16em] text-zinc-500 font-semibold">
            DESIGNER EST. 2025
          </span>
          <button
            onClick={onScrollDown}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
            className="group w-12 h-12 rounded-full border border-black/15 bg-white/90 backdrop-blur-sm flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm cursor-pointer"
            style={{
              transform: `translate3d(${btnMagnet.x}px, ${btnMagnet.y}px, 0)`,
            }}
            aria-label="Scroll down to About"
          >
            <ArrowDownRight
              size={18}
              className="transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
            />
          </button>
        </div>

        {/* Bottom-Right: Philosophy & Vertical Capabilities Stack */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-12 max-w-md text-left sm:text-right">
          <p className="text-[11px] font-mono-tech leading-relaxed text-zinc-600 max-w-xs">
            {PERSONAL_INFO.bioShort}
          </p>
          <div className="flex flex-col text-[11px] font-mono-tech font-bold tracking-[0.18em] text-zinc-800 space-y-1">
            <span>UI/UX</span>
            <span>WEB DESIGN</span>
            <span>LANDING PAGE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
