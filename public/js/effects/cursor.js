"use strict";

import { cursorCanvas, randomBetween, randomFrom, setCanvasSize } from "../dom.js";

export let cursorX = window.innerWidth / 2;
export let cursorY = window.innerHeight / 2;
const cursorParticles = [];
const cursorCtx = cursorCanvas.getContext("2d");

document.addEventListener("mousemove", (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  if (Math.random() < 0.25) {
    cursorParticles.push({
      x: cursorX,
      y: cursorY,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 2 - 1,
      size: randomBetween(6, 16),
      alpha: 0.85,
      emoji: randomFrom(["💗", "✨", "🌸", "⭐"]),
    });
  }
});

export function drawCursor() {
  cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
  cursorCtx.beginPath();
  cursorCtx.arc(cursorX, cursorY, 6, 0, Math.PI * 2);
  cursorCtx.fillStyle = "rgba(255,159,207,0.85)";
  cursorCtx.fill();
  cursorCtx.beginPath();
  cursorCtx.arc(cursorX, cursorY, 3, 0, Math.PI * 2);
  cursorCtx.fillStyle = "white";
  cursorCtx.fill();
  for (let i = cursorParticles.length - 1; i >= 0; i--) {
    const p = cursorParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.025;
    p.size *= 0.97;
    if (p.alpha <= 0) {
      cursorParticles.splice(i, 1);
      continue;
    }
    cursorCtx.globalAlpha = p.alpha;
    cursorCtx.font = `${p.size}px serif`;
    cursorCtx.fillText(p.emoji, p.x - p.size / 2, p.y);
    cursorCtx.globalAlpha = 1;
  }
  requestAnimationFrame(drawCursor);
}

export function resizeCursorCanvas() {
  setCanvasSize(cursorCanvas);
}
