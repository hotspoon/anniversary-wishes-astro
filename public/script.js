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
const EARLY_UNLOCK_PASSWORD = "sayangku";

const countdownMessages = [
  "Sebentar lagi ya, sayang.",
  "Aku sengaja bikin kamu nunggu dikit.",
  "Tenang, ini bukan prank kok.",
  "Kejutannya nunggu waktu yang pas.",
  "Dikit lagi sampai harinya kita.",
  "Sabar ya, cantik.",
  "Belum boleh dibuka... tapi hampir.",
  "Lucu juga ya, kita sudah sejauh ini.",
  "Makin dekat ❤️",
  "Aku harap nanti kamu suka.",
];

const passwordWrongMessages = [
  "Belum itu, sayang 🤍",
  "Hampir kok.",
  "Coba lagi ya, cantik.",
  "Kamu lucu banget pas nebak.",
  "Dikit lagi ❤️",
];

const messages = [
  "Selamat anniversary ya, sayang.",
  "Azlia Saraswati, makasih sudah jadi orang yang paling aku tunggu kabarnya.",
  "Sama kamu, hal-hal kecil rasanya jadi lebih enak dijalani.",
  "Aku masih sering ngerasa beruntung karena bisa punya kamu.",
  "Senyum kamu masih jadi salah satu hal favoritku.",
  "Banyak hari biasa yang jadi kerasa spesial cuma karena ada kamu di dalamnya.",
  "Makasih buat tawa, cerita random, marah kecil, perhatian kecil, dan semua sabar kamu.",
  "Kalau harus milih lagi dari awal, aku tetap bakal pilih kamu.",
  "Kamu bukan cuma pacarku, kamu rumah yang sering aku cari saat capek.",
  "Aku suka cara kamu hadir, bahkan di hal-hal yang kelihatannya sederhana.",
  "Makasih sudah bertahan sama aku, walau aku belum selalu jadi orang yang mudah.",
  "Maaf untuk salahku, untuk ego yang kadang kebawa, dan untuk hari-hari waktu aku bikin kamu sedih.",
  "Aku masih mau belajar jadi lebih baik buat kamu, pelan-pelan tapi beneran.",
  "Semoga hari ini kamu ngerasa dicintai, bukan cuma dari kata-kata ini.",
  "Selamat anniversary, sayang. Aku sayang kamu ❤️",
];

const missMessages = [
  "Hampir, sayang ❤️",
  "Dikit lagi...",
  "Sebenernya hatiku sudah punya kamu dari lama.",
  "Coba lagi ya, cantik.",
  "Kuncinya cuma cocok buat kamu.",
  "Dekat banget itu 💕",
  "Pelan-pelan, kamu pasti bisa ✨",
];

const finalMessage = `Azlia Saraswati, makasih ya sudah hadir di hidupku.\n\nAku tahu aku belum sempurna. Kadang aku salah ngomong, salah paham, atau telat sadar kalau kamu lagi butuh dimengerti.\n\nTapi perasaanku ke kamu serius. Aku sayang kamu, dan aku masih mau terus belajar jadi orang yang lebih baik buat kamu.\n\nMakasih sudah sabar, sudah bertahan, sudah sayang sama aku dengan caramu sendiri.\n\nSemoga kita tetap punya banyak alasan untuk saling memilih, bahkan di hari-hari yang nggak selalu mudah.\n\nSelamat anniversary, sayang. Aku sayang kamu. ❤️`;

