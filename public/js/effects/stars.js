"use strict";

import { starsCanvas, randomBetween, setCanvasSize } from "../dom.js";

let starsData = [];

export function initStars() {
  const ctx = starsCanvas.getContext("2d");
  setCanvasSize(starsCanvas);

  starsData = Array.from({ length: 300 }, () => {
    const baseAlpha = Math.random() * 0.6 + 0.1;
    return {
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: randomBetween(0.3, 2.3),
      twinkleSpeed: randomBetween(0.2, 1),
      phase: Math.random() * Math.PI * 2,
      baseAlpha,
      hue: randomBetween(330, 370),
      saturation: randomBetween(10, 40),
      lightness: randomBetween(80, 100),
      gemini: false,
    };
  });

  const gx = starsCanvas.width * 0.78,
    gy = starsCanvas.height * 0.18;
  const geminiStars = [
    { x: gx - 30, y: gy - 25 }, // 0: Pollux Head
    { x: gx + 10, y: gy - 35 }, // 1: Castor Head
    { x: gx - 20, y: gy }, // 2: Pollux Neck
    { x: gx + 20, y: gy }, // 3: Castor Neck
    { x: gx - 50, y: gy + 10 }, // 4: Pollux Arm
    { x: gx + 50, y: gy - 30 }, // 5: Castor Arm
    { x: gx - 20, y: gy + 30 }, // 6: Pollux Waist
    { x: gx + 20, y: gy + 30 }, // 7: Castor Waist
    { x: gx - 20, y: gy + 55 }, // 8: Pollux Knee
    { x: gx - 5, y: gy + 80 }, // 9: Pollux Foot
    { x: gx - 10, y: gy + 60 }, // 10: Inner Foot (from Castor Waist)
    { x: gx + 40, y: gy + 50 }, // 11: Castor Knee
    { x: gx + 60, y: gy + 70 }, // 12: Castor Foot
    { x: gx + 70, y: gy + 45 }, // 13: Castor Outer
  ];
  geminiStars.forEach((s) => {
    starsData.push({
      x: s.x,
      y: s.y,
      r: 2.0,
      twinkleSpeed: 0.3,
      phase: Math.random() * Math.PI * 2,
      baseAlpha: 0.7,
      hue: 220,
      saturation: 30,
      lightness: 90,
      gemini: true,
    });
  });

  function drawStars() {
    ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    const t = Date.now() * 0.001;

    ctx.save();
    ctx.strokeStyle = "rgba(255,240,138,0.16)";
    ctx.lineWidth = 0.8;
    const g = starsData.filter((s) => s.gemini);
    if (g.length >= 14) {
      ctx.beginPath();
      // Pollux upper
      ctx.moveTo(g[0].x, g[0].y);
      ctx.lineTo(g[2].x, g[2].y);
      ctx.lineTo(g[4].x, g[4].y);
      // Castor upper
      ctx.moveTo(g[1].x, g[1].y);
      ctx.lineTo(g[3].x, g[3].y);
      ctx.lineTo(g[5].x, g[5].y);
      // Twin connection
      ctx.moveTo(g[2].x, g[2].y);
      ctx.lineTo(g[3].x, g[3].y);
      // Pollux body & leg
      ctx.moveTo(g[2].x, g[2].y);
      ctx.lineTo(g[6].x, g[6].y);
      ctx.lineTo(g[8].x, g[8].y);
      ctx.lineTo(g[9].x, g[9].y);
      // Castor body & legs
      ctx.moveTo(g[3].x, g[3].y);
      ctx.lineTo(g[7].x, g[7].y);
      ctx.lineTo(g[10].x, g[10].y); // Inner foot
      ctx.moveTo(g[7].x, g[7].y);
      ctx.lineTo(g[11].x, g[11].y);
      ctx.lineTo(g[12].x, g[12].y); // Castor foot
      ctx.moveTo(g[11].x, g[11].y);
      ctx.lineTo(g[13].x, g[13].y); // Castor outer
      ctx.stroke();
    }
    ctx.restore();

    starsData.forEach((s) => {
      const twinkle = Math.sin(t * s.twinkleSpeed + s.phase);
      const alpha = s.baseAlpha * (0.15 + 0.85 * (0.5 + 0.5 * twinkle));
      const radiusPulse = s.r * (0.85 + 0.15 * (0.5 + 0.5 * twinkle));
      ctx.beginPath();
      ctx.arc(s.x, s.y, radiusPulse, 0, Math.PI * 2);
      ctx.fillStyle = s.gemini
        ? `rgba(255,248,202,${alpha})`
        : `hsla(${s.hue}, ${s.saturation}%, ${s.lightness}%, ${alpha})`;
      ctx.fill();
      if (alpha > 0.5 && s.r > 1.2) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, radiusPulse * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = s.gemini
          ? `rgba(155,231,197,${alpha * 0.12})`
          : `hsla(${s.hue}, ${s.saturation}%, ${s.lightness}%, ${alpha * 0.1})`;
        ctx.fill();
      }
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
}
