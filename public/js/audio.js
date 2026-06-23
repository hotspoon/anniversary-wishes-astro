"use strict";

import { bgMusic, musicIcon, musicControl } from "./dom.js";
import { state } from "./config.js";

export function startMusic() {
  bgMusic.volume = 0.4;
  bgMusic
    .play()
    .then(() => {
      state.musicPlaying = true;
      state.pendingMusicUnlock = false;
      musicIcon.textContent = "🎵";
      musicControl.classList.add("playing");
    })
    .catch(() => {
      if (state.pendingMusicUnlock) return;
      state.pendingMusicUnlock = true;
      document.addEventListener(
        "click",
        () => {
          bgMusic.play().then(() => {
            state.musicPlaying = true;
            state.pendingMusicUnlock = false;
            musicIcon.textContent = "🎵";
            musicControl.classList.add("playing");
          });
        },
        { once: true },
      );
    });
}

export function toggleMusic() {
  if (state.musicPlaying) {
    bgMusic.pause();
    state.musicPlaying = false;
    musicIcon.textContent = "🔇";
    musicControl.classList.remove("playing");
  } else {
    bgMusic
      .play()
      .then(() => {
        state.musicPlaying = true;
        musicIcon.textContent = "🎵";
        musicControl.classList.add("playing");
      })
      .catch(() => {});
  }
}
