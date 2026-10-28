import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { loadSafeProjectTexture } from '../utils/proceduralTexture';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedProjectWaveProps {
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjectWave: React.FC<FeaturedProjectWaveProps> = ({
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<Project>(PROJECTS[1]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(1);
  const [scrollNorm, setScrollNorm] = useState(0);
  const [webGLFailed, setWebGLFailed] = useState(false);

  // 1. WebGL 3D Sine Wave Implementation with Safe Canvas Texture Fallback
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationId: number;

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf5f5f3);

      const camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        100
      );
      camera.position.z = 6.0;

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // Custom Vertex Shader with smooth 3D sine-wave deformation
      const vertexShader = `
        uniform float uScroll;
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Smooth 3D sine-wave bending across horizontal space
          pos.y += sin(pos.x * 0.6 + uScroll) * 0.45;
          pos.z += cos(pos.x * 0.5 + uScroll) * 0.35;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `;

      const fragmentShader = `
        uniform sampler2D uTexture;
        uniform float uOpacity;
        varying vec2 vUv;
        
        void main() {
          vec4 color = texture2D(uTexture, vUv);
          // Soft edge vignette
          float d = distance(vUv, vec2(0.5));
          color.rgb *= (1.0 - d * 0.25);
          gl_FragColor = vec4(color.rgb, color.a * uOpacity);
        }
      `;

      const cardMeshes: THREE.Mesh[] = [];
      const ribbonGroup = new THREE.Group();
      scene.add(ribbonGroup);

      const cardWidth = 3.2;
      const cardHeight = 2.0;
      const cardSpacing = 3.8;

      // Safe texture loading with procedural fallback
      PROJECTS.forEach((project, index) => {
        const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 64, 64);

        const safeTexture = loadSafeProjectTexture(project, (updatedTex) => {
          if (material) {
            material.uniforms.uTexture.value = updatedTex;
          }
        });

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uScroll: { value: 0 },
            uTime: { value: 0 },
            uTexture: { value: safeTexture },
            uOpacity: { value: 0.96 },
          },
          side: THREE.DoubleSide,
          transparent: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (index - 1) * cardSpacing;
        mesh.userData = { index, project };
        ribbonGroup.add(mesh);
        cardMeshes.push(mesh);
      });

      let currentScroll = 0;
      let targetScroll = 0;

      // Pinned 280vh GSAP ScrollTrigger Sequence
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollNorm(progress);

          // Entry 0%–20%: Fade heading
          if (headingRef.current) {
            headingRef.current.style.opacity = progress < 0.2 ? `${1 - progress / 0.2}` : '0';
          }

          // WebGL Wave Ribbon scroll
          const maxScrollDist = (PROJECTS.length - 1) * cardSpacing;
          targetScroll = progress * maxScrollDist;
        },
      });

      const clock = new THREE.Clock();

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth interpolation
        currentScroll += (targetScroll - currentScroll) * 0.085;
        ribbonGroup.position.x = -currentScroll;

        cardMeshes.forEach((mesh) => {
          const mat = mesh.material as THREE.ShaderMaterial;
          mat.uniforms.uScroll.value = currentScroll * 0.45;
          mat.uniforms.uTime.value = elapsedTime;

          // Detect active card closest to center x = 0
          const worldPos = new THREE.Vector3();
          mesh.getWorldPosition(worldPos);
          if (Math.abs(worldPos.x) < cardSpacing / 2) {
            const idx = mesh.userData.index;
            if (idx !== activeProjectIndex) {
              setActiveProjectIndex(idx);
              setActiveProject(mesh.userData.project);
            }
          }
        });

        renderer?.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!canvas || !renderer) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        st.kill();
        renderer?.dispose();
        cardMeshes.forEach((m) => {
          m.geometry.dispose();
          (m.material as THREE.Material).dispose();
        });
      };
    } catch {
      // Fallback gracefully to CSS 3D if WebGL is unavailable
      setWebGLFailed(true);
    }
  }, [activeProjectIndex]);

  return (
    <section
      id="featured"
      ref={containerRef}
      className="relative h-screen w-full bg-[#F5F5F3] text-black flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Top Header: FEATURED PROJECT (fades out during entry 0%–20%) */}
      <div
        ref={headingRef}
        className="absolute top-10 left-8 sm:left-14 z-30 transition-opacity duration-300 pointer-events-none"
      >
        <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight uppercase text-black">
          FEATURED PROJECT
        </h2>
      </div>

      {/* Main 3D Wave Ribbon Stage */}
      {!webGLFailed ? (
        /* WebGL Canvas View */
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-pointer"
            onClick={() => onSelectProject(activeProject)}
          />
        </div>
      ) : (
        /* CSS 3D Fallback View: Bends cards along exact smooth sine wave */
        <div className="absolute inset-0 w-full h-full flex items-center justify-center perspective-[1400px] overflow-hidden">
          <div className="relative w-full max-w-6xl h-[420px] flex items-center justify-center transform-style-3d">
            {PROJECTS.map((project, i) => {
              const totalScroll = scrollNorm * (PROJECTS.length - 1);
              const offset = i - totalScroll;
              if (Math.abs(offset) > 3) return null;

              const x = offset * 340;
              const y = Math.sin(offset * 0.6 + scrollNorm * 4) * 60;
              const z = Math.cos(offset * 0.5 + scrollNorm * 4) * 80 - Math.abs(offset) * 60;
              const rotateY = -offset * 18;
              const rotateZ = Math.cos(offset * 0.6 + scrollNorm * 4) * 12;
              const scale = 1 - Math.min(Math.abs(offset) * 0.12, 0.35);
              const opacity = 1 - Math.min(Math.abs(offset) * 0.28, 0.65);

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="absolute w-[360px] h-[230px] rounded-2xl overflow-hidden shadow-2xl bg-black cursor-pointer transition-all duration-300"
                  style={{
                    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                    opacity,
                    zIndex: Math.round(30 - Math.abs(offset) * 5),
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-between text-white">
                    <span className="text-[10px] font-mono-tech tracking-wider text-white/70">
                      {project.category}
                    </span>
                    <div>
                      <h4 className="font-display font-black text-xl uppercase tracking-tight">
                        {project.title}
                      </h4>
                      <p className="text-[11px] font-mono-tech text-white/60 truncate">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Dynamic Project Title & Subtitle based on card closest to center */}
      <div className="absolute top-[75%] inset-x-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-6">
        <p className="text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-widest text-zinc-900">
          {activeProject.category}
        </p>
        <p className="text-[11px] sm:text-xs font-mono-tech text-zinc-500 tracking-wider mt-1 max-w-lg">
          {activeProject.title} — {activeProject.subtitle}
        </p>
      </div>

      {/* Pinned Bottom-Left: LANDING PAGES */}
      <div className="absolute bottom-8 left-8 sm:left-14 z-20 pointer-events-none">
        <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-[-0.03em] uppercase text-black leading-none">
          LANDING PAGES
        </h3>
      </div>
    </section>
  );
};
