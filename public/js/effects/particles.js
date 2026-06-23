"use strict";

import { randomFrom, randomBetween, px } from "../dom.js";

export const particleIntervals = new Map();

export function startParticles(containerId) {
  const c = document.getElementById(containerId);
  if (!c || particleIntervals.has(containerId)) return;

  const emojis = [
    "❤️", "💕", "💗", "✨", "🌸", "💖", "⭐", "🌿",
    "🦋", "🌷", "🌙", "🎀", "💫", "🌟", "🌺", "🍀",
  ];

  function spawn() {
    const count = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");
      particle.className = "float-heart";
      particle.textContent = randomFrom(emojis);
      particle.style.fontSize = px(randomBetween(10, 22));
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.bottom = "-30px";
      particle.style.animationDuration = `${randomBetween(8, 18)}s`;
      particle.style.opacity = randomBetween(0.2, 0.5);
      c.appendChild(particle);

      const duration = parseFloat(particle.style.animationDuration) * 1000;
      setTimeout(() => particle.remove(), duration);
    }
  }

  spawn();
  particleIntervals.set(containerId, setInterval(spawn, 600));
}

export function spawnFloatingHeart(container) {
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = randomFrom(["💗", "💕", "✨", "🌸", "⭐", "🦋"]);
  heart.style.fontSize = px(randomBetween(10, 28));
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.bottom = "-40px";
  const dur = randomBetween(8, 16);
  heart.style.animationDuration = `${dur}s`;
  heart.style.opacity = randomBetween(0.2, 0.7);
  container.appendChild(heart);
  setTimeout(() => heart.remove(), dur * 1000);
}

export function startFloatingHearts(containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  spawnFloatingHeart(c);
  setInterval(() => spawnFloatingHeart(c), 800);
}
