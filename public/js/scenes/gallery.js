"use strict";

import { featuredFrames, remainingGallery, randomBetween, px } from "../dom.js";
import { mediaFiles } from "../data.js";

// ============================================
// GALLERY — Hanging frames + Remaining grid
// ============================================
export function buildGallery() {
  buildFeaturedFrames();
  buildRemainingGallery();
}

export function createMediaElement(media, className) {
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

export function createCaption(text, className) {
  const caption = document.createElement("div");
  caption.className = className;
  caption.textContent = text;
  return caption;
}

export function buildFeaturedFrames() {
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

  buildFeaturedFrames._featuredSrcs = featured.map((f) => f.src);
}

export function buildRemainingGallery() {
  remainingGallery.replaceChildren();

  const featuredSrcs = buildFeaturedFrames._featuredSrcs || [];
  const remaining = mediaFiles.filter((m) => !featuredSrcs.includes(m.src));

  // Render remaining items
  remaining.forEach((media, i) => {
    const item = createRemainingItem(media, i);
    remainingGallery.appendChild(item);
  });
}

export function createRemainingItem(media, i) {
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
