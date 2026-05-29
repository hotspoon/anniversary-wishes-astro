"use strict";

/* =============================================
   SCRIPT.JS — ROMANTIC ANNIVERSARY
   ============================================= */

const state = {
  currentScene: "countdown",
  musicPlaying: false,
  pendingMusicUnlock: false,
  unlocked: false,
};

const TIMING = {
  anniversaryRevealDelay: 500,
  anniversaryTitleDuration: 5500,
  wishDuration: 2800,
  finalWishDuration: 5500,
  wishFadeDuration: 700,
  messageFadeDuration: 2000,
  messageRotationDuration: 6000,
  unlockGlowDelay: 400,
  unlockSceneSwitchDelay: 3200,
  unlockRevealDelay: 3600,
  unlockOverlayResetDelay: 5200,
};

const TARGET_ANNIVERSARY_UTC = Date.UTC(2026, 5, 27, 17, 0, 0);
const EARLY_UNLOCK_PASSWORD = "iloveyoutothemoonandback,mywife";

const countdownMessages = [
  "Some moments are worth waiting for.",
  "Patience, my love.",
  "A little longer, pretty girl.",
  "Your surprise is waiting for midnight.",
  "The best part is coming.",
  "Almost time, baby.",
  "Not yet… but soon.",
  "Our story keeps getting more beautiful.",
  "You're getting closer ❤️",
  "The universe is preparing something beautiful for you.",
];

const passwordWrongMessages = [
  "That's not it, baby 🤍",
  "Almost, my love.",
  "Try again, pretty girl.",
  "You're cute when you try.",
  "Closer ❤️",
];

const messages = [
  "Happy anniversary to the girl who made love feel like home.",
  "Azlia Saraswati, you are my favorite person, my safest place, and my happiest feeling.",
  "Being with you makes my world softer, warmer, and brighter.",
  "I still feel lucky every time I remember that I get to call you mine.",
  "Your smile is still my favorite thing in this world.",
  "You turn ordinary days into memories I want to keep forever.",
  "Thank you for every laugh, every conversation, every quiet moment, and every little piece of love you give me.",
  "If I could choose again, I would still choose you every single time.",
  "You are genuinely one of the most precious parts of my life.",
  "You are not just beautiful, you are unforgettable.",
  "Thank you for staying with me, loving me, and being patient with me.",
  "I'm sorry for every mistake, every misunderstanding, and every moment I made your heart feel heavy.",
  "No matter what happens, I will always love you, care about you, and choose us.",
  "Today, I hope you feel how much this relationship means to me.",
  "Happy anniversary, my love ❤️",
];

const missMessages = [
  "Almost there, baby ❤️",
  "Closer…",
  "You already have my heart anyway.",
  "Try again, pretty girl.",
  "My heart only opens for you.",
  "So close, my love 💕",
  "A little more… you can do it ✨",
];

const finalMessage = `Azlia Saraswati, you are one of the best things that has ever happened to me.\n\nThank you for staying, for loving me, for being patient with me, and for choosing this story with me.\n\nI know I'm not perfect, but my feelings for you are real, and I want to keep learning how to love you better.\n\nNo matter how much time passes, I will always look at you with the same admiration, love, and warmth.\n\nHappy anniversary, my love. ❤️`;

// All media files — new.mp4 replaces bottom center video
const mediaFiles = [
  {
    src: "photos/whatsapp_image_2026_05_23_10_49_46_pm.jpeg",
    type: "image",
    caption: "That beautiful smile 💕",
  },
  {
    src: "photos/whatsapp_image_2026_05_23_10_49_46_pm_2.jpeg",
    type: "image",
    caption: "Extraordinary soul ✨",
  },
  {
    src: "photos/whatsapp_image_2026_05_23_10_49_46_pm_4.jpeg",
    type: "image",
    caption: "The one who lights up my world 🌸",
  },
  {
    src: "photos/whatsapp_image_2026_05_23_11_02_58_pm.jpeg",
    type: "image",
    caption: "My favorite person ❤️",
  },
  {
    src: "photos/whatsapp_image_2026_05_23_11_02_58_pm_1.jpeg",
    type: "image",
    caption: "Simply stunning 💖",
  },
  {
    src: "photos/whatsapp_video_2026_05_23_10_49_47_pm.mp4",
    type: "video",
    caption: "You & your magic 🌟",
  },
  {
    src: "photos/whatsapp_video_2026_05_23_10_49_47_pm_1.mp4",
    type: "video",
    caption: "So full of life 💫",
  },
  {
    src: "photos/whatsapp_video_2026_05_23_10_49_47_pm_2.mp4",
    type: "video",
    caption: "Breathtaking 🌹",
  },
  { src: "photos/new.mp4", type: "video", caption: "Pure happiness ✨" },
  {
    src: "photos/whatsapp_video_2026_05_23_10_49_47_pm_4.mp4",
    type: "video",
    caption: "This moment, forever 💕",
  },
];

