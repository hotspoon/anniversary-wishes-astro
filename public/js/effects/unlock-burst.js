"use strict";

import { heartLock, randomBetween, randomFrom, px } from "../dom.js";

export function triggerUnlockBurst() {
  const rect = heartLock.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const sparkGlyphs = ["✦", "✧", "✨", "♡", "✺"];
  const sparkColors = ["#ff9fcf", "#fff08a", "#9be7c5", "#ffd84f"];

  heartLock.classList.add("unlocking");
  setTimeout(() => heartLock.classList.remove("unlocking"), 2500);

  Array.from({ length: 20 }, () => {
    const spark = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = randomBetween(70, 210);
    spark.className = "unlock-spark";
    spark.textContent = randomFrom(sparkGlyphs);
    spark.style.setProperty("--spark-x", px(centerX));
    spark.style.setProperty("--spark-y", px(centerY));
    spark.style.setProperty("--spark-to-x", px(centerX + Math.cos(angle) * distance));
    spark.style.setProperty("--spark-to-y", px(centerY + Math.sin(angle) * distance));
    spark.style.setProperty("--spark-size", px(randomBetween(12, 28)));
    spark.style.setProperty("--spark-rotate", `${randomBetween(-160, 160)}deg`);
    spark.style.setProperty("--spark-color", randomFrom(sparkColors));
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1400);
  });
}
