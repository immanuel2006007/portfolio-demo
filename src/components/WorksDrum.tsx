import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';

interface WorksDrumProps {
  onSelectProject: (project: Project) => void;
}

export const WorksDrum: React.FC<WorksDrumProps> = ({ onSelectProject }) => {
  const [phase, setPhase] = useState<'hex' | 'drum'>('hex');
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = PROJECTS.length;

  // Auto slow rotation for hexagon
  useEffect(() => {
    if (phase !== 'hex') return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.3) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  // Handle vertical drag to cycle drum
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientY - startY;
    if (diff > 50) {
      setActiveIndex((prev) => (prev - 1 + total) % total);
      setIsDragging(false);
    } else if (diff < -50) {
      setActiveIndex((prev) => (prev + 1) % total);
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 25) {
      if (e.deltaY > 0) {
        setActiveIndex((prev) => (prev + 1) % total);
      } else {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      }
    }
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <section
      id="works"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#F5F5F3] text-black flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-14 overflow-hidden select-none"
      onWheel={phase === 'drum' ? handleWheel : undefined}
    >
      {/* Top Header: Title & View Mode Toggle (Hexagon vs 3D Drum) */}
      <div className="w-full flex items-center justify-between border-b border-black/[0.08] pb-4 z-20">
        <div>
          <span className="text-[10px] font-mono-tech tracking-[0.2em] text-zinc-400 block mb-1">
            ARCHIVE & EXPERIMENTS
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight uppercase">
            WORKS '26
          </h2>
        </div>

        {/* Phase Toggle Badge (Hexagonal Ring <-> 3D Vertical Drum) */}
        <div className="flex items-center space-x-1 bg-black/5 p-1 rounded-full border border-black/10">
          <button
            onClick={() => setPhase('hex')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-mono-tech tracking-[0.14em] transition-all cursor-pointer ${
              phase === 'hex'
                ? 'bg-black text-white font-bold shadow-sm'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            HEXAGON WHEEL
          </button>
          <button
            onClick={() => setPhase('drum')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-mono-tech tracking-[0.14em] transition-all cursor-pointer ${
              phase === 'drum'
                ? 'bg-black text-white font-bold shadow-sm'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            3D VERTICAL DRUM
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative flex-1 flex items-center justify-between my-auto w-full max-w-7xl mx-auto py-8">
        {/* Left Side: Active Project Title in Drum Mode */}
        <div className="w-1/4 hidden lg:flex flex-col justify-center z-20">
          {phase === 'drum' ? (
            <div className="animate-fade-in">
              <span className="text-[10px] font-mono-tech tracking-[0.2em] text-zinc-400 block mb-2">
                PROJECT 0{activeIndex + 1}
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase leading-tight text-black">
                {activeProject.title}
              </h3>
              <p className="text-xs font-mono-tech text-zinc-600 mt-2 line-clamp-3">
                {activeProject.subtitle}
              </p>
              <button
                onClick={() => onSelectProject(activeProject)}
                className="mt-4 px-4 py-2 rounded-full bg-black text-white font-mono-tech text-[10px] tracking-wider font-bold hover:bg-zinc-800 transition-all inline-flex items-center space-x-1.5 cursor-pointer shadow-sm"
              >
                <span>OPEN PROJECT</span>
                <ExternalLink size={11} />
              </button>
            </div>
          ) : (
            <div className="text-zinc-400 text-xs font-mono-tech leading-relaxed">
              <Sparkles size={16} className="text-black mb-2 animate-spin-slow" />
              Hover or select any project on the wheel to inspect technical specifications.
            </div>
          )}
        </div>

        {/* Center Canvas / 3D Perspective Stage */}
        <div
          className="relative flex-1 flex items-center justify-center h-[460px] sm:h-[520px] perspective-[1500px]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Phase A: Rotating 6-sided Hexagonal Wheel around WORKS '26 */}
          {phase === 'hex' ? (
            <div className="relative w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] flex items-center justify-center">
              {/* Centered Typography: WORKS '26 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <span className="font-display font-black text-2xl sm:text-3xl tracking-tight uppercase text-black">
                  WORKS '26
                </span>
                <span className="text-[9px] font-mono-tech text-zinc-400 tracking-[0.2em] mt-1">
                  IMMANUEL JAYARUBAN
                </span>
              </div>

              {/* 6 Rectangular Project Screenshots arranged in Hexagon */}
              {PROJECTS.map((project, i) => {
                const baseAngle = (i * 360) / total;
                const currentAngle = (baseAngle + rotationAngle) * (Math.PI / 180);
                const radius = window.innerWidth < 640 ? 150 : 210;

                const x = Math.cos(currentAngle) * radius;
                const y = Math.sin(currentAngle) * radius;
                const cardRotation = (baseAngle + rotationAngle) + 90;

                const isCurrent = activeIndex === i;

                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      setActiveIndex(i);
                      onSelectProject(project);
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`absolute w-28 sm:w-36 h-20 sm:h-24 rounded-xl overflow-hidden cursor-pointer shadow-lg transition-transform duration-300 ${
                      isCurrent ? 'ring-2 ring-black scale-110 z-20' : 'opacity-85 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px) rotate(${cardRotation}deg)`,
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-[9px] font-mono-tech font-bold p-1 text-center">
                      <span className="truncate">{project.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Phase B: 3D Cylindrical Vertical Drum Stack */
            <div className="relative w-[300px] sm:w-[460px] h-[440px] flex items-center justify-center transform-style-3d cursor-grab active:cursor-grabbing">
              {PROJECTS.map((project, i) => {
                let offset = i - activeIndex;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                const translateY = offset * 135;
                const translateZ = -Math.abs(offset) * 90;
                const rotateX = -offset * 32;
                const scale = 1 - Math.min(Math.abs(offset) * 0.15, 0.4);
                const opacity = 1 - Math.min(Math.abs(offset) * 0.35, 0.7);
                const zIndex = 30 - Math.abs(offset) * 5;

                const isCenter = offset === 0;

                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      if (isCenter) {
                        onSelectProject(project);
                      } else {
                        setActiveIndex(i);
                      }
                    }}
                    className={`absolute w-[300px] sm:w-[420px] h-[190px] sm:h-[240px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer ${
                      isCenter ? 'ring-2 ring-black z-30' : 'filter brightness-90 hover:brightness-100'
                    }`}
                    style={{
                      transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                    }}
                  >
                    <div className="relative w-full h-full bg-black group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top opacity-85 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 sm:p-5 text-white">
                        <span className="text-[10px] font-mono-tech tracking-wider text-white/70">
                          {project.category}
                        </span>
                        <div>
                          <h4 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
                            {project.title}
                          </h4>
                          <p className="text-[11px] font-mono-tech text-white/60 truncate">
                            {project.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Sidebar: Vertical Index List with Underline */}
        <div className="w-1/4 hidden md:flex flex-col items-end justify-center z-20 space-y-3">
          {PROJECTS.map((project, i) => {
            const isCurrent = activeIndex === i;
            return (
              <button
                key={`idx-${project.id}`}
                onClick={() => setActiveIndex(i)}
                className="group flex items-center space-x-2 text-right cursor-pointer"
              >
                <span
                  className={`text-xs font-mono-tech tracking-wider transition-all duration-300 ${
                    isCurrent
                      ? 'text-black font-bold border-b-2 border-black pb-0.5'
                      : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  {project.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Pill Badge: ↓ SCROLL OR DRAG DRUM TO CYCLE */}
      <div className="w-full flex items-center justify-center z-20">
        <div className="px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-sm text-black text-[11px] font-mono-tech tracking-[0.14em] flex items-center space-x-2">
          <span>↓</span>
          <span>SCROLL OR DRAG DRUM TO CYCLE</span>
        </div>
      </div>
    </section>
  );
};
