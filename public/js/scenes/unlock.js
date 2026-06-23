"use strict";

import { heartLock, keyDrag, subText, missText, randomFrom, randomBetween, px } from "../dom.js";
import { missMessages } from "../data.js";

// ============================================
// DRAG & DROP UNLOCK
// ============================================
export function initDragUnlock(onUnlock) {
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
      onUnlock();
    } else {
      resetKeyPosition();
      showMissMessage();
    }
  }

  // Mouse events
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

  // Touch events
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
