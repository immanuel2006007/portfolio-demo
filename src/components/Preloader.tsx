import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Waveform ring draws from 0s to 1.6s
    const pulseTimer = setTimeout(() => {
      setPulse(true);
    }, 1500);

    // Pulse and fade out by 2.2s
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2200);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] transition-opacity duration-700 pointer-events-auto ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={() => {
        setIsExiting(true);
        setTimeout(onComplete, 400);
      }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Morphing SVG Waveform Ring */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          <svg
            className={`w-full h-full transform -rotate-90 transition-transform duration-700 ${
              pulse ? 'scale-110 filter drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]' : 'scale-100'
            }`}
            viewBox="0 0 200 200"
          >
            {/* Background subtle ring */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.5"
            />

            {/* Organic waveform ring with dash animation */}
            <path
              d="M 100, 20
                 A 80, 80 0 1, 0 100, 180
                 A 80, 80 0 1, 0 100, 20"
              fill="none"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-draw-ring"
              style={{
                strokeDasharray: 502,
                strokeDashoffset: 0,
                animation: 'drawRing 1.8s cubic-bezier(0.65, 0, 0.35, 1) forwards',
              }}
            />

            {/* Outer wavy organic aura */}
            <path
              d="M 100, 10
                 Q 130, 25 155, 45
                 Q 185, 75 190, 100
                 Q 185, 135 155, 160
                 Q 125, 190 100, 190
                 Q 65, 190 40, 160
                 Q 10, 130 10, 100
                 Q 15, 65 45, 40
                 Q 75, 10 100, 10 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1"
              strokeDasharray="6 4"
              className="animate-spin-slow opacity-60"
            />
          </svg>

          {/* Centered Wordmark ECHO. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
            <h1
              className={`text-5xl sm:text-6xl font-black font-display tracking-tight text-white transition-all duration-700 ${
                pulse ? 'scale-105 tracking-wider' : 'scale-100'
              }`}
            >
              ECHO<span className="text-white/40">.</span>
            </h1>
            <p className="mt-2 text-[10px] tracking-[0.3em] font-mono-tech text-white/60">
              IMMANUEL JAYARUBAN
            </p>
          </div>
        </div>

        {/* Bottom subtle indicator */}
        <div className="absolute -bottom-16 text-center">
          <p className="text-[10px] font-mono-tech tracking-[0.2em] text-white/30 animate-pulse">
            CLICK ANYWHERE TO SKIP
          </p>
        </div>
      </div>

      <style>{`
        @keyframes drawRing {
          0% {
            stroke-dashoffset: 502;
            opacity: 0.2;
          }
          60% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

