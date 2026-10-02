import * as THREE from 'three';

/**
 * Procedural High-Resolution Architectural Textures
 * Creates canvas textures for board-formed concrete, Roman travertine,
 * Calacatta marble, fluted timber, and fabric weave.
 * 100% self-contained: 0 external image dependencies, zero network latency.
 */

// Cache textures so we don't recreate them every render
const textureCache = {};

export function getConcreteTexture() {
  if (textureCache.concrete) return textureCache.concrete;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base concrete color
  ctx.fillStyle = '#CFC8BD';
  ctx.fillRect(0, 0, 512, 512);

  // Horizontal board-form plank lines
  const plankHeight = 64;
  for (let y = 0; y < 512; y += plankHeight) {
    // Plank seam
    ctx.strokeStyle = 'rgba(70, 65, 58, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();

    // Wood grain lines inside each plank
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(140, 130, 118, ${0.08 + Math.random() * 0.08})`;
      ctx.lineWidth = 1 + Math.random();
      ctx.beginPath();
      const waveY = y + 8 + i * 9;
      ctx.moveTo(0, waveY);
      ctx.bezierCurveTo(128, waveY + (Math.random() * 6 - 3), 384, waveY + (Math.random() * 6 - 3), 512, waveY);
      ctx.stroke();
    }

    // Tie-rod circular formwork indentations
    [96, 256, 416].forEach((x) => {
      ctx.fillStyle = 'rgba(60, 55, 48, 0.4)';
      ctx.beginPath();
      ctx.arc(x, y + 32, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(40, 35, 30, 0.7)';
      ctx.beginPath();
      ctx.arc(x, y + 32, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Micro surface noise
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 18;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache.concrete = texture;
  return texture;
}

export function getTravertineTexture() {
  if (textureCache.travertine) return textureCache.travertine;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm cream travertine base
  ctx.fillStyle = '#E5DDD1';
  ctx.fillRect(0, 0, 512, 512);

  // Horizontal sediment layers
  for (let y = 0; y < 512; y += 4) {
    const alpha = 0.04 + Math.sin(y * 0.1) * 0.03 + Math.random() * 0.04;
    ctx.fillStyle = `rgba(160, 145, 125, ${alpha})`;
    ctx.fillRect(0, y, 512, 3);
  }

  // Porous pits & cavities
  for (let i = 0; i < 280; i++) {
    const px = Math.random() * 512;
    const py = Math.random() * 512;
    const w = 4 + Math.random() * 14;
    const h = 1.5 + Math.random() * 3;
    ctx.fillStyle = 'rgba(120, 105, 90, 0.22)';
    ctx.fillRect(px, py, w, h);
  }

  // Subtle tile grid joints (large format 1200x600mm)
  ctx.strokeStyle = 'rgba(110, 95, 80, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(0, 0, 256, 512);
  ctx.strokeRect(256, 0, 256, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  textureCache.travertine = texture;
  return texture;
}

export function getMarbleTexture() {
  if (textureCache.marble) return textureCache.marble;

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Ivory white marble
  ctx.fillStyle = '#F8F6F2';
  ctx.fillRect(0, 0, 512, 512);

  // Organic diagonal veins
  const drawVein = (startX, startY, color, width) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    let curX = startX;
    let curY = startY;
    while (curY < 512) {
      curX += (Math.random() - 0.4) * 35;
      curY += 25 + Math.random() * 25;
      ctx.lineTo(curX, curY);
    }
    ctx.stroke();
  };

  // Grey & gold subtle veins
  drawVein(120, 0, 'rgba(130, 130, 135, 0.25)', 2.5);
  drawVein(130, 0, 'rgba(180, 155, 120, 0.2)', 1.5);
  drawVein(340, 0, 'rgba(110, 115, 120, 0.28)', 3);
  drawVein(360, 0, 'rgba(170, 145, 110, 0.18)', 1.2);
  drawVein(460, 0, 'rgba(140, 140, 145, 0.2)', 1.8);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  textureCache.marble = texture;
  return texture;
}

export function getTimberTexture() {
  if (textureCache.timber) return textureCache.timber;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Warm walnut base
  ctx.fillStyle = '#6E4528';
  ctx.fillRect(0, 0, 256, 256);

  // Vertical fluted slats & shadow gaps
  const slatWidth = 16;
  for (let x = 0; x < 256; x += slatWidth) {
    // Slat highlight
    ctx.fillStyle = 'rgba(165, 115, 75, 0.25)';
    ctx.fillRect(x + 2, 0, slatWidth - 5, 256);

    // Deep shadow gap between slats
    ctx.fillStyle = 'rgba(30, 15, 8, 0.65)';
    ctx.fillRect(x + slatWidth - 2, 0, 2.5, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2);
  textureCache.timber = texture;
  return texture;
}

export function getFabricTexture() {
  if (textureCache.fabric) return textureCache.fabric;

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Charcoal/graphite bouclé base
  ctx.fillStyle = '#26282B';
  ctx.fillRect(0, 0, 128, 128);

  // Fine cross-weave pattern
  ctx.strokeStyle = 'rgba(215, 215, 215, 0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 128; i += 4) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(128, i);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 128);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  textureCache.fabric = texture;
  return texture;
}