// All media files — June photo slots use the newest available uploads.
const mediaFiles = [
  { src: "photos/06af5522-bebc-4bd7-a4fd-c9a736572b2e.jpg", type: "image", caption: "Senyum yang bikin kangen 💕" },
  { src: "photos/0c662fc8-a4f9-476f-a4f4-e3aca31bd922.jpg", type: "image", caption: "Yang paling aku cari 🌸" },
  { src: "photos/15561f40-4577-4dbb-b411-454e558889ef.jpg", type: "image", caption: "Orang favoritku ❤️" },
  { src: "photos/1b946bb8-ac36-4532-a075-be4a4e127fd8.jpg", type: "image", caption: "Cantiknya kamu tuh ✨" },
  { src: "photos/2c424ea7-710a-4f8f-a0e9-9f2d17ffe124.jpg", type: "image", caption: "Setiap momen berharga 💖" },
  { src: "photos/351862f1-0bbe-4aa3-a5bd-107f1e33fd33.jpg", type: "image", caption: "Kamu dan semua gemasmu 🌟" },
  { src: "photos/3d257f97-6cb3-4a76-968a-0c6b473a56ee.jpg", type: "image", caption: "Selalu punya cara bikin aku senyum 💫" },
  { src: "photos/452fb7df-5a15-4652-a79d-676c21eaa954.jpg", type: "image", caption: "Aku suka banget momen ini 🌹" },
  { src: "photos/4ec86829-3f84-4a3b-92ce-5c99edd61291.jpg", type: "image", caption: "Bahagia yang sederhana ✨" },
  { src: "photos/573c6d61-d171-4802-93af-ceb39a6787d4.jpg", type: "image", caption: "Momen yang mau aku simpan lama 💕" },
  { src: "photos/5b48d167-7264-427d-9e1f-e7550724cab5.jpg", type: "image", caption: "Kamu itu spesial banget 🦋" },
  { src: "photos/64a45dc1-3657-47ff-b56c-8e6eeba14722.jpg", type: "image", caption: "Lihat kamu aja udah seneng 🌷" },
  { src: "photos/7117d64d-3287-40c6-b454-bcd20a1195ad.jpg", type: "image", caption: "Terima kasih sudah ada 🌻", objectPosition: "center top" },
  { src: "photos/720b539d-149b-486f-bdad-2c3479c03e36.jpg", type: "image", caption: "Bersamamu rasanya hangat ☀️" },
  { src: "photos/76bb1f22-47e8-4c12-a22e-558e1b5e1808.jpg", type: "image", caption: "Kamu rumahku 🏡" },
  { src: "photos/9200e5f1-036f-44ea-b534-cfe638536b26.jpg", type: "image", caption: "Canda tawa kita favoritku 😆" },
  { src: "photos/97d703e2-5bd0-42a1-bde5-fe613f0e984a.jpg", type: "image", caption: "Selalu cantik di mataku 💎" },
  { src: "photos/99719dd7-83bf-45d6-93f7-9e09eaa0cfe5.jpg", type: "image", caption: "Momen kecil, kenangan besar 🎈" },
  { src: "photos/9abc809c-4a8f-4877-b655-1c1b57643fe6.jpg", type: "image", caption: "Kamu alasan aku tersenyum 😊" },
  { src: "photos/b7f9cecd-f164-470e-9908-db3877cdb2f8.jpg", type: "image", caption: "Bidadari di hidupku 👼" },
  { src: "photos/IMG_0054.jpg", type: "image", caption: "Kamu tuh beda dari yang lain 💫" },
  { src: "photos/IMG_0159.jpg", type: "image", caption: "Hadir kamu, hadir bahagiaku 💝" },
  { src: "photos/IMG_0243.jpg", type: "image", caption: "Jatuh cinta setiap hari 🌈" },
  { src: "photos/IMG_0418.jpg", type: "image", caption: "Peluk erat dari jauh 🫂" },
  { src: "photos/IMG_0436.jpg", type: "image", caption: "Paling ngerti aku cuma kamu 🥺" },
  { src: "photos/IMG_0685.jpg", type: "image", caption: "Kamu layak dapat yang terbaik 🌟" },
  { src: "photos/IMG_0912.jpg", type: "image", caption: "Makasih udah jadi support systemku 💪" },
  { src: "photos/IMG_1230.jpg", type: "image", caption: "Kamu kebahagiaanku yang nyata 🎁" },
  { src: "photos/IMG_1570.jpg", type: "image", caption: "Tatapan kamu tuh dalem banget 👀" },
  { src: "photos/IMG_1610.jpg", type: "image", caption: "Dunia lebih indah kalo ada kamu 🌍" },
  { src: "photos/IMG_1748.jpg", type: "image", caption: "Bersamamu gak pernah bosen 💞" },
  { src: "photos/IMG_2205.jpg", type: "image", caption: "Mimpi yang jadi nyata 🌙" },
  { src: "photos/IMG_2278.jpg", type: "image", caption: "Aku bangga punya kamu 🥇" },
  { src: "photos/IMG_2367.jpg", type: "image", caption: "Satu senyummu cukup buat aku 🦄" },
  { src: "photos/IMG_2645.jpg", type: "image", caption: "Hari-hariku lebih berwarna 🎨" },
  { src: "photos/IMG_2947.jpg", type: "image", caption: "Kamu definisi perfect buatku 💯" },
  { src: "photos/IMG_2985.jpg", type: "image", caption: "Selalu jadi alasan aku bertahan 🌱" },
  { src: "photos/IMG_7601.jpg", type: "image", caption: "Bersyukur setiap hari ada kamu 🙏" },
  { src: "photos/IMG_7609.jpg", type: "image", caption: "Kamu rumah ternyaman untuk pulang 💒" },
  { src: "photos/IMG_7968.jpg", type: "image", caption: "Yang aku sayang, cuma kamu 💌" },
  { src: "photos/IMG_8332.jpg", type: "image", caption: "Masa depan kita pasti indah 🗺️" },
  { src: "photos/IMG_8336.jpg", type: "image", caption: "Till the end, with you 💍" },
  { src: "photos/b9b82d39-b58c-48d4-85a0-58f474ed7420.JPG", type: "image", caption: "Potongan puzzle hidupku 🧩" },
  { src: "photos/f3b1a5f7-a590-4ffe-8d4d-b3955432dbf3.JPG", type: "image", caption: "Kamu adalah takdirku 🔮" },
  { src: "photos/FD3760CE-B920-4F94-BCBE-31FCC9BAA38F.JPG", type: "image", caption: "Anugerah terindah dalam hidupku 🎀" },
  { src: "photos/placeholder.png", type: "image", caption: "Masih banyak foto kita nanti...", missing: true },
];

