import * as THREE from 'three';
import type { Project } from '../data/portfolioData';

/**
 * Creates a guaranteed, high-craft procedural CanvasTexture for a project.
 * Renders high-contrast editorial typography, dark brutalist gradient background,
 * project category badges, and technical tags onto an offscreen canvas.
 */
export function createProjectCanvasTexture(
  project: Project,
  width = 640,
  height = 400
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 1. Dark brutalist background with subtle radial gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#141416');
    grad.addColorStop(0.5, '#0a0a0c');
    grad.addColorStop(1, '#050506');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const step = 32;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 3. Top border accent line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(0, 0, width, 2);

    // 4. Category Pill Badge at Top-Left
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    const badgeW = 200;
    const badgeH = 26;
    ctx.beginPath();
    ctx.roundRect(36, 36, badgeW, badgeH, 13);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();

    ctx.fillStyle = '#E4E4E7';
    ctx.font = '600 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(project.category.toUpperCase(), 36 + badgeW / 2, 53);

    // 5. Date at Top-Right
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '500 11px monospace';
    ctx.fillText(project.date.toUpperCase(), width - 36, 53);

    // 6. Giant Editorial Project Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 32px sans-serif';
    ctx.fillText(project.title, 36, height - 110);

    // 7. Subtitle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '400 13px monospace';
    const sub = project.subtitle.length > 55 ? project.subtitle.substring(0, 52) + '...' : project.subtitle;
    ctx.fillText(sub, 36, height - 80);

    // 8. Tech tags row at bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '500 10px monospace';
    const tagsText = project.technologies.slice(0, 4).join(' • ');
    ctx.fillText(tagsText.toUpperCase(), 36, height - 36);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Safely loads an image texture with automatic fallback to procedural canvas texture.
 */
export function loadSafeProjectTexture(
  project: Project,
  onLoaded?: (tex: THREE.Texture) => void
): THREE.Texture {
  const fallbackTexture = createProjectCanvasTexture(project);

  if (typeof window === 'undefined' || !project.image) {
    return fallbackTexture;
  }

  const loader = new THREE.TextureLoader();
  loader.load(
    project.image,
    (loadedTex) => {
      loadedTex.generateMipmaps = true;
      loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
      loadedTex.needsUpdate = true;
      if (onLoaded) onLoaded(loadedTex);
    },
    undefined,
    () => {
      // On error, silently fallback to crisp procedural texture
      if (onLoaded) onLoaded(fallbackTexture);
    }
  );

  return fallbackTexture;
}
