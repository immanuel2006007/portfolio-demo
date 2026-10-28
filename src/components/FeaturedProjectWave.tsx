import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f3);

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Custom Shader Material with Sine-Wave Vertex Displacement
    const vertexShader = `
      uniform float uScroll;
      uniform float uTime;
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Exact 3D sine-wave deformation specified in the prompt:
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
        // Vignette at edges
        float d = distance(vUv, vec2(0.5));
        color.rgb *= (1.0 - d * 0.3);
        gl_FragColor = vec4(color.rgb, color.a * uOpacity);
      }
    `;

    const textureLoader = new THREE.TextureLoader();
    const cardMeshes: THREE.Mesh[] = [];
    const ribbonGroup = new THREE.Group();
    scene.add(ribbonGroup);

    const cardWidth = 3.2;
    const cardHeight = 2.0;
    const cardSpacing = 3.8;

    // Create a mesh for each project
    PROJECTS.forEach((project, index) => {
      const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 64, 64);
      const texture = textureLoader.load(project.image);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uScroll: { value: 0 },
          uTime: { value: 0 },
          uTexture: { value: texture },
          uOpacity: { value: 0.95 },
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

    // Pinned 300vh GSAP ScrollTrigger Sequence
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;

        // Entry 0% - 20%: Fade heading
        if (headingRef.current) {
          if (progress < 0.2) {
            headingRef.current.style.opacity = `${1 - progress / 0.2}`;
          } else {
            headingRef.current.style.opacity = '0';
          }
        }

        // WebGL Wave Ribbon scroll (20% - 100%)
        // Translate entire ribbon horizontally across viewport
        const maxScrollDist = (PROJECTS.length - 1) * cardSpacing;
        targetScroll = progress * maxScrollDist;
      },
    });

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll interpolation
      currentScroll += (targetScroll - currentScroll) * 0.08;

      // Update shader uniforms & ribbon position
      ribbonGroup.position.x = -currentScroll;

      cardMeshes.forEach((mesh) => {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uScroll.value = currentScroll * 0.45;
        mat.uniforms.uTime.value = elapsedTime;

        // Check which card is closest to center (world x = 0)
        const worldPos = new THREE.Vector3();
        mesh.getWorldPosition(worldPos);
        const distToCenter = Math.abs(worldPos.x);

        if (distToCenter < cardSpacing / 2) {
          const idx = mesh.userData.index;
          if (idx !== activeProjectIndex) {
            setActiveProjectIndex(idx);
            setActiveProject(mesh.userData.project);
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
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
      renderer.dispose();
      cardMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
    };
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

      {/* WebGL Canvas for 3D Wave Ribbon */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-pointer"
          onClick={() => onSelectProject(activeProject)}
        />
      </div>

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
