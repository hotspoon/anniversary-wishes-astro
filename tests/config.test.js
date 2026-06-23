import { describe, it, expect } from "vitest";
import { state, TIMING, TARGET_ANNIVERSARY_UTC, EARLY_UNLOCK_PASSWORD } from "../public/js/config.js";

describe("config — state", () => {
  it("has initial scene 'countdown'", () => {
    expect(state.currentScene).toBe("countdown");
  });

  it("starts not playing music", () => {
    expect(state.musicPlaying).toBe(false);
  });

  it("starts not unlocked", () => {
    expect(state.unlocked).toBe(false);
    expect(state.pendingMusicUnlock).toBe(false);
  });

  it("can mutate state", () => {
    state.currentScene = "birthday";
    expect(state.currentScene).toBe("birthday");
    state.currentScene = "countdown"; // reset
  });
});

describe("config — TIMING", () => {
  it("all timing values are positive numbers", () => {
    const entries = Object.entries(TIMING);
    expect(entries.length).toBeGreaterThan(0);
    for (const [key, val] of entries) {
      expect(val, `${key} should be a positive number`).toBeGreaterThan(0);
    }
  });

  it("wishDuration is shorter than finalWishDuration", () => {
    expect(TIMING.wishDuration).toBeLessThan(TIMING.finalWishDuration);
  });

  it("unlock phases progress in order", () => {
    expect(TIMING.unlockGlowDelay).toBeLessThan(TIMING.unlockSceneSwitchDelay);
    expect(TIMING.unlockSceneSwitchDelay).toBeLessThan(TIMING.unlockRevealDelay);
    expect(TIMING.unlockRevealDelay).toBeLessThan(TIMING.unlockOverlayResetDelay);
  });
});

describe("config — constants", () => {
  it("TARGET_ANNIVERSARY_UTC is a valid date", () => {
    const d = new Date(TARGET_ANNIVERSARY_UTC);
    expect(d.getTime()).not.toBeNaN();
    expect(d.getUTCFullYear()).toBe(2026);
    expect(d.getUTCMonth()).toBe(5); // June
    expect(d.getUTCDate()).toBe(27);
  });

  it("EARLY_UNLOCK_PASSWORD is a non-empty string", () => {
    expect(typeof EARLY_UNLOCK_PASSWORD).toBe("string");
    expect(EARLY_UNLOCK_PASSWORD.length).toBeGreaterThan(0);
  });
});
