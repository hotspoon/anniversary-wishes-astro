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
    // Spawn 2-4 particles at once
    const count = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");
      particle.className = "float-heart";
      particle.textContent = randomFrom(emojis);
      particle.style.fontSize = px(randomBetween(8, 24));
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.bottom = "-30px";
      particle.style.animationDuration = `${randomBetween(6, 16)}s`;
      particle.style.opacity = randomBetween(0.15, 0.6);
      c.appendChild(particle);

      const duration = parseFloat(particle.style.animationDuration) * 1000;
      setTimeout(() => particle.remove(), duration);
    }
  }

  spawn();
  particleIntervals.set(containerId, setInterval(spawn, 350));
}

export function spawnFloatingHeart(container) {
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = randomFrom(["💗", "💕", "✨", "🌸", "⭐", "🦋"]);
  heart.style.fontSize = px(randomBetween(10, 30));
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.bottom = "-40px";
  const dur = randomBetween(6, 14);
  heart.style.animationDuration = `${dur}s`;
  heart.style.opacity = randomBetween(0.2, 0.8);
  container.appendChild(heart);
  setTimeout(() => heart.remove(), dur * 1000);
}

export function startFloatingHearts(containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  spawnFloatingHeart(c);
  setInterval(() => spawnFloatingHeart(c), 600);
}