// ============================================
// DOM REFS
// ============================================
const getElement = (id) => document.getElementById(id);

const dom = {
  bgMusic: getElement("bgMusic"),
  musicIcon: getElement("musicIcon"),
  muteBtn: getElement("muteBtn"),
  starsCanvas: getElement("starsCanvas"),
  confettiCanvas: getElement("confettiCanvas"),
  petalCanvas: getElement("petalCanvas"),
  cursorCanvas: getElement("cursorCanvas"),
  sceneCountdown: getElement("scene-countdown"),
  sceneUnlock: getElement("scene-unlock"),
  sceneBirthday: getElement("scene-birthday"),
  sceneEnding: getElement("scene-ending"),
  sceneGallery: getElement("scene-gallery"),
  heartLock: getElement("heartLock"),
  keyDrag: getElement("keyDrag"),
  unlockOverlay: getElement("unlockOverlay"),
  missText: getElement("missText"),
  subText: getElement("subText"),
  wishContainer: getElement("wishContainer"),
  birthdayHeader: getElement("birthdayHeader"),
  endingText: getElement("endingText"),
  galleryBtn: getElement("galleryBtn"),
  featuredFrames: getElement("featuredFrames"),
  remainingGallery: getElement("remainingGallery"),
  countdownTimer: getElement("countdownTimer"),
  countdownMessage: getElement("countdownMessage"),
  openSoonerBtn: getElement("openSoonerBtn"),
  openSoonerWrapper: getElement("openSoonerWrapper"),
  enterBtnWrapper: getElement("enterBtnWrapper"),
  enterBtn: getElement("enterBtn"),
  passwordModal: getElement("passwordModal"),
  passwordInput: getElement("passwordInput"),
  passwordSubmit: getElement("passwordSubmit"),
  passwordError: getElement("passwordError"),
  closeModalBtn: getElement("closeModalBtn"),
};

const {
  bgMusic,
  musicIcon,
  muteBtn,
  starsCanvas,
  confettiCanvas,
  petalCanvas,
  cursorCanvas,
  sceneCountdown,
  sceneUnlock,
  sceneBirthday,
  sceneEnding,
  sceneGallery,
  heartLock,
  keyDrag,
  unlockOverlay,
  missText,
  subText,
  wishContainer,
  birthdayHeader,
  endingText,
  galleryBtn,
  featuredFrames,
  remainingGallery,
  countdownTimer,
  countdownMessage,
  openSoonerBtn,
  openSoonerWrapper,
  enterBtnWrapper,
  enterBtn,
  passwordModal,
  passwordInput,
  passwordSubmit,
  passwordError,
  closeModalBtn,
} = dom;

const sceneMap = {
  countdown: sceneCountdown,
  unlock: sceneUnlock,
  birthday: sceneBirthday,
  ending: sceneEnding,
  gallery: sceneGallery,
};

const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];
const randomBetween = (min, max) => Math.random() * (max - min) + min;
const px = (value) => `${value}px`;

function setCanvasSize(canvas) {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function clearTimer(timerId) {
  if (timerId) clearInterval(timerId);
  return null;
}

function showElement(element, display = "block") {
  if (element) element.style.display = display;
}

function hideElement(element) {
  if (element) element.style.display = "none";
}

// ============================================
// GLOBAL STARS — twinkling bright/dim
// ============================================
let starsData = [];
function initStars() {
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

// ============================================
// FLOWER PETAL CONFETTI
// ============================================
let petals = [];
let petalActive = false;

function triggerPetalBurst() {
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

// ============================================
// CURSOR HEARTS
// ============================================
let cursorX = window.innerWidth / 2,
  cursorY = window.innerHeight / 2;
const cursorParticles = [];
const cursorCtx = cursorCanvas.getContext("2d");

function resizeCursorCanvas() {
  setCanvasSize(cursorCanvas);
}

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
      emoji: randomFrom(["❤️", "💕"]),
    });
  }
});

