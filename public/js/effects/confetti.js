"use strict";

import { confettiCanvas, randomBetween, randomFrom, px, setCanvasSize } from "../dom.js";

let confettiPieces = [];
export let confettiActive = false;

export function initConfetti() {
  setCanvasSize(confettiCanvas);
  const ctx = confettiCanvas.getContext("2d");
  const confettiTypes = ["petal", "star", "heart", "leaf", "ribbon"];
  const colors = [
    "#ff9fcf",
    "#fff08a",
    "#9be7c5",
    "#f05f9d",
    "#ffd84f",
    "#4fb477",
    "#fff8ca",
  ];
  confettiPieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * -confettiCanvas.height,
    type: randomFrom(confettiTypes),
    size: randomBetween(7, 17),
    w: randomBetween(6, 16),
    h: randomBetween(4, 10),
    color: randomFrom(colors),
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: randomBetween(-0.08, 0.08),
    vx: randomBetween(-1.1, 1.1),
    vy: randomBetween(0.8, 2.6),
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: randomBetween(0.012, 0.04),
    alpha: randomBetween(0.5, 1),
  }));

  confettiActive = true;

  function drawStar(size) {
    const points = 5;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? size : size * 0.42;
      const angle = -Math.PI / 2 + (i * Math.PI) / points;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }

  function drawHeart(size) {
    ctx.beginPath();
    ctx.moveTo(0, size * 0.38);
    ctx.bezierCurveTo(-size, -size * 0.18, -size * 0.55, -size, 0, -size * 0.42);
    ctx.bezierCurveTo(size * 0.55, -size, size, -size * 0.18, 0, size * 0.38);
    ctx.fill();
  }

  function drawPetalShape(size) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.75, -size * 0.42, size * 0.55, size * 0.5, 0, size);
    ctx.bezierCurveTo(-size * 0.55, size * 0.5, -size * 0.75, -size * 0.42, 0, -size);
    ctx.fill();
  }

  function drawLeaf(size) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.95, -size * 0.2, size * 0.55, size * 0.74, 0, size);
    ctx.bezierCurveTo(-size * 0.7, size * 0.35, -size * 0.82, -size * 0.45, 0, -size);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.32)";
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.55);
    ctx.lineTo(0, size * 0.55);
    ctx.stroke();
  }

  function drawConfettiPiece(piece) {
    ctx.fillStyle = piece.color;
    if (piece.type === "star") drawStar(piece.size * 0.72);
    else if (piece.type === "heart") drawHeart(piece.size * 0.75);
    else if (piece.type === "petal") drawPetalShape(piece.size * 0.82);
    else if (piece.type === "leaf") drawLeaf(piece.size * 0.72);
    else {
      ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
    }
  }

  function draw() {
    if (!confettiActive) {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      requestAnimationFrame(draw);
      return;
    }
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach((p) => {
      p.wobble += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobble) * 0.55;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      if (p.y > confettiCanvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * confettiCanvas.width;
        p.type = randomFrom(confettiTypes);
        p.color = randomFrom(colors);
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      drawConfettiPiece(p);
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
}
