"use strict";

import { petalCanvas, randomBetween, randomFrom, px, setCanvasSize } from "../dom.js";

let petals = [];
export let petalActive = false;

export function triggerPetalBurst() {
  setCanvasSize(petalCanvas);
  const ctx = petalCanvas.getContext("2d");

  const cx = petalCanvas.width / 2;
  const cy = petalCanvas.height / 2 - 50;

  const petalColors = [
    { fill: "#ffd6ea", stroke: "#ff9fcf" },
    { fill: "#fff3a6", stroke: "#ffd84f" },
    { fill: "#c9f6de", stroke: "#9be7c5" },
    { fill: "#ffeff8", stroke: "#f05f9d" },
    { fill: "#fff8ca", stroke: "#fff08a" },
    { fill: "#9be7c5", stroke: "#4fb477" },
  ];

  petals = Array.from({ length: 120 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 18 + 6;
    return {
      x: cx,
      y: cy,
      size: randomBetween(6, 18),
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.4,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: randomBetween(0.02, 0.07),
      color: randomFrom(petalColors),
      alpha: 1,
    };
  });

  petalActive = true;

  function drawPetal(ctx, x, y, size, rotation, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.6, size * 0.5, 0, size);
    ctx.bezierCurveTo(
      -size * 0.6,
      size * 0.5,
      -size * 0.8,
      -size * 0.5,
      0,
      -size,
    );
    ctx.closePath();
    ctx.fillStyle = color.fill;
    ctx.fill();
    ctx.strokeStyle = color.stroke;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -size * 0.7);
    ctx.lineTo(0, size * 0.6);
    ctx.strokeStyle = color.stroke;
    ctx.lineWidth = 0.3;
    ctx.globalAlpha = alpha * 0.4;
    ctx.stroke();

    ctx.restore();
  }

  function animatePetals() {
    if (!petalActive) return;
    ctx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
    let activeCount = 0;

    petals.forEach((p) => {
      if (p.y > petalCanvas.height + 50) return;
      activeCount++;

      p.wobblePhase += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobblePhase) * 2.5;
      p.vy += 0.3; // Gravity
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.alpha);
    });

    if (activeCount > 0) {
      requestAnimationFrame(animatePetals);
    } else {
      petalActive = false;
      ctx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
    }
  }
  animatePetals();
}