function drawCursor() {
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

// ============================================
// FLOATING HEARTS BG
// ============================================
function spawnFloatingHeart(container) {
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = randomFrom(["❤️", "💕", "💗", "💖", "💓"]);
  heart.style.fontSize = px(randomBetween(10, 30));
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.bottom = "-40px";
  const dur = randomBetween(6, 14);
  heart.style.animationDuration = `${dur}s`;
  heart.style.opacity = randomBetween(0.2, 0.8);
  container.appendChild(heart);
  setTimeout(() => heart.remove(), dur * 1000);
}

function startFloatingHearts(containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  spawnFloatingHeart(c);
  setInterval(() => spawnFloatingHeart(c), 600);
}

// ============================================
// CONFETTI
// ============================================
let confettiPieces = [];
let confettiActive = false;

function initConfetti() {
  setCanvasSize(confettiCanvas);
  const ctx = confettiCanvas.getContext("2d");
  const colors = [
    "#ff9fcf",
    "#fff08a",
    "#9be7c5",
    "#f05f9d",
    "#ffd84f",
    "#4fb477",
    "#ffffff",
    "#fff8ca",
  ];
  confettiPieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * -confettiCanvas.height,
    w: randomBetween(5, 15),
    h: randomBetween(3, 8),
    color: randomFrom(colors),
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.1,
    vx: (Math.random() - 0.5) * 2,
    vy: randomBetween(1, 3),
    alpha: randomBetween(0.4, 1),
  }));
  function draw() {
    if (!confettiActive) {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      return;
    }
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      if (p.y > confettiCanvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * confettiCanvas.width;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ============================================
// DRAG & DROP UNLOCK
// ============================================
function initDragUnlock() {
  const key = keyDrag;
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let missTimeout = null;

  function getLockCenter() {
    const rect = heartLock.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  function showMissMessage() {
    missText.textContent = randomFrom(missMessages);
    missText.classList.add("show");
    clearTimeout(missTimeout);
    missTimeout = setTimeout(() => missText.classList.remove("show"), 3000);
  }

  function resetKeyPosition() {
    key.style.position = "";
    key.style.zIndex = "";
    key.style.left = "";
    key.style.top = "";
    key.style.animation = "";
    key.style.cursor = "grab";
    subText.style.opacity = "1";
  }

  function startDrag(clientX, clientY) {
    isDragging = true;
    const rect = key.getBoundingClientRect();
    offsetX = clientX - rect.left - rect.width / 2;
    offsetY = clientY - rect.top - rect.height / 2;
    key.style.position = "fixed";
    key.style.zIndex = "100";
    key.style.animation = "none";
    key.style.cursor = "grabbing";
    subText.style.opacity = "0.4";
  }

  function updateDrag(clientX, clientY) {
    if (!isDragging) return;
    key.style.left = px(clientX - offsetX - key.offsetWidth / 2);
    key.style.top = px(clientY - offsetY - key.offsetHeight / 2);
    const lockCenter = getLockCenter();
    const distance = Math.hypot(clientX - lockCenter.x, clientY - lockCenter.y);
    heartLock.classList.toggle("near", distance < 80);
  }

  function finishDrag(clientX, clientY, unlockDistance) {
    if (!isDragging) return;
    isDragging = false;
    heartLock.classList.remove("near");
    const lockCenter = getLockCenter();

    if (
      Math.hypot(clientX - lockCenter.x, clientY - lockCenter.y) <
      unlockDistance
    ) {
      triggerUnlock();
    } else {
      resetKeyPosition();
      showMissMessage();
    }
  }

  key.addEventListener("mousedown", (event) => {
    startDrag(event.clientX, event.clientY);
    event.preventDefault();
  });

  document.addEventListener("mousemove", (event) => {
    updateDrag(event.clientX, event.clientY);
  });

  document.addEventListener("mouseup", (event) => {
    finishDrag(event.clientX, event.clientY, 70);
  });

  key.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      startDrag(touch.clientX, touch.clientY);
      event.preventDefault();
    },
    { passive: false },
  );

  document.addEventListener(
    "touchmove",
    (event) => {
      if (!isDragging) return;
      const touch = event.touches[0];
      updateDrag(touch.clientX, touch.clientY);
      event.preventDefault();
    },
    { passive: false },
  );

  document.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    finishDrag(touch.clientX, touch.clientY, 80);
  });
}

