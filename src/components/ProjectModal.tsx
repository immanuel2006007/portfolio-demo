import React from 'react';
import { X, ExternalLink, Calendar, Tag, User } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#0c0c0e] border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono-tech tracking-[0.2em] text-white/50">
              {project.category}
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight mt-0.5">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Project Image */}
          <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-black border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Meta Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-xs font-mono-tech">
            <div className="flex items-center space-x-2">
              <User size={14} className="text-zinc-500" />
              <div>
                <span className="text-zinc-400 block text-[9px]">CLIENT</span>
                <span className="text-white font-medium">{project.client}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={14} className="text-zinc-500" />
              <div>
                <span className="text-zinc-400 block text-[9px]">TIMELINE</span>
                <span className="text-white font-medium">{project.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
              <Tag size={14} className="text-zinc-500" />
              <div>
                <span className="text-zinc-400 block text-[9px]">DOMAIN</span>
                <span className="text-white font-medium">{project.category}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-mono-tech tracking-wider text-zinc-400 uppercase mb-2">
              PROJECT OVERVIEW
            </h4>
            <p className="text-sm font-mono-tech leading-relaxed text-zinc-300">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-xs font-mono-tech tracking-wider text-zinc-400 uppercase mb-2">
              TECHNOLOGIES & ARCHITECTURE
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-[11px] font-mono-tech bg-white/10 border border-white/10 text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-white text-black font-mono-tech text-xs tracking-wider font-bold hover:bg-zinc-200 transition-all flex items-center space-x-2 shadow-lg"
              >
                <span>VIEW LIVE SITE</span>
                <ExternalLink size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full border border-white/20 bg-white/5 text-white font-mono-tech text-xs tracking-wider font-bold hover:bg-white hover:text-black transition-all flex items-center space-x-2"
              >
                <GithubIcon size={14} />
                <span>VIEW REPOSITORY</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
