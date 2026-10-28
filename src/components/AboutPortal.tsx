import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PERSONAL_INFO } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface AboutPortalProps {
  onOpenContact: () => void;
  onGoToServices: () => void;
}

export const AboutPortal: React.FC<AboutPortalProps> = ({
  onOpenContact,
  onGoToServices,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);
  const contentInsideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !cardRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
        },
      });

      // Split text ABOUT left (-40vw) and ME right (+40vw)
      tl.to(
        textLeftRef.current,
        {
          x: '-40vw',
          opacity: 0,
          ease: 'power1.inOut',
        },
        0
      );

      tl.to(
        textRightRef.current,
        {
          x: '40vw',
          opacity: 0,
          ease: 'power1.inOut',
        },
        0
      );

      // Expand center square from 320px x 320px to 86vw x 78vh
      tl.fromTo(
        cardRef.current,
        {
          width: '320px',
          height: '320px',
          borderRadius: '24px',
        },
        {
          width: '86vw',
          height: '78vh',
          borderRadius: '32px',
          ease: 'power1.inOut',
        },
        0
      );

      // Fade in inside modal content
      tl.fromTo(
        contentInsideRef.current,
        {
          opacity: 0,
          scale: 0.94,
        },
        {
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
        },
        0.35
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative h-screen w-full bg-[#08080A] text-white flex items-center justify-center overflow-hidden select-none"
    >
      {/* Background: Starry Night Woodcut Engraving Aesthetic with Gothic Spires */}
      <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden">
        <svg
          className="w-full h-full object-cover filter contrast-150 brightness-75"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="starGlow1" cx="30%" cy="35%" r="25%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="starGlow2" cx="75%" cy="30%" r="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <pattern id="woodcutLines" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Deep dark sky base */}
          <rect width="1440" height="900" fill="#08080A" />

          {/* Star Swirl 1 */}
          <circle cx="430" cy="315" r="220" fill="url(#starGlow1)" />
          {[40, 70, 105, 145, 190, 235].map((r, i) => (
            <circle
              key={`ring1-${i}`}
              cx="430"
              cy="315"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.2"
              strokeDasharray={`${6 + i * 2} ${4 + i}`}
            />
          ))}

          {/* Star Swirl 2 (Moon Vortex) */}
          <circle cx="1080" cy="270" r="260" fill="url(#starGlow2)" />
          {[50, 90, 135, 180, 230, 280].map((r, i) => (
            <circle
              key={`ring2-${i}`}
              cx="1080"
              cy="270"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.4"
              strokeDasharray={`${8 + i * 3} ${5 + i}`}
            />
          ))}

          {/* Swirling celestial waves (Van Gogh flow) */}
          <path
            d="M -100,500 C 300,320 600,600 1000,380 C 1200,280 1400,340 1600,260"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="38"
            strokeLinecap="round"
          />
          <path
            d="M -50,450 C 320,290 620,540 1020,340 C 1220,250 1420,300 1600,230"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="24"
            strokeLinecap="round"
          />

          {/* Gothic Castle Spires on the Left */}
          <g transform="translate(100, 480)" fill="#060608" stroke="rgba(255,255,255,0.18)" strokeWidth="1">
            <path d="M 120,420 L 120,160 L 135,0 L 150,160 L 150,420 Z" />
            <path d="M 135,0 L 135,160" stroke="rgba(255,255,255,0.3)" />
            <path d="M 60,420 L 60,240 L 75,110 L 90,240 L 90,420 Z" />
            <path d="M 170,420 L 170,220 L 185,90 L 200,220 L 200,420 Z" />
            <path d="M 215,420 L 215,280 L 225,180 L 235,280 L 235,420 Z" />
            <rect x="40" y="320" width="220" height="100" fill="#060608" stroke="rgba(255,255,255,0.15)" />
            <line x1="50" y1="320" x2="50" y2="305" />
            <line x1="80" y1="320" x2="80" y2="305" />
            <line x1="110" y1="320" x2="110" y2="305" />
            <line x1="160" y1="320" x2="160" y2="305" />
            <line x1="190" y1="320" x2="190" y2="305" />
          </g>

          {/* Distant mountain ridges & lake reflection */}
          <path
            d="M 0,720 Q 350,680 700,730 T 1440,700 L 1440,900 L 0,900 Z"
            fill="#050507"
            stroke="rgba(255,255,255,0.12)"
          />
          <rect width="1440" height="900" fill="url(#woodcutLines)" opacity="0.6" />
        </svg>
      </div>

      {/* Pinned Split Headline: ABOUT and ME */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-12 sm:px-28 z-20">
        <div
          ref={textLeftRef}
          className="font-display font-black text-[15vw] sm:text-[14vw] tracking-[-0.04em] text-white uppercase leading-none drop-shadow-2xl"
        >
          ABOUT
        </div>
        <div
          ref={textRightRef}
          className="font-display font-black text-[15vw] sm:text-[14vw] tracking-[-0.04em] text-white uppercase leading-none drop-shadow-2xl"
        >
          ME
        </div>
      </div>

      {/* Center Expandable Dark Card / Modal Frame */}
      <div
        ref={cardRef}
        className="relative z-30 bg-[#08080A]/95 border border-white/[0.12] shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden backdrop-blur-xl"
        style={{
          width: '320px',
          height: '320px',
          borderRadius: '24px',
        }}
      >
        {/* Inside Modal Content */}
        <div
          ref={contentInsideRef}
          className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 z-20"
        >
          {/* Top Bar of Modal */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <span className="text-[11px] sm:text-xs font-mono-tech tracking-[0.16em] text-white/80 max-w-sm">
              {PERSONAL_INFO.visionStatement}
            </span>
            <span className="text-[10px] sm:text-xs font-mono-tech tracking-[0.16em] text-zinc-400">
              BASED IN INDIA • WORLDWIDE
            </span>
          </div>

          {/* Center Graphic: Diagonal Volumetric Spotlight Beam + Floating Human Silhouette */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden pointer-events-none">
            {/* Volumetric spotlight beam from top-right to center */}
            <div
              className="absolute w-[700px] h-[400px] -rotate-35 opacity-40 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 85% 15%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 35%, rgba(255,255,255,0) 70%)',
                filter: 'blur(16px)',
              }}
            />

            {/* Glowing floating human silhouette */}
            <div className="relative z-10 flex flex-col items-center animate-float">
              <div className="absolute inset-0 bg-white/40 filter blur-xl rounded-full scale-125" />

              <svg
                className="w-32 h-32 sm:w-44 sm:h-44 text-white filter drop-shadow-[0_0_18px_rgba(255,255,255,0.9)]"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M 30,55 
                     C 35,50 40,48 48,46
                     C 55,44 65,42 75,38
                     C 78,37 82,35 84,32
                     C 85,30 84,27 80,26
                     C 75,25 68,28 62,32
                     C 52,36 44,40 36,44
                     C 28,48 22,54 20,62
                     C 19,66 22,70 26,70
                     C 30,70 34,65 38,60 Z"
                  fill="white"
                  opacity="0.95"
                />
                <circle cx="82" cy="24" r="5" fill="white" />
                <circle cx="65" cy="20" r="1.5" fill="white" opacity="0.6" className="animate-ping" />
                <circle cx="45" cy="35" r="1" fill="white" opacity="0.8" />
                <circle cx="25" cy="50" r="1.5" fill="white" opacity="0.7" />
              </svg>
            </div>
          </div>

          {/* Bottom Row of Modal */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 border-t border-white/[0.08] pt-5">
            {/* Discipline & Craft copy */}
            <div className="max-w-xl flex flex-col space-y-2">
              <span className="text-[10px] sm:text-[11px] font-mono-tech tracking-[0.18em] text-white/50">
                DISCIPLINE & CRAFT — FULL STACK • AI/ML • UI/UX • PYTHON • REACT
              </span>
              <p className="text-xs sm:text-sm font-mono-tech leading-relaxed text-zinc-300">
                "{PERSONAL_INFO.bioEditorial}"
              </p>
            </div>

            {/* CTAs: Solid White Pill + Outlined Services Pill */}
            <div className="flex items-center space-x-3 w-full lg:w-auto justify-end">
              <button
                onClick={onOpenContact}
                className="px-6 py-2.5 rounded-full bg-white text-black font-mono-tech text-xs tracking-wider font-bold hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer"
              >
                GET IN TOUCH ↗
              </button>
              <button
                onClick={onGoToServices}
                className="px-6 py-2.5 rounded-full border border-white/30 text-white font-mono-tech text-xs tracking-wider font-medium hover:bg-white/10 hover:border-white transition-all duration-300 cursor-pointer"
              >
                SERVICES
              </button>
            </div>
          </div>
        </div>

        {/* Ambient Hairline Accent */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes floatFigure {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(-1.5deg);
          }
        }
        .animate-float {
          animation: floatFigure 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
