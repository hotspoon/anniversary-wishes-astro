"use strict";

import { birthdayHeader, wishContainer, randomFrom, randomBetween, px, clamp, galleryBtn } from "../dom.js";
import { TIMING } from "../config.js";
import { messages } from "../data.js";
import { triggerPetalBurst } from "../effects/petals.js";

// ============================================
// BIRTHDAY REVEAL — Title then Nazz BD-style wishes
// ============================================
export function showBirthdayReveal(onWishesComplete) {
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
      startWishesSequence(onWishesComplete);
    }, 1200);
  }, TIMING.anniversaryTitleDuration);
}

export async function startWishesSequence(onComplete) {
  for (let i = 0; i < messages.length; i++) {
    await showWish(messages[i], i === messages.length - 1);
  }
  // All wishes done — transition to ending
  setTimeout(() => {
    onComplete();
  }, 600);
}

export function showWish(text, isLast) {
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
      : Math.max(TIMING.wishDuration, 3000 + text.split(/\s+/).length * 160);

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

export function buildWishText(container, text) {
  const accentWords = new Set([
    "anniversary",
    "Azlia",
    "Saraswati",
    "Pramono,",
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

export function addWishSparks(container) {
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
