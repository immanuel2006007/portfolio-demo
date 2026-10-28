import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { InstagramIcon, TwitterIcon, LinkedinIcon, GithubIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'featured', 'works', 'services'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT ME' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'featured', label: 'PROJECTS' },
    { id: 'works', label: 'LANDING PAGES' },
    { id: 'services', label: 'SERVICES' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand Wordmark */}
        <div
          onClick={() => scrollTo('home')}
          className="cursor-pointer group flex items-center space-x-2"
        >
          <span className="font-display font-black text-xl tracking-tight text-black group-hover:opacity-70 transition-opacity">
            ECHO<span className="text-zinc-400"> •</span>
          </span>
          <span className="hidden md:inline-block text-[10px] font-mono-tech text-zinc-500 tracking-[0.2em]">
            IMMANUEL
          </span>
        </div>

        {/* Center Floating Pill Menu */}
        <nav className="hidden lg:flex items-center space-x-1 sm:space-x-2 bg-white/75 backdrop-blur-md border border-black/10 shadow-[0_2px_15px_rgba(0,0,0,0.04)] px-5 py-2 rounded-full">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-3 py-1 text-[11px] font-mono-tech tracking-[0.14em] transition-all rounded-full ${
                activeSection === link.id
                  ? 'text-black font-bold bg-black/5'
                  : 'text-zinc-600 hover:text-black hover:bg-black/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right: Circular Icon Buttons + Mobile Menu Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a
            href={PERSONAL_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="w-9 h-9 rounded-full border border-black/15 bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
          >
            <InstagramIcon size={14} />
          </a>
          <a
            href={PERSONAL_INFO.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            title="X / Twitter"
            className="w-9 h-9 rounded-full border border-black/15 bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
          >
            <TwitterIcon size={14} />
          </a>
          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="w-9 h-9 rounded-full border border-black/15 bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
          >
            <LinkedinIcon size={14} />
          </a>
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="w-9 h-9 rounded-full border border-black/15 bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
          >
            <GithubIcon size={14} />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full border border-black/15 bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-sm"
          >
            {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-sm mx-auto bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl p-4 shadow-xl flex flex-col space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-left px-4 py-2.5 text-xs font-mono-tech tracking-[0.14em] rounded-lg transition-colors ${
                activeSection === link.id
                  ? 'bg-black text-white font-bold'
                  : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="mt-2 w-full py-2.5 text-xs font-mono-tech tracking-[0.14em] bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            CONTACT ME ↗
          </button>
        </div>
      )}
    </header>
  );
};
