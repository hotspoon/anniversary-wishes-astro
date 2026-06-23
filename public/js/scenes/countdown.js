"use strict";

import { sceneCountdown, sceneUnlock, unlockOverlay, countdownTimer, countdownMessage, openSoonerBtn, openSoonerWrapper, enterBtnWrapper, enterBtn, passwordModal, passwordInput, passwordSubmit, passwordError, closeModalBtn, clearTimer, hideElement, showElement, randomFrom } from "../dom.js";
import { TARGET_ANNIVERSARY_UTC, TIMING, state, EARLY_UNLOCK_PASSWORD } from "../config.js";
import { countdownMessages, passwordWrongMessages } from "../data.js";
import { startParticles } from "../effects/particles.js";

// ============================================
// COUNTDOWN
// ============================================
let countdownInterval;
let messageInterval;

export function initCountdown(onEnter, onPasswordSuccess) {
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

  // Enter button fires when anniversary has arrived
  enterBtn.addEventListener("click", onEnter);

  // "Open sooner" button shows password modal
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
    if (e.key === "Enter") {
      e.preventDefault();
      checkPassword();
    }
  });

  function checkPassword() {
    const val = passwordInput.value.replace(/\s+/g, "").toLowerCase();
    if (val === EARLY_UNLOCK_PASSWORD) {
      countdownInterval = clearTimer(countdownInterval);
      messageInterval = clearTimer(messageInterval);
      passwordError.style.color = "#fff";
      passwordError.textContent = "Bener, sayang ✨";
      setTimeout(() => {
        passwordModal.classList.remove("show");
        onPasswordSuccess();
      }, 1000);
    } else {
      passwordError.style.color = "var(--pink-deep)";
      passwordError.textContent = randomFrom(passwordWrongMessages);
    }
  }
}
