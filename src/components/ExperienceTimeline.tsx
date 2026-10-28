import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'learning' | 'leadership' | 'freelance'>('learning');
  const [activeLabel, setActiveLabel] = useState('ORIGIN & FOUNDATIONS');
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !trackRef.current) return;

      const track = trackRef.current;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          onUpdate: (self) => {
            setProgressWidth(self.progress * 100);
            if (self.progress < 0.25) {
              setActiveLabel('ORIGIN & FOUNDATIONS');
              setActiveTab('learning');
            } else if (self.progress < 0.65) {
              setActiveLabel('ACADEMIC RIGOR & LEADERSHIP');
              setActiveTab('leadership');
            } else {
              setActiveLabel('FREELANCE & PRODUCTION WORK');
              setActiveTab('freelance');
            }
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const jumpToSlide = (index: number, tabName: 'learning' | 'leadership' | 'freelance') => {
    setActiveTab(tabName);
    if (!containerRef.current || !trackRef.current) return;
    const scrollTriggerInstance = ScrollTrigger.getAll().find(st => st.trigger === containerRef.current);
    if (scrollTriggerInstance) {
      const targetProgress = index / 3;
      const targetScroll = scrollTriggerInstance.start + targetProgress * (scrollTriggerInstance.end - scrollTriggerInstance.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative h-screen w-full bg-[#0A0A0A] text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Top Bar: Left dynamic status label + Right progress bar */}
      <div className="relative z-30 w-full px-8 sm:px-14 pt-8 flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] font-mono-tech tracking-[0.2em] text-white/80 font-bold">
            {activeLabel}
          </span>
        </div>

        {/* Scroll Progress Bar */}
        <div className="flex items-center space-x-3 w-40 sm:w-64">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-150 ease-out"
              style={{ width: `${Math.max(progressWidth, 12)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono-tech text-white/50 w-8 text-right">
            {Math.round(progressWidth)}%
          </span>
        </div>
      </div>

      {/* Background Watermark Marquee */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-[0.04] overflow-hidden whitespace-nowrap z-0">
        <div className="text-[18vw] font-display font-black tracking-tighter uppercase select-none animate-marquee">
          CREATIVE TECHNOLOGIST — 2023–2026 SELF-DIRECTED — FULL STACK DEVELOPER — IMMANUEL JAYARUBAN —
        </div>
      </div>

      {/* Horizontal Panels Track */}
      <div
        ref={trackRef}
        className="relative z-10 flex h-[70vh] items-center will-change-transform pl-8 sm:pl-16 pr-32"
      >
        {/* Intro Panel: WHERE I'VE BEEN */}
        <div className="timeline-panel min-w-[70vw] sm:min-w-[50vw] lg:min-w-[42vw] pr-12 flex flex-col justify-center">
          <div className="flex flex-col space-y-4">
            <span className="text-[11px] font-mono-tech tracking-[0.2em] text-white/40">
              FOUNDATION & JOURNEY
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-[-0.03em] uppercase leading-none">
              WHERE I'VE <br />
              <span className="text-zinc-500">BEEN</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono-tech text-zinc-400 max-w-md leading-relaxed mt-4">
              A chronology of self-directed technical discipline, academic distinction, and client delivery across modern creative web technologies and artificial intelligence.
            </p>
          </div>
        </div>

        {/* Slide 1: SELF-DIRECTED LEARNING / CREATIVE TECHNOLOGIST */}
        <div className="timeline-panel min-w-[85vw] sm:min-w-[70vw] lg:min-w-[55vw] px-8 sm:px-12 py-10 rounded-3xl bg-[#0e0e11] border border-white/[0.08] mx-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6">
              <span className="text-[11px] font-mono-tech tracking-[0.18em] text-white/50">
                2023 — 2025
              </span>
              <span className="text-[10px] font-mono-tech tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                SELF-DIRECTED LEARNING
              </span>
            </div>
            <h3 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase leading-tight mb-4">
              CREATIVE <br />
              <span className="text-zinc-400">TECHNOLOGIST</span>
            </h3>
            <p className="text-xs sm:text-sm font-mono-tech leading-relaxed text-zinc-300 max-w-xl">
              Intensive self-education period exploring web technologies, creative coding, offline LLMs, and modern development practices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/[0.08] mt-8">
            <div>
              <span className="text-[10px] font-mono-tech tracking-[0.16em] text-white/40 block mb-1">
                MILESTONE 01
              </span>
              <p className="text-xs font-mono-tech text-zinc-300 leading-snug">
                Completed 500+ hours of hands-on full-stack development.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono-tech tracking-[0.16em] text-white/40 block mb-1">
                MILESTONE 02
              </span>
              <p className="text-xs font-mono-tech text-zinc-300 leading-snug">
                Mastered React, Node.js, Python, and TypeScript ecosystem.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono-tech tracking-[0.16em] text-white/40 block mb-1">
                MILESTONE 03
              </span>
              <p className="text-xs font-mono-tech text-zinc-300 leading-snug">
                Built portfolio of 15+ production-grade web & AI projects.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 2: ACADEMIC LEADERSHIP & HONORS */}
        <div className="timeline-panel min-w-[85vw] sm:min-w-[70vw] lg:min-w-[55vw] px-8 sm:px-12 py-10 rounded-3xl bg-[#0e0e11] border border-white/[0.08] mx-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6">
              <span className="text-[11px] font-mono-tech tracking-[0.18em] text-white/50">
                2024 — 2025
              </span>
              <span className="text-[10px] font-mono-tech tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                ACADEMIC EXCELLENCE
              </span>
            </div>
            <h3 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase leading-tight mb-4">
              DEPARTMENT <br />
              <span className="text-zinc-400">CHAIRMAN</span>
            </h3>
            <p className="text-xs sm:text-sm font-mono-tech leading-relaxed text-zinc-300 max-w-xl">
              Elected Department Chairman (AI & Data Science) and Class Representative. Secured 1st Rank across the entire batch in Computer Science & Artificial Intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/[0.08] mt-8">
            <div>
              <span className="text-[10px] font-mono-tech tracking-[0.16em] text-white/40 block mb-1">
                LEADERSHIP
              </span>
              <p className="text-xs font-mono-tech text-zinc-300 leading-snug">
                Organized technical hackathons and spearheaded department initiatives.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono-tech tracking-[0.16em] text-white/40 block mb-1">
                1ST RANK HOLDER
              </span>
              <p className="text-xs font-mono-tech text-zinc-300 leading-snug">
                Consistent top academic performance and computer science rigor.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono-tech tracking-[0.16em] text-white/40 block mb-1">
                REPRESENTATION
              </span>
              <p className="text-xs font-mono-tech text-zinc-300 leading-snug">
                Elected class representative fostering peer mentorship & growth.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 3: FULL STACK & AI DEVELOPMENT */}
        <div className="timeline-panel min-w-[85vw] sm:min-w-[70vw] lg:min-w-[55vw] px-8 sm:px-12 py-10 rounded-3xl bg-[#0e0e11] border border-white/[0.08] mx-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6">
              <span className="text-[11px] font-mono-tech tracking-[0.18em] text-white/50">
                2025 — PRESENT
              </span>
              <span className="text-[10px] font-mono-tech tracking-[0.2em] px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/10">
                PRODUCTION WORK
              </span>
            </div>
            <h3 className="text-4xl sm:text-6xl font-display font-black tracking-tight uppercase leading-tight mb-4">
              FULL STACK <br />
              <span className="text-zinc-400">DEVELOPER</span>
            </h3>
            <p className="text-xs sm:text-sm font-mono-tech leading-relaxed text-zinc-300 max-w-xl">
              Building premium web experiences and AI-driven applications. Specializing in interactive frontends, offline LLM agent systems (Ollama), and scalable database architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/[0.08] mt-8">
            <div>
              <span className="text-[10px] font-mono-tech tracking-[0.16em] text-white/40 block mb-1">
                DELIVERY
              </span>
              <p className="text-xs font-mono-tech text-zinc-300 leading-snug">
                Delivered 20+ applications across web, AI, voice, and vision.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono-tech tracking-[0.16em] text-white/40 block mb-1">
                ARCHITECTURE
              </span>
              <p className="text-xs font-mono-tech text-zinc-300 leading-snug">
                Engineered local inference pipelines, REST APIs, and MongoDB schemas.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono-tech tracking-[0.16em] text-white/40 block mb-1">
                MODERN STACK
              </span>
              <p className="text-xs font-mono-tech text-zinc-300 leading-snug">
                React, Next.js, GSAP, Python, OpenCV, Ollama, Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Pill Toggles */}
      <div className="relative z-30 w-full px-8 sm:px-14 pb-8 flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-full border border-white/10">
          <button
            onClick={() => jumpToSlide(1, 'learning')}
            className={`px-4 py-1.5 rounded-full text-[11px] font-mono-tech tracking-[0.14em] transition-all cursor-pointer ${
              activeTab === 'learning'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            LEARNING
          </button>
          <button
            onClick={() => jumpToSlide(2, 'leadership')}
            className={`px-4 py-1.5 rounded-full text-[11px] font-mono-tech tracking-[0.14em] transition-all cursor-pointer ${
              activeTab === 'leadership'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            LEADERSHIP
          </button>
          <button
            onClick={() => jumpToSlide(3, 'freelance')}
            className={`px-4 py-1.5 rounded-full text-[11px] font-mono-tech tracking-[0.14em] transition-all cursor-pointer ${
              activeTab === 'freelance'
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            FREELANCE
          </button>
        </div>

        <div className="hidden sm:block text-[11px] font-mono-tech text-zinc-500 tracking-[0.14em]">
          DRAG OR SCROLL TO NAVIGATE →
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marqueeScroll 35s linear infinite;
        }
      `}</style>
    </section>
  );
};
