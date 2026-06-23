"use strict";

export const getElement = (id) => document.getElementById(id);

export const dom = {
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

export const {
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

export const sceneMap = {
  countdown: sceneCountdown,
  unlock: sceneUnlock,
  birthday: sceneBirthday,
  ending: sceneEnding,
  gallery: sceneGallery,
};

// Utility helpers
export const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];
export const randomBetween = (min, max) => Math.random() * (max - min) + min;
export const px = (value) => `${value}px`;
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function setCanvasSize(canvas) {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function clearTimer(timerId) {
  if (timerId) clearInterval(timerId);
  return null;
}

export function showElement(element, display = "block") {
  if (element) element.style.display = display;
}

export function hideElement(element) {
  if (element) element.style.display = "none";
}