// ============================================
// DOM REFS
// ============================================
const getElement = (id) => document.getElementById(id);

const dom = {
  bgMusic: getElement("bgMusic"),
  musicControl: getElement("musicControl"),
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
  musicControl,
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
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

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

function triggerUnlockBurst() {
  const rect = heartLock.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const sparkGlyphs = ["✦", "✧", "✨", "♡", "✺"];
  const sparkColors = ["#ff9fcf", "#fff08a", "#9be7c5", "#ffd84f"];

  heartLock.classList.add("unlocking");
  setTimeout(() => heartLock.classList.remove("unlocking"), 2500);

  Array.from({ length: 38 }, () => {
    const spark = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = randomBetween(70, 210);
    spark.className = "unlock-spark";
    spark.textContent = randomFrom(sparkGlyphs);
    spark.style.setProperty("--spark-x", px(centerX));
    spark.style.setProperty("--spark-y", px(centerY));
    spark.style.setProperty("--spark-dx", px(Math.cos(angle) * distance));
    spark.style.setProperty("--spark-dy", px(Math.sin(angle) * distance));
    spark.style.setProperty("--spark-size", px(randomBetween(12, 28)));
    spark.style.setProperty("--spark-rotate", `${randomBetween(-160, 160)}deg`);
    spark.style.setProperty("--spark-color", randomFrom(sparkColors));
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1400);
  });
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
      emoji: randomFrom(["💗", "✨", "🌸", "⭐"]),
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
  heart.textContent = randomFrom(["💗", "💕", "✨", "🌸", "⭐"]);
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
  const confettiTypes = ["petal", "star", "heart", "leaf", "ribbon"];
  const colors = ["#ff9fcf", "#fff08a", "#9be7c5", "#f05f9d", "#ffd84f", "#4fb477", "#fff8ca"];
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
    buildWishText(wishEl, text);
    addWishSparks(wishEl);

    wishContainer.appendChild(wishEl);

    // Force reflow before adding visible class
    wishEl.offsetHeight;

    // Fade in with scale
    requestAnimationFrame(() => {
      wishEl.classList.add("visible");
    });

    // Display time: last message stays much longer
    const displayTime = isLast
      ? TIMING.finalWishDuration
      : Math.max(TIMING.wishDuration, 1900 + text.split(/\s+/).length * 95);

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

function buildWishText(container, text) {
  const accentWords = new Set([
    "anniversary",
    "Azlia",
    "Saraswati,",
    "sayang.",
    "sayang",
    "beruntung",
    "Senyum",
    "favoritku.",
    "pilih",
    "rumah",
    "capek.",
    "bertahan",
    "Maaf",
    "serius.",
    "dicintai,",
    "kamu",
  ]);

  text.split(/(\s+)/).forEach((token, index) => {
    if (/^\s+$/.test(token)) {
      container.appendChild(document.createTextNode(token));
      return;
    }

    const span = document.createElement("span");
    span.className = "wish-word";
    if (accentWords.has(token)) span.classList.add("accent");
    span.textContent = token;
    span.style.setProperty("--word-delay", `${clamp(index * 0.045, 0, 1.8)}s`);
    container.appendChild(span);
  });
}

function addWishSparks(container) {
  const sparkGlyphs = ["✦", "✧", "✨"];
  const sparkColors = ["#ff9fcf", "#fff08a", "#9be7c5"];

  Array.from({ length: 7 }, () => {
    const spark = document.createElement("span");
    spark.className = "wish-spark";
    spark.textContent = randomFrom(sparkGlyphs);
    spark.style.setProperty("--spark-top", `${randomBetween(8, 88)}%`);
    spark.style.setProperty("--spark-left", `${randomBetween(5, 95)}%`);
    spark.style.setProperty("--spark-size", px(randomBetween(10, 20)));
    spark.style.setProperty("--spark-delay", `${randomBetween(0.15, 1.6)}s`);
    spark.style.setProperty("--spark-color", randomFrom(sparkColors));
    container.appendChild(spark);
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
  if (media.missing) element.classList.add("missing-media");

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
    if (media.objectPosition) {
      element.style.objectPosition = media.objectPosition;
    }
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

  const photos = mediaFiles.filter((m) => m.type === "image" && !m.missing);

  // [photo(tall), photo(short), photo(short), photo(tall)]
  const featured = [
    { ...photos[1], layout: "tall" },
    { ...photos[7], layout: "short" },
    { ...photos[12], layout: "short" },
    { ...photos[2], layout: "tall" },
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
    if (media.missing) card.classList.add("missing-slot");
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
  if (media.missing) card.classList.add("missing-slot");
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
      "🌿",
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
      countdownTimer.textContent = "00 HARI : 00 JAM : 00 MENIT : 00 DETIK";
      hideElement(openSoonerWrapper);

      countdownMessage.classList.remove("visible");
      setTimeout(() => {
        countdownMessage.textContent = "Selamat anniversary, sayang! ❤️";
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
    countdownTimer.textContent = `${pad(days)} HARI : ${pad(hours)} JAM : ${pad(minutes)} MENIT : ${pad(seconds)} DETIK`;
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
      passwordError.textContent = "Bener, sayang ✨";
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
      musicControl.classList.add("playing");
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
            musicControl.classList.add("playing");
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
    musicControl.classList.remove("playing");
  } else {
    bgMusic
      .play()
      .then(() => {
        state.musicPlaying = true;
        musicIcon.textContent = "🎵";
        musicControl.classList.add("playing");
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
