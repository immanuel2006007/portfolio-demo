import React from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterTalkProps {
  onOpenContact: () => void;
}

export const FooterTalk: React.FC<FooterTalkProps> = ({ onOpenContact }) => {
  return (
    <footer
      id="contact"
      className="relative min-h-[75vh] w-full bg-[#0A0A0A] text-white flex flex-col justify-between pt-24 pb-8 px-6 sm:px-14 select-none overflow-hidden"
    >
      {/* Subtle background ambient radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Centerpiece: Massive "LET'S TALK" */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto">
        <span className="text-[11px] font-mono-tech tracking-[0.25em] text-zinc-400 block mb-3 uppercase">
          HAVE A VISION IN MIND?
        </span>

        {/* Massive Headline with Metallic Radial Sheen */}
        <h2
          className="font-display font-black text-[15vw] sm:text-[13vw] lg:text-[11rem] tracking-[-0.04em] uppercase leading-[0.8] select-none transition-all duration-700 bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent hover:brightness-125"
        >
          LET'S TALK
        </h2>

        {/* CTA Row: 4 Outlined Pills + 1 Solid White Glowing Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-8 sm:mt-12 max-w-3xl">
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

        {/* Direct Contact Micro-Info */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs font-mono-tech text-zinc-400">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center space-x-1.5 hover:text-white transition-colors"
          >
            <Mail size={13} />
            <span>{PERSONAL_INFO.email}</span>
          </a>
          <a
            href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
            className="flex items-center space-x-1.5 hover:text-white transition-colors"
          >
            <Phone size={13} />
            <span>{PERSONAL_INFO.phone}</span>
          </a>
          <span className="flex items-center space-x-1.5 text-zinc-400">
            <MapPin size={13} />
            <span>{PERSONAL_INFO.location}</span>
          </span>
          <a
            href={PERSONAL_INFO.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            <Download size={13} />
            <span>DOWNLOAD CV</span>
          </a>
        </div>
      </div>

      {/* Bottom Bar: Copyright and Attribution */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-white/[0.08] pt-6 mt-12 gap-3 text-[11px] font-mono-tech text-zinc-400">
        <div>PORTFOLIO. ALL RIGHTS RESERVED © 2025</div>
        <div className="text-zinc-400 font-semibold">{PERSONAL_INFO.name}</div>
        <div>DESIGN BY JISHNU MONDAL • CRAFTED BY IMMANUEL</div>
      </div>
    </footer>
  );
};

