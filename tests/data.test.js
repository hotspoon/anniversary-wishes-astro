import { describe, it, expect } from "vitest";
import {
  countdownMessages,
  passwordWrongMessages,
  messages,
  missMessages,
  finalMessage,
  mediaFiles,
} from "../public/js/data.js";

describe("data — messages", () => {
  it("countdownMessages has at least 5 messages", () => {
    expect(countdownMessages.length).toBeGreaterThanOrEqual(5);
  });

  it("passwordWrongMessages has at least 3 messages", () => {
    expect(passwordWrongMessages.length).toBeGreaterThanOrEqual(3);
  });

  it("messages has at least 10 messages", () => {
    expect(messages.length).toBeGreaterThanOrEqual(10);
    expect(messages[messages.length - 1]).toContain("Aku sayang");
  });

  it("missMessages has at least 3 messages", () => {
    expect(missMessages.length).toBeGreaterThanOrEqual(3);
  });

  it("finalMessage is a non-empty string with newlines", () => {
    expect(typeof finalMessage).toBe("string");
    expect(finalMessage.length).toBeGreaterThan(50);
    expect(finalMessage).toContain("Azlia");
    expect(finalMessage).toContain("\n\n");
  });
});

describe("data — mediaFiles", () => {
  it("has at least 5 entries", () => {
    expect(mediaFiles.length).toBeGreaterThanOrEqual(5);
  });

  it("all entries have required fields", () => {
    for (const media of mediaFiles) {
      expect(media).toHaveProperty("src");
      expect(media).toHaveProperty("type");
      expect(media).toHaveProperty("caption");
      expect(media.src).toBeTruthy();
    }
  });

  it("all entries are typed as 'image'", () => {
    for (const media of mediaFiles) {
      expect(media.type, `${media.src} should be image`).toBe("image");
    }
  });

  it("has exactly one placeholder with missing: true", () => {
    const missing = mediaFiles.filter((m) => m.missing);
    expect(missing.length).toBe(1);
    expect(missing[0].src).toContain("placeholder");
  });

  it("every src path starts with photos/", () => {
    for (const media of mediaFiles) {
      expect(media.src, `${media.src} should start with photos/`).toMatch(/^photos\//);
    }
  });

  it("has unique src values (no duplicates)", () => {
    const srcs = mediaFiles.map((m) => m.src);
    const uniqueSrcs = new Set(srcs);
    expect(uniqueSrcs.size).toBe(srcs.length);
  });

  it("objectPosition is present only on the one photo that needs it", () => {
    const withPos = mediaFiles.filter((m) => m.objectPosition);
    expect(withPos.length).toBe(1);
    expect(withPos[0].objectPosition).toBe("center top");
  });
});
