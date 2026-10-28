import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1800; // 1.8s draw time

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 320;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const center = size / 2;
    const radius = 105;

    const render = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, size, size);

      // Faint guide circle
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Organic distorted waveform ring
      const endAngle = progress * Math.PI * 2 - Math.PI / 2;
      const points = 180;
      const steps = Math.floor(progress * points);

      if (steps > 0) {
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const theta = (i / points) * Math.PI * 2 - Math.PI / 2;
          // Organic sine/harmonic distortion
          const wave =
            Math.sin(theta * 6 + elapsed * 0.005) * 3.5 +
            Math.cos(theta * 3 - elapsed * 0.003) * 2;
          const r = radius + wave;
          const x = center + Math.cos(theta) * r;
          const y = center + Math.sin(theta) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset

        // Glowing leading particle dot
        const headTheta = endAngle;
        const headWave =
          Math.sin(headTheta * 6 + elapsed * 0.005) * 3.5 +
          Math.cos(headTheta * 3 - elapsed * 0.003) * 2;
        const headX = center + Math.cos(headTheta) * (radius + headWave);
        const headY = center + Math.sin(headTheta) * (radius + headWave);

        ctx.beginPath();
        ctx.arc(headX, headY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        // Trigger pulse once drawn
        setPulse(true);

        // Auto slide up to reveal Hero
        const tl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        tl.to(containerRef.current, {
          yPercent: -100,
          duration: 0.85,
          ease: 'power3.inOut',
          delay: 0.35,
        });
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] select-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Canvas for Organic Waveform Ring */}
        <canvas
          ref={canvasRef}
          className={`w-72 h-72 sm:w-80 sm:h-80 transition-transform duration-500 ${
            pulse ? 'scale-105' : 'scale-100'
          }`}
          style={{ width: '320px', height: '320px' }}
        />

        {/* Minimal Centered Wordmark ECHO. */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1
            className={`font-display font-black text-5xl sm:text-6xl text-white tracking-tight transition-transform duration-500 ${
              pulse ? 'scale-105 tracking-wider' : 'scale-100'
            }`}
          >
            ECHO<span className="text-white/40">.</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