// ============================================
// TRIGGER UNLOCK — smooth elegant transition
// ============================================
function triggerUnlock() {
  if (state.unlocked) return;
  state.unlocked = true;
  heartLock.classList.add("near");
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

function onSceneEnter(name) {
  if (name === "birthday") {
    confettiActive = true;
    petalActive = true;
    startParticles("particlesBg");
    showBirthdayReveal();
  }
  if (name === "ending") {
    confettiActive = false;
    petalActive = false;
    startParticles("endingParticles");
    animateEndingText();
  }
  if (name === "gallery") {
    startParticles("galleryParticles");
    buildGallery();
  }
}

// ============================================
// BIRTHDAY REVEAL — Title then Nazz BD-style wishes
// ============================================
function showBirthdayReveal() {
  birthdayHeader.style.opacity = "0";
  birthdayHeader.style.display = "block";
  wishContainer.style.display = "none";

  // Fade in title
  setTimeout(() => {
    birthdayHeader.style.transition = "opacity 1.8s ease, transform 1.8s ease";
    birthdayHeader.style.transform = "translateY(0)";
    birthdayHeader.style.opacity = "1";
    triggerPetalBurst();
  }, TIMING.anniversaryRevealDelay);

  // After showing, fade out title then start wishes
  setTimeout(() => {
    birthdayHeader.style.transition = "opacity 1.2s ease";
    birthdayHeader.style.opacity = "0";
    setTimeout(() => {
      birthdayHeader.style.display = "none";
      wishContainer.style.display = "flex";
      startWishesSequence();
    }, 1200);
  }, TIMING.anniversaryTitleDuration);
}

// ============================================
// WISHES — Nazz BD style: promise-based, one at a time
// ============================================
async function startWishesSequence() {
  for (let i = 0; i < messages.length; i++) {
    await showWish(messages[i], i === messages.length - 1);
  }
  // All wishes done — transition to ending
  setTimeout(() => {
    transitionToScene("ending");
  }, 600);
}

function showWish(text, isLast) {
  return new Promise((resolve) => {
    const wishEl = document.createElement("div");
    wishEl.className = "wish-item";
    wishEl.innerText = text;

    wishContainer.appendChild(wishEl);

    // Force reflow before adding visible class
    wishEl.offsetHeight;

    // Fade in with scale
    requestAnimationFrame(() => {
      wishEl.classList.add("visible");
    });

    // Display time: last message stays much longer
    const displayTime = isLast ? TIMING.finalWishDuration : TIMING.wishDuration;

    setTimeout(() => {
      // Fade out with scale + float up
      wishEl.classList.remove("visible");
      wishEl.classList.add("fading");

      setTimeout(() => {
        wishEl.remove();
        resolve();
      }, TIMING.wishFadeDuration);
    }, displayTime);
  });
}

// ============================================
// ENDING TEXT (scrollable scene)
// ============================================
function animateEndingText() {
  endingText.textContent = "";
  endingText.classList.remove("visible");

  const tokens = finalMessage
    .split(/(\n\n|\n|\s+)/)
    .filter((token) => token.length > 0);

  setTimeout(() => {
    endingText.classList.add("visible");

    tokens.forEach((token, index) => {
      if (token === "\n" || token === "\n\n") {
        const lineBreaks = token === "\n\n" ? 2 : 1;
        for (let i = 0; i < lineBreaks; i++) {
          endingText.appendChild(document.createElement("br"));
        }
      } else if (/^\s+$/.test(token)) {
        endingText.appendChild(document.createTextNode(token));
      } else {
        const span = document.createElement("span");
        span.className = "word-span";
        span.textContent = token;
        span.style.animationDelay = `${index * 0.15}s`;
        endingText.appendChild(span);
      }
    });
  }, 800);

  const totalTime = 800 + tokens.length * 150 + 1500;
  setTimeout(() => {
    galleryBtn.style.display = "inline-block";
  }, totalTime);
}

// ============================================
// GALLERY — Featured 4 frames + remaining grid (new.mp4 at bottom center)
// ============================================
function buildGallery() {
  buildFeaturedFrames();
  buildRemainingGallery();
}

function createMediaElement(media, className) {
  const element = document.createElement(
    media.type === "video" ? "video" : "img",
  );
  element.className = className;

  if (media.type === "video") {
    element.src = media.src;
    element.autoplay = true;
    element.muted = true;
    element.loop = true;
    element.playsInline = true;
  } else {
    element.src = media.src;
    element.alt = media.caption;
    element.loading = "lazy";
  }

  return element;
}

function createCaption(text, className) {
  const caption = document.createElement("div");
  caption.className = className;
  caption.textContent = text;
  return caption;
}

function buildFeaturedFrames() {
  featuredFrames.replaceChildren();

  const photos = mediaFiles.filter((m) => m.type === "image");
  const videos = mediaFiles.filter((m) => m.type === "video");

  // Find the specific photos requested for the featured polaroid frames
  const photoLeft =
    mediaFiles.find(
      (m) =>
        m.caption &&
        m.caption.toLowerCase().includes("the one who lights up my world"),
    ) || photos[0];
  const photoRight =
    mediaFiles.find(
      (m) => m.caption && m.caption.toLowerCase().includes("favorite person"),
    ) || photos[1];

  // [photo(tall), video(short), video(short), photo(tall)]
  const featured = [
    { ...photoLeft, layout: "tall" },
    { ...videos[0], layout: "short" },
    { ...videos[1], layout: "short" },
    { ...photoRight, layout: "tall" },
  ];

  const ornamentEmojis = ["🎀", "⭐", "💫", "🌸"];
  const ropeColors = ["#ff9fcf", "#ffd84f", "#9be7c5", "#fff08a"];

  featured.forEach((media, i) => {
    const frame = document.createElement("div");
    frame.className = `featured-frame ${media.layout}`;
    frame.style.animationDelay = `${i * 0.3}s`;
    frame.style.setProperty("--swing-delay", `${i * 0.5}s`);

    const ropeColor = ropeColors[i % ropeColors.length];
    const ornament = ornamentEmojis[i % ornamentEmojis.length];

    const rope = document.createElement("div");
    rope.className = "rope";
    rope.style.background = `linear-gradient(to bottom, ${ropeColor}cc, ${ropeColor}44)`;

    const ornamentEl = document.createElement("div");
    ornamentEl.className = "rope-ornament";
    ornamentEl.textContent = ornament;

    const card = document.createElement("div");
    card.className = "hang-card";
    card.append(
      createMediaElement(media, "hang-media"),
      createCaption(media.caption, "hang-caption"),
    );

    frame.append(rope, ornamentEl, card);

    featuredFrames.appendChild(frame);

    frame.style.opacity = "0";
    frame.style.transform = "translateY(-40px)";
    setTimeout(() => {
      frame.style.transition = `opacity 1s ease ${i * 0.2}s, transform 1s ease ${i * 0.2}s`;
      frame.style.opacity = "1";
      frame.style.transform = "translateY(0)";
    }, 200);
  });

  buildGallery._featuredSrcs = featured.map((f) => f.src);
}

function buildRemainingGallery() {
  remainingGallery.replaceChildren();

  const featuredSrcs = buildGallery._featuredSrcs || [];
  const remaining = mediaFiles.filter((m) => !featuredSrcs.includes(m.src));

  // Render remaining items
  remaining.forEach((media, i) => {
    const item = createRemainingItem(media, i);
    remainingGallery.appendChild(item);
  });
}

function createRemainingItem(media, i) {
  const item = document.createElement("div");
  item.className = "remaining-item";
  item.style.animationDelay = `${i * 0.15 + 0.8}s`;

  const card = document.createElement("div");
  card.className = "remaining-card";
  card.append(
    createMediaElement(media, "remaining-media"),
    createCaption(media.caption, "remaining-caption"),
  );

  item.appendChild(card);
  return item;
}

// ============================================
// FLOATING PARTICLES
// ============================================
const particleIntervals = new Map();

function startParticles(containerId) {
  const c = document.getElementById(containerId);
  if (!c || particleIntervals.has(containerId)) return;

  function spawn() {
    const particle = document.createElement("span");
    particle.className = "float-heart";
    particle.textContent = randomFrom([
      "❤️",
      "💕",
      "💗",
      "✨",
      "🌸",
      "💖",
      "⭐",
    ]);
    particle.style.fontSize = px(randomBetween(8, 26));
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.bottom = "-30px";
    particle.style.animationDuration = `${randomBetween(6, 16)}s`;
    particle.style.opacity = randomBetween(0.15, 0.65);
    c.appendChild(particle);

    const duration = parseFloat(particle.style.animationDuration) * 1000;
    setTimeout(() => particle.remove(), duration);
  }

  spawn();
  particleIntervals.set(containerId, setInterval(spawn, 800));
}

// ============================================
// COUNTDOWN
// ============================================
let countdownInterval;
let messageInterval;

function initCountdown() {
  startParticles("countdownParticles");

  let msgIdx = 0;
  countdownMessage.textContent = countdownMessages[msgIdx];
  countdownMessage.classList.add("visible");

  messageInterval = setInterval(() => {
    countdownMessage.classList.remove("visible");
    setTimeout(() => {
      msgIdx = (msgIdx + 1) % countdownMessages.length;
      countdownMessage.textContent = countdownMessages[msgIdx];
      countdownMessage.classList.add("visible");
    }, TIMING.messageFadeDuration);
  }, TIMING.messageRotationDuration);

  function updateTimer() {
    const distance = TARGET_ANNIVERSARY_UTC - Date.now();

    if (distance <= 0) {
      countdownInterval = clearTimer(countdownInterval);
      messageInterval = clearTimer(messageInterval);
      countdownTimer.textContent =
        "00 DAYS : 00 HOURS : 00 MINUTES : 00 SECONDS";
      hideElement(openSoonerWrapper);

      countdownMessage.classList.remove("visible");
      setTimeout(() => {
        countdownMessage.textContent = "Happy anniversary, my love! ❤️";
        countdownMessage.classList.add("visible");
      }, 1000);

      showElement(enterBtnWrapper);
      enterBtnWrapper.offsetHeight;
      enterBtnWrapper.classList.add("show");
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => n.toString().padStart(2, "0");
    countdownTimer.textContent = `${pad(days)} DAYS : ${pad(hours)} HOURS : ${pad(minutes)} MINUTES : ${pad(seconds)} SECONDS`;
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);

  enterBtn.addEventListener("click", unlockFromCountdown);

  openSoonerBtn.addEventListener("click", () => {
    passwordModal.classList.add("show");
    passwordInput.focus();
  });

  closeModalBtn.addEventListener("click", () => {
    passwordModal.classList.remove("show");
    passwordError.textContent = "";
    passwordInput.value = "";
  });

  passwordSubmit.addEventListener("click", checkPassword);
  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkPassword();
  });

  function checkPassword() {
    const val = passwordInput.value.replace(/\s+/g, "").toLowerCase();
    if (val === EARLY_UNLOCK_PASSWORD) {
      passwordError.style.color = "#fff";
      passwordError.textContent = "Correct, my love ✨";
      setTimeout(() => {
        passwordModal.classList.remove("show");
        unlockFromCountdown();
      }, 1000);
    } else {
      passwordError.style.color = "var(--pink-deep)";
      passwordError.textContent = randomFrom(passwordWrongMessages);
    }
  }
}

