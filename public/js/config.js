"use strict";

export const state = {
  currentScene: "countdown",
  musicPlaying: false,
  pendingMusicUnlock: false,
  unlocked: false,
};

export const TIMING = {
  anniversaryRevealDelay: 500,
  anniversaryTitleDuration: 5500,
  wishDuration: 3500,
  finalWishDuration: 8000,
  wishFadeDuration: 700,
  messageFadeDuration: 2000,
  messageRotationDuration: 6000,
  unlockGlowDelay: 400,
  unlockSceneSwitchDelay: 3200,
  unlockRevealDelay: 3600,
  unlockOverlayResetDelay: 5200,
};

export const TARGET_ANNIVERSARY_UTC = Date.UTC(2026, 5, 27, 17, 0, 0);
export const EARLY_UNLOCK_PASSWORD = "sayangku";
