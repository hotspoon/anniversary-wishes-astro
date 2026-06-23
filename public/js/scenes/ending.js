"use strict";

import { endingText, galleryBtn } from "../dom.js";
import { finalMessage } from "../data.js";

// ============================================
// ENDING TEXT (scrollable scene)
// ============================================
export function animateEndingText() {
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