function unlockFromCountdown() {
  countdownInterval = clearTimer(countdownInterval);
  messageInterval = clearTimer(messageInterval);
  state.unlocked = true;

  // Visual Transition
  unlockOverlay.classList.add("phase1"); // Add soft glow/flash

  if (!state.musicPlaying) {
    startMusic();
  }

  setTimeout(() => {
    unlockOverlay.classList.remove("phase1");
    unlockOverlay.classList.add("phase2"); // black screen
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
// MUSIC
// ============================================
function startMusic() {
  bgMusic.volume = 0.4;
  bgMusic
    .play()
    .then(() => {
      state.musicPlaying = true;
      state.pendingMusicUnlock = false;
      musicIcon.textContent = "🎵";
    })
    .catch(() => {
      if (state.pendingMusicUnlock) return;
      state.pendingMusicUnlock = true;
      document.addEventListener(
        "click",
        () => {
          bgMusic.play().then(() => {
            state.musicPlaying = true;
            state.pendingMusicUnlock = false;
            musicIcon.textContent = "🎵";
          });
        },
        { once: true },
      );
    });
}

function toggleMusic() {
  if (state.musicPlaying) {
    bgMusic.pause();
    state.musicPlaying = false;
    musicIcon.textContent = "🔇";
  } else {
    bgMusic
      .play()
      .then(() => {
        state.musicPlaying = true;
        musicIcon.textContent = "🎵";
      })
      .catch(() => {});
  }
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
  initDragUnlock();
  initCountdown();
  drawCursor();
  startFloatingHearts("floatingHeartsBg");
  muteBtn.addEventListener("click", toggleMusic);
  galleryBtn.addEventListener("click", () => transitionToScene("gallery"));

  startMusic();

  sceneCountdown.classList.add("active");
  sceneCountdown.style.pointerEvents = "all";
}

window.addEventListener("DOMContentLoaded", init);
