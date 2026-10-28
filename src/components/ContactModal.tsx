import React, { useState } from 'react';
import { X, Send, Mail, MessageSquare, Download, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = '',
}) => {
  const [submitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: defaultSubject || 'New Project Inquiry',
    message: '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#0c0c0e] border border-white/15 rounded-3xl overflow-hidden shadow-2xl text-white max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono-tech tracking-[0.2em] text-white/50">
              INITIATE COLLABORATION
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight mt-0.5">
              GET IN TOUCH
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Check size={28} />
              </div>
              <h4 className="text-2xl font-display font-black uppercase">
                MESSAGE DISPATCHED
              </h4>
              <p className="text-xs font-mono-tech text-zinc-400 max-w-sm">
                Thank you for reaching out. Immanuel will review your inquiry and respond within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 rounded-full bg-white text-black font-mono-tech text-xs font-bold"
              >
                CLOSE
              </button>
            </div>
          ) : (
            <>
              {/* Fast Connect Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-tech">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 flex items-center space-x-3 transition-colors"
                >
                  <Mail size={16} className="text-zinc-400" />
                  <div className="truncate">
                    <span className="text-[9px] text-zinc-500 block">EMAIL DIRECT</span>
                    <span className="text-white truncate block">{PERSONAL_INFO.email}</span>
                  </div>
                </a>
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 flex items-center space-x-3 transition-colors"
                >
                  <MessageSquare size={16} className="text-green-400" />
                  <div>
                    <span className="text-[9px] text-zinc-500 block">WHATSAPP CHAT</span>
                    <span className="text-white block">+91 72002 50544</span>
                  </div>
                </a>
              </div>

              {/* Contact Form */}
              <form
                action={`https://formsubmit.co/${PERSONAL_INFO.email}`}
                method="POST"
                className="space-y-4 pt-2"
              >
                <input type="hidden" name="_subject" value={formData.subject} />
                <input type="text" name="_honey" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono-tech text-zinc-400 block mb-1">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 text-xs font-mono-tech focus:outline-none focus:border-white transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono-tech text-zinc-400 block mb-1">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 text-xs font-mono-tech focus:outline-none focus:border-white transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono-tech text-zinc-400 block mb-1">
                    SUBJECT / PROJECT TYPE
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="New Website Design / AI Voice Integration"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 text-xs font-mono-tech focus:outline-none focus:border-white transition-colors"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono-tech text-zinc-400 block mb-1">
                    PROJECT DETAILS & TIMELINE
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your vision, goals, and timeline..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 text-xs font-mono-tech focus:outline-none focus:border-white transition-colors resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <a
                    href={PERSONAL_INFO.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono-tech text-zinc-400 hover:text-white flex items-center space-x-1.5 transition-colors"
                  >
                    <Download size={13} />
                    <span>DOWNLOAD RESUME (PDF)</span>
                  </a>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black font-mono-tech text-xs tracking-wider font-bold hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>SEND INQUIRY</span>
                    <Send size={13} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
