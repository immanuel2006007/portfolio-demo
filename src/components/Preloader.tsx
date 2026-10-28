import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgPath, setSvgPath] = useState('');
  const [particlePos, setParticlePos] = useState<{ x: number; y: number } | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const dismissedRef = useRef(false);

  const finishPreloader = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          document.body.style.overflow = 'auto';
          setIsDismissed(true);
          onComplete();
        },
      });
    } else {
      document.body.style.overflow = 'auto';
      setIsDismissed(true);
      onComplete();
    }
  };

  useEffect(() => {
    // Initial body overflow lock
    document.body.style.overflow = 'hidden';

    // 1. Hard Fallback Timer: guarantees dismissal by 2.2s even if anything else stalls
    const hardFallback = setTimeout(() => {
      finishPreloader();
    }, 2200);

    // 2. 64-polar-point morphing SVG waveform animation
    let animationFrameId: number;
    let startTime: number | null = null;
    const drawDuration = 1600; // 1.6s draw duration
    const numPoints = 64;
    const baseR = 100;
    const center = 140;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = elapsed * 0.0035;
      const progress = Math.min(elapsed / drawDuration, 1);

      // Number of points to draw up to progress
      const visiblePoints = Math.max(Math.floor(progress * numPoints), 2);

      let d = '';
      let leadX = center;
      let leadY = center - baseR;

      for (let i = 0; i <= visiblePoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2;
        // Multi-frequency sine waves: r = baseR + sin(angle * 5 + t) * 8 + cos(angle * 3 - t) * 6
        const wave = Math.sin(angle * 5 + t) * 8 + Math.cos(angle * 3 - t) * 6;
        const r = baseR + wave;
        const x = center + Math.cos(angle) * r;
        const y = center + Math.sin(angle) * r;

        if (i === 0) {
          d += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
        } else {
          d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        }

        if (i === visiblePoints) {
          leadX = x;
          leadY = y;
        }
      }

      setSvgPath(d);
      setParticlePos({ x: leadX, y: leadY });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Complete ring drawn: trigger finish transition
        setTimeout(() => {
          finishPreloader();
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(hardFallback);
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Complete unmount from DOM when finished
  if (isDismissed) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] select-none pointer-events-auto"
      style={{ willChange: 'transform' }}
    >
      <div className="relative flex items-center justify-center">
        {/* Morphing Organic SVG Waveform Ring (280x280) */}
        <svg
          className="w-72 h-72 sm:w-80 sm:h-80 overflow-visible"
          viewBox="0 0 280 280"
        >
          {/* Faint reference guide ring */}
          <circle
            cx="140"
            cy="140"
            r="100"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
          />

          {/* Organic Morphing Path */}
          {svgPath && (
            <path
              d={svgPath}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.75))',
              }}
            />
          )}

          {/* Glowing Leading Particle Tip */}
          {particlePos && (
            <circle
              cx={particlePos.x}
              cy={particlePos.y}
              r="4.5"
              fill="#FFFFFF"
              style={{
                filter: 'drop-shadow(0 0 8px #fff) drop-shadow(0 0 16px #fff)',
              }}
            />
          )}
        </svg>

        {/* Minimal Centered Wordmark ECHO. */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight">
            ECHO<span className="text-white/40">.</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
