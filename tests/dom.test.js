import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  randomFrom,
  randomBetween,
  px,
  clamp,
  setCanvasSize,
  clearTimer,
  showElement,
  hideElement,
} from "../public/js/dom.js";

describe("utilities — randomFrom", () => {
  it("returns an item from the array", () => {
    const items = ["a", "b", "c"];
    const result = randomFrom(items);
    expect(items).toContain(result);
  });

  it("returns undefined for empty array", () => {
    expect(randomFrom([])).toBeUndefined();
  });

  it("returns the only item in single-element array", () => {
    expect(randomFrom(["x"])).toBe("x");
  });
});

describe("utilities — randomBetween", () => {
  it("returns a number between min and max", () => {
    for (let i = 0; i < 100; i++) {
      const val = randomBetween(5, 10);
      expect(val).toBeGreaterThanOrEqual(5);
      expect(val).toBeLessThan(10);
    }
  });

  it("returns same value when min equals max", () => {
    expect(randomBetween(7, 7)).toBe(7);
  });
});

describe("utilities — clamp", () => {
  it("returns the value when within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("returns min when value is below range", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("returns max when value is above range", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("handles edge values exactly", () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
});

describe("utilities — px", () => {
  it("converts number to px string", () => {
    expect(px(42)).toBe("42px");
  });

  it("handles zero", () => {
    expect(px(0)).toBe("0px");
  });

  it("handles decimal values", () => {
    expect(px(1.5)).toBe("1.5px");
  });
});

describe("utilities — setCanvasSize", () => {
  it("sets canvas width and height to window dimensions", () => {
    const canvas = { width: 0, height: 0 };
    setCanvasSize(canvas);
    expect(canvas.width).toBe(window.innerWidth);
    expect(canvas.height).toBe(window.innerHeight);
  });

  it("does nothing when canvas is null", () => {
    expect(() => setCanvasSize(null)).not.toThrow();
  });

  it("does nothing when canvas is undefined", () => {
    expect(() => setCanvasSize(undefined)).not.toThrow();
  });
});

describe("utilities — clearTimer", () => {
  it("clears interval and returns null", () => {
    const clearSpy = vi.spyOn(globalThis, "clearInterval");
    const timerId = setTimeout(() => {}, 10000);
    const result = clearTimer(timerId);
    expect(clearSpy).toHaveBeenCalledWith(timerId);
    expect(result).toBeNull();
    clearSpy.mockRestore();
  });

  it("returns null when timerId is falsy", () => {
    expect(clearTimer(null)).toBeNull();
    expect(clearTimer(undefined)).toBeNull();
    expect(clearTimer(0)).toBeNull();
  });
});

describe("utilities — showElement / hideElement", () => {
  let el;

  beforeEach(() => {
    el = document.createElement("div");
    el.style.display = "none";
  });

  it("showElement sets display to block by default", () => {
    showElement(el);
    expect(el.style.display).toBe("block");
  });

  it("showElement uses custom display value", () => {
    showElement(el, "flex");
    expect(el.style.display).toBe("flex");
  });

  it("showElement does nothing when element is null", () => {
    expect(() => showElement(null)).not.toThrow();
  });

  it("hideElement sets display to none", () => {
    hideElement(el);
    expect(el.style.display).toBe("none");
  });

  it("hideElement does nothing when element is null", () => {
    expect(() => hideElement(null)).not.toThrow();
  });
});
