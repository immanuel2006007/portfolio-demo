import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutPortal } from './components/AboutPortal';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { FeaturedProjectWave } from './components/FeaturedProjectWave';
import { WorksDrum } from './components/WorksDrum';
import { ServicesAccordion } from './components/ServicesAccordion';
import { FooterTalk } from './components/FooterTalk';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import type { Project } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('New Project Collaboration');

  // Initialize smooth Lenis scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
    };
  }, []);

  const handleScrollToAbout = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireService = (serviceTitle: string) => {
    setContactSubject(`Service Inquiry: ${serviceTitle}`);
    setContactModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0A] text-[#0A0A0A] font-body">
      {/* Section 1: Preloader / Intro Splash */}
      {!preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}

      {/* Floating Header Navbar */}
      <Navbar onOpenContact={() => setContactModalOpen(true)} />

      {/* Main Sections Flow */}
      <main className="relative w-full">
        {/* Section 2: Hero Section (Off-white) */}
        <Hero onScrollDown={handleScrollToAbout} />

        {/* Section 3: "ABOUT ME" Scroll-Expand Portal (Starry Night / Obsidian) */}
        <AboutPortal
          onOpenContact={() => setContactModalOpen(true)}
          onGoToServices={handleScrollToServices}
        />

        {/* Section 4: Horizontal-Scroll Experience Timeline (Obsidian Black) */}
        <ExperienceTimeline />

        {/* Section 5: "FEATURED PROJECT" & 3D Curved Wave Ribbon (Off-white) */}
        <FeaturedProjectWave onSelectProject={setSelectedProject} />

        {/* Section 6: "WORKS '26" Hexagonal Ring to 3D Vertical Drum (Off-white) */}
        <WorksDrum onSelectProject={setSelectedProject} />

        {/* Section 7: "THE SERVICES WE PROVIDE" Interactive Accordion (Off-white) */}
        <ServicesAccordion onInquire={handleInquireService} />

        {/* Section 8: "LET'S TALK" Footer (Obsidian Black) */}
        <FooterTalk onOpenContact={() => setContactModalOpen(true)} />
      </main>

      {/* Interactive Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Interactive Contact & Inquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        defaultSubject={contactSubject}
      />
    </div>
  );
}

export default App;
