"use strict";

import { remainingGallery } from "../dom.js";
import { mediaFiles } from "../data.js";

// 4 featured photos rendered server-side via Astro <Image> — exclude them from remaining
const featuredSrcs = [
  "photos/0c662fc8-a4f9-476f-a4f4-e3aca31bd922.jpg",
  "photos/452fb7df-5a15-4652-a79d-676c21eaa954.jpg",
  "photos/2c424ea7-710a-4f8f-a0e9-9f2d17ffe124.jpg",
  "photos/15561f40-4577-4dbb-b411-454e558889ef.jpg",
];

export function buildGallery() {
  buildRemainingGallery();
}

export function buildRemainingGallery() {
  remainingGallery.replaceChildren();

  const remaining = mediaFiles.filter((m) => !featuredSrcs.includes(m.src));

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

export function createMediaElement(media, className) {
  const element = document.createElement("img");
  element.className = className;
  if (media.missing) element.classList.add("missing-media");

  element.src = media.src;
  element.alt = media.caption;
  element.loading = "eager";
  if (media.objectPosition) {
    element.style.objectPosition = media.objectPosition;
  }

  return element;
}

export function createCaption(text, className) {
  const caption = document.createElement("div");
  caption.className = className;
  caption.textContent = text;
  return caption;
}
