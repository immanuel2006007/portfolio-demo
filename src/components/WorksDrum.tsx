import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface WorksDrumProps {
  onSelectProject: (project: Project) => void;
}

export const WorksDrum: React.FC<WorksDrumProps> = ({ onSelectProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  const total = PROJECTS.length;

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=320%',
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  // Morph factor: 0 in Phase A (0%–45%), transitions to 1 in Phase B (45%–60%), stays 1 (60%–100%)
  const morph = gsap.utils.clamp(0, 1, (scrollProgress - 0.45) / 0.15);
  const isDrumPhase = scrollProgress > 0.45;

  // Hexagonal wheel rotation driven by scroll (0%–45%)
  const scrollRotation = (scrollProgress / 0.45) * 180;

  // Cylindrical drum cycle progress driven by scroll (55%–100%) + manual drag
  const drumCycleProgress = isDrumPhase
    ? Math.max((scrollProgress - 0.55) / 0.45, 0) * (total - 1) + dragOffset
    : 0;

  const activeIndex = gsap.utils.clamp(
    0,
    total - 1,
    Math.round(drumCycleProgress)
  );
  const activeProject = PROJECTS[activeIndex];

  // Pointer drag support for direct drum manipulation
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDrumPhase) return;
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = (startY - e.clientY) / 120;
    setDragOffset((prev) => gsap.utils.clamp(-activeIndex, total - 1 - activeIndex, prev + diff * 0.08));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="works"
      ref={containerRef}
      className="relative h-screen w-full bg-[#F5F5F3] text-black flex flex-col justify-between py-10 sm:py-14 px-6 sm:px-14 overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Header */}
      <div className="w-full flex items-center justify-between border-b border-black/[0.08] pb-4 z-20 pointer-events-none">
        <div>
          <span className="text-[10px] font-mono-tech tracking-[0.2em] text-zinc-400 block mb-0.5">
            SELECTED ARCHIVE
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight uppercase">
            WORKS '26
          </h2>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative flex-1 flex items-center justify-between my-auto w-full max-w-7xl mx-auto py-6">
        {/* Left Side: Active Project Title in Drum Mode */}
        <div
          className="w-1/4 hidden lg:flex flex-col justify-center z-20 transition-opacity duration-500"
          style={{ opacity: morph > 0.4 ? 1 : 0 }}
        >
          <span className="text-[10px] font-mono-tech tracking-[0.2em] text-zinc-400 block mb-2">
            PROJECT 0{activeIndex + 1}
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-black tracking-tight uppercase leading-tight text-black">
            {activeProject.title}
          </h3>
          <p className="text-xs font-mono-tech text-zinc-600 mt-2 line-clamp-3">
            {activeProject.subtitle}
          </p>
        </div>

        {/* Center Canvas / 3D Perspective Stage */}
        <div className="relative flex-1 flex items-center justify-center h-[520px] perspective-[1400px]">
          {/* Centered WORKS '26 typography for Hexagon mode (fades out as morph proceeds) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-opacity duration-300"
            style={{ opacity: 1 - morph }}
          >
            <span className="font-display font-black text-3xl sm:text-4xl tracking-tight uppercase text-black">
              WORKS '26
            </span>
          </div>

          {/* 6 Project Cards Interpolating from 2D Hexagonal Ring to 3D Vertical Drum */}
          <div className="relative w-[340px] sm:w-[460px] h-[460px] flex items-center justify-center transform-style-3d">
            {PROJECTS.map((project, i) => {
              // --- Phase A: 2D Hexagonal Wheel (radius: 250px) ---
              const hexAngle = ((i * 60 + scrollRotation) * Math.PI) / 180;
              const radius = window.innerWidth < 640 ? 165 : 250;
              const hexX = Math.cos(hexAngle) * radius;
              const hexY = Math.sin(hexAngle) * radius;
              const hexZ = 0;
              const hexRotateZ = i * 60 + scrollRotation + 90;
              const hexRotateX = 0;
              const hexScale = 0.58;

              // --- Phase B: 3D Cylindrical Vertical Drum ---
              // translate3d(0, sin(theta) * 220px, cos(theta) * 220px - 220px) rotateX(theta)
              const offset = i - drumCycleProgress;
              const theta = offset * 0.62; // in radians
              const drumX = 0;
              const drumY = Math.sin(theta) * 220;
              const drumZ = Math.cos(theta) * 220 - 220;
              const drumRotateX = -theta * (180 / Math.PI);
              const drumRotateZ = 0;
              const drumScale = 1 - Math.min(Math.abs(offset) * 0.15, 0.42);

              // --- Smooth GSAP Interpolation ---
              const currentX = gsap.utils.interpolate(hexX, drumX, morph);
              const currentY = gsap.utils.interpolate(hexY, drumY, morph);
              const currentZ = gsap.utils.interpolate(hexZ, drumZ, morph);
              const currentRotateX = gsap.utils.interpolate(hexRotateX, drumRotateX, morph);
              const currentRotateZ = gsap.utils.interpolate(hexRotateZ, drumRotateZ, morph);
              const currentScale = gsap.utils.interpolate(hexScale, drumScale, morph);

              const isCurrent = activeIndex === i;
              const drumOpacity = 1 - Math.min(Math.abs(offset) * 0.36, 0.72);
              const opacity = gsap.utils.interpolate(0.95, drumOpacity, morph);
              const zIndex = Math.round(30 - Math.abs(offset) * 5);

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`absolute w-[300px] sm:w-[420px] h-[190px] sm:h-[240px] rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300 cursor-pointer ${
                    isDrumPhase && isCurrent
                      ? 'ring-2 ring-black z-30'
                      : 'hover:brightness-105'
                  }`}
                  style={{
                    transform: `translate3d(${currentX}px, ${currentY}px, ${currentZ}px) rotateX(${currentRotateX}deg) rotateZ(${currentRotateZ}deg) scale(${currentScale})`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="relative w-full h-full bg-black group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
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
        </div>

        {/* Right Sidebar: Vertical Index List with Underline */}
        <div className="w-1/4 hidden md:flex flex-col items-end justify-center z-20 space-y-3.5">
          {PROJECTS.map((project, i) => {
            const isCurrent = activeIndex === i;
            return (
              <button
                key={`idx-${project.id}`}
                onClick={() => onSelectProject(project)}
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
      <div className="w-full flex items-center justify-center z-20 pointer-events-none">
        <div className="px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-black/10 shadow-sm text-black text-[11px] font-mono-tech tracking-[0.14em] flex items-center space-x-2">
          <span>↓</span>
          <span>SCROLL OR DRAG DRUM TO CYCLE</span>
        </div>
      </div>
    </section>
  );
};
