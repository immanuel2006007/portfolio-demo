import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesAccordionProps {
  onInquire: (serviceTitle: string) => void;
}

export const ServicesAccordion: React.FC<ServicesAccordionProps> = ({
  onInquire,
}) => {
  // Service 3 (AI & Intelligent Agents / Landing Pages) is expanded by default as in prompt
  const [expandedId, setExpandedId] = useState<string>('srv-3');

  const toggleService = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="services"
      className="relative min-h-screen w-full bg-[#F5F5F3] text-black flex flex-col justify-center py-20 px-6 sm:px-14 select-none"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Header: Centered Title + Subtitle */}
        <div className="text-center max-w-2xl mb-14">
          <span className="text-[10px] font-mono-tech tracking-[0.2em] text-zinc-400 block mb-2">
            SPECIALIZATIONS & CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight uppercase text-black">
            THE SERVICES WE PROVIDE
          </h2>
          <p className="text-xs sm:text-sm font-mono-tech leading-relaxed text-zinc-600 mt-4 uppercase">
            CREATING VISUALLY APPEALING AND FUNCTIONAL WEBSITES TAILORED TO THE CLIENT'S NEEDS AND GOALS. PROVIDING A CONSISTENT USER EXPERIENCE ACROSS PLATFORMS.
          </p>
        </div>

        {/* Accordion Stack (max-w 900px) */}
        <div className="w-full flex flex-col space-y-4">
          {SERVICES.map((service) => {
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`w-full rounded-2xl transition-all duration-500 overflow-hidden cursor-pointer ${
                  isExpanded
                    ? 'bg-[#0A0A0A] text-white shadow-2xl p-6 sm:p-8'
                    : 'bg-white/80 hover:bg-white text-black border border-black/8 hover:border-black/20 shadow-sm p-5 sm:p-6'
                }`}
              >
                {/* Accordion Header Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <span
                      className={`text-sm sm:text-base font-mono-tech font-bold ${
                        isExpanded ? 'text-zinc-400' : 'text-zinc-500'
                      }`}
                    >
                      {service.number} —
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isExpanded
                        ? 'bg-white/10 text-white rotate-180'
                        : 'bg-black/5 text-black'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-white/10 flex flex-col space-y-6 animate-fade-in">
                    <p className="text-xs sm:text-sm font-mono-tech leading-relaxed text-zinc-300 max-w-2xl">
                      {service.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-2">
                      {/* Bottom-Left Deliverables */}
                      <div className="max-w-md">
                        <span className="text-[10px] font-mono-tech tracking-[0.16em] text-zinc-400 block mb-1">
                          DELIVERABLES:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {service.deliverables.map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-zinc-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom-Right Inquire CTA */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInquire(service.title);
                        }}
                        className="px-6 py-2.5 rounded-full bg-white text-black font-mono-tech text-xs tracking-wider font-bold hover:bg-zinc-200 transition-all flex items-center space-x-1.5 shadow-md cursor-pointer self-end sm:self-auto"
                      >
                        <span>INQUIRE</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
