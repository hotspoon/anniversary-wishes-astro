"use strict";

// ============================================
// ORCHESTRATOR — ties all modules together
// ============================================

import { state, TIMING } from "./config.js";
import {
  sceneMap,
  sceneCountdown,
  sceneUnlock,
  sceneBirthday,
  starsCanvas,
  confettiCanvas,
  petalCanvas,
  muteBtn,
  galleryBtn,
  unlockOverlay,
  setCanvasSize,
} from "./dom.js";
import { initStars } from "./effects/stars.js";
import { initConfetti, setConfettiActive } from "./effects/confetti.js";
import { setPetalActive } from "./effects/petals.js";
import { drawCursor, resizeCursorCanvas } from "./effects/cursor.js";
import { startParticles } from "./effects/particles.js";
import { startFloatingHearts } from "./effects/particles.js";
import { triggerUnlockBurst } from "./effects/unlock-burst.js";
import { initDragUnlock } from "./scenes/unlock.js";
import { initCountdown } from "./scenes/countdown.js";
import { showBirthdayReveal } from "./scenes/birthday.js";
import { animateEndingText } from "./scenes/ending.js";
import { buildGallery } from "./scenes/gallery.js";
import { startMusic, toggleMusic } from "./audio.js";

// ============================================
// SCENE ENTER
// ============================================
function onSceneEnter(name) {
  if (name === "birthday") {
    setConfettiActive(true);
    setPetalActive(true);
    startParticles("particlesBg");
    showBirthdayReveal(() => {
      setTimeout(() => {
        transitionToScene("ending");
      }, 600);
    });
  }
  if (name === "ending") {
    setConfettiActive(false);
    setPetalActive(false);
    startParticles("endingParticles");
    animateEndingText();
  }
  if (name === "gallery") {
    startParticles("galleryParticles");
    buildGallery();
  }
}

// ============================================
// SCENE TRANSITIONS
// ============================================
function transitionToScene(sceneName) {
  Object.values(sceneMap).forEach((scene) => {
    scene.classList.remove("active");
    scene.style.pointerEvents = "none";
  });

  setTimeout(() => {
    const targetScene = sceneMap[sceneName];
    targetScene.classList.add("active");
    targetScene.style.pointerEvents = "all";
    state.currentScene = sceneName;
    onSceneEnter(sceneName);
  }, 400);
}

// ============================================
// TRIGGER UNLOCK (from drag puzzle -> birthday)
// ============================================
function triggerUnlock() {
  if (state.unlocked) return;
  state.unlocked = true;

  const heartLock = document.getElementById("heartLock");
  if (heartLock) heartLock.classList.add("near");

  triggerUnlockBurst();
  startMusic();

  // Phase 1: gentle warm glow from center
  setTimeout(() => {
    unlockOverlay.classList.add("phase1");
  }, TIMING.unlockGlowDelay);

  // Phase 2: fade to dark smoothly
  setTimeout(() => {
    unlockOverlay.classList.remove("phase1");
    unlockOverlay.classList.add("phase2");
  }, TIMING.unlockGlowDelay + 1800);

  // Switch scene while screen is dark
  setTimeout(() => {
    sceneUnlock.classList.remove("active");
    sceneUnlock.style.pointerEvents = "none";
    sceneBirthday.classList.add("active");
    sceneBirthday.style.pointerEvents = "all";
    state.currentScene = "birthday";
    onSceneEnter("birthday");
  }, TIMING.unlockSceneSwitchDelay);

  // Phase 3: fade out to reveal birthday
  setTimeout(() => {
    unlockOverlay.classList.remove("phase2");
    unlockOverlay.classList.add("phase3");
  }, TIMING.unlockRevealDelay);

  setTimeout(() => {
    unlockOverlay.classList.remove("phase3");
  }, TIMING.unlockOverlayResetDelay);
}

// ============================================
// UNLOCK FROM COUNTDOWN -> UNLOCK scene
// ============================================
function unlockFromCountdown() {
  state.unlocked = true;

  // Visual transition
  unlockOverlay.classList.add("phase1");

  if (!state.musicPlaying) {
    startMusic();
  }

  setTimeout(() => {
    unlockOverlay.classList.remove("phase1");
    unlockOverlay.classList.add("phase2");
  }, 1500);

  setTimeout(() => {
    sceneCountdown.classList.remove("active");
    sceneCountdown.style.pointerEvents = "none";

    sceneUnlock.classList.add("active");
    sceneUnlock.style.pointerEvents = "all";
    state.currentScene = "unlock";

    // Fade into unlock scene
    unlockOverlay.classList.remove("phase2");
    unlockOverlay.classList.add("phase3");
    setTimeout(() => {
      unlockOverlay.classList.remove("phase3");
      state.unlocked = false; // Reset unlock state for the key drag puzzle
    }, 1500);
  }, 2500);
}

// ============================================
// WINDOW RESIZE
// ============================================
window.addEventListener("resize", () => {
  setCanvasSize(starsCanvas);
  setCanvasSize(confettiCanvas);
  setCanvasSize(petalCanvas);
  resizeCursorCanvas();
});

// ============================================
// INIT
// ============================================
function init() {
  resizeCursorCanvas();
  initStars();
  initConfetti();
  initDragUnlock(triggerUnlock);
  initCountdown(
    () => unlockFromCountdown(),
    () => unlockFromCountdown(),
  );
  drawCursor();
  startFloatingHearts("floatingHeartsBg");
  muteBtn.addEventListener("click", toggleMusic);
  galleryBtn.addEventListener("click", () => transitionToScene("gallery"));

  startMusic();

  sceneCountdown.classList.add("active");
  sceneCountdown.style.pointerEvents = "all";
}

window.addEventListener("DOMContentLoaded", init);
