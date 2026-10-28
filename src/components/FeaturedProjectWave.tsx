import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';

interface FeaturedProjectWaveProps {
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjectWave: React.FC<FeaturedProjectWaveProps> = ({
  onSelectProject,
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const totalCards = PROJECTS.length;

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (diff > 80) {
      prevCard();
      setIsDragging(false);
    } else if (diff < -80) {
      nextCard();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <section
      id="featured"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#F5F5F3] text-black flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-14 overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Header: FEATURED PROJECT */}
      <div className="w-full flex items-center justify-between border-b border-black/[0.08] pb-4 z-20">
        <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight uppercase">
          FEATURED PROJECT
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevCard}
            className="w-10 h-10 rounded-full border border-black/15 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm cursor-pointer"
            aria-label="Previous Project"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={nextCard}
            className="w-10 h-10 rounded-full border border-black/15 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm cursor-pointer"
            aria-label="Next Project"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 3D Sine Wave Ribbon Carousel Stage */}
      <div className="relative flex-1 flex items-center justify-center perspective-[1200px] my-6 py-8 overflow-visible">
        <div className="relative w-full max-w-5xl h-[380px] sm:h-[460px] flex items-center justify-center transform-style-3d">
          {PROJECTS.map((project, i) => {
            const offset = i - activeIndex;
            if (Math.abs(offset) > 3) return null;

            // 3D Sine-wave coordinates calculation
            const translateX = offset * 320;
            const translateZ = Math.cos(offset * 0.75) * 60 - Math.abs(offset) * 90;
            const translateY = Math.sin(offset * 1.2) * 28;
            const rotateY = -offset * 18;
            const rotateZ = Math.sin(offset * 0.8) * 3;
            const scale = 1 - Math.min(Math.abs(offset) * 0.12, 0.35);
            const opacity = 1 - Math.min(Math.abs(offset) * 0.28, 0.65);
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
                className={`absolute w-[290px] sm:w-[420px] h-[330px] sm:h-[390px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.18)] ${
                  isCenter ? 'ring-2 ring-black/80' : 'filter brightness-95'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                {/* Project Screenshot / Visual */}
                <div className="relative w-full h-full bg-[#0A0A0A] group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-6 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-tech tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono-tech text-white/60">
                        {`0${i + 1} / 0${totalCards}`}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight uppercase leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono-tech text-white/70 line-clamp-2 mt-1">
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

      {/* Dynamic Centered Caption */}
      <div className="text-center z-20 my-2">
        <p className="text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-widest text-zinc-900">
          {activeProject.category}
        </p>
        <p className="text-[11px] font-mono-tech text-zinc-500 tracking-wider mt-0.5">
          {activeProject.subtitle} — {`0${activeIndex + 1} / 0${totalCards}`}
        </p>
      </div>

      {/* Bottom Row: Pinned "LANDING PAGES" + Project Links */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between border-t border-black/[0.08] pt-4 z-20 gap-4">
        {/* Pinned Bottom-Left Title */}
        <h3 className="font-display font-black text-3xl sm:text-5xl tracking-[-0.03em] uppercase text-black">
          LANDING PAGES
        </h3>

        {/* Action button for active project */}
        <div className="flex items-center space-x-3">
          {activeProject.githubUrl && (
            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-black/15 bg-white text-black font-mono-tech text-xs tracking-wider font-semibold hover:bg-black hover:text-white transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <GithubIcon size={13} />
              <span>SOURCE</span>
            </a>
          )}
          <button
            onClick={() => onSelectProject(activeProject)}
            className="px-5 py-2 rounded-full bg-black text-white font-mono-tech text-xs tracking-wider font-bold hover:bg-zinc-800 transition-all flex items-center space-x-1.5 shadow-md cursor-pointer"
          >
            <span>VIEW CASE STUDY</span>
            <ExternalLink size={13} />
          </button>
        </div>
      </div>
    </section>
  );
};
