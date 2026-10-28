import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterTalkProps {
  onOpenContact: () => void;
}

export const FooterTalk: React.FC<FooterTalkProps> = ({ onOpenContact }) => {
  const footerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[75vh] w-full bg-[#0A0A0A] text-white flex flex-col justify-between pt-24 pb-10 px-6 sm:px-14 select-none overflow-hidden"
    >
      {/* Interactive Cursor-Tracking Radial Metallic Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(circle 500px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.12) 0%, rgba(200, 200, 220, 0.04) 40%, transparent 70%)`,
        }}
      />

      {/* Subtle ambient radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Centerpiece: Massive "LET'S TALK" Display Headline with Metallic Sheen */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto">
        <h2
          className="font-display font-black text-[16vw] sm:text-[14vw] lg:text-[11.5rem] tracking-[-0.04em] uppercase leading-[0.82] select-none transition-all duration-700 bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent hover:brightness-125 cursor-pointer relative"
          onClick={onOpenContact}
        >
          LET'S TALK
          {/* Subtle cursor reflection highlight on the text */}
          <span
            className="absolute inset-0 bg-clip-text text-transparent pointer-events-none transition-opacity duration-500"
            style={{
              opacity: isHovered ? 0.7 : 0,
              backgroundImage: `radial-gradient(circle 280px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 80%)`,
            }}
            aria-hidden="true"
          >
            LET'S TALK
          </span>
        </h2>

        {/* 5 CTA Pills: 4 Outlined Pills + 1 Solid White Glowing Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 max-w-3xl">
          <a
            href={PERSONAL_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-white/20 text-white font-mono-tech text-xs tracking-wider font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            INSTAGRAM
          </a>
          <a
            href={PERSONAL_INFO.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-white/20 text-white font-mono-tech text-xs tracking-wider font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            TWITTER
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-white/20 text-white font-mono-tech text-xs tracking-wider font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            LINKEDIN
          </a>
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-white/20 text-white font-mono-tech text-xs tracking-wider font-medium hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            GITHUB
          </a>

          {/* Solid White Glowing Button */}
          <button
            onClick={onOpenContact}
            className="px-7 py-2.5 rounded-full bg-white text-black font-mono-tech text-xs tracking-wider font-bold hover:bg-zinc-200 shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer flex items-center space-x-1.5"
          >
            <span>CONTACT ME</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Clean Bottom Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-white/[0.08] pt-6 mt-12 gap-3 text-[11px] font-mono-tech text-zinc-400">
        <div>PORTFOLIO. ALL RIGHTS RESERVED</div>
        <div>DESIGN BY JISHNU MONDAL • CRAFTED BY IMMANUEL</div>
      </div>
    </footer>
  );
};
