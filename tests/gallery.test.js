import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock dom.js so featuredFrames/remainingGallery return real DOM elements
const mockFeaturedFrames = { replaceChildren: vi.fn() };
const mockRemainingGallery = { replaceChildren: vi.fn() };
let mockMediaFiles;

vi.mock("../public/js/dom.js", () => ({
  featuredFrames: mockFeaturedFrames,
  remainingGallery: mockRemainingGallery,
  randomBetween: (min, max) => Math.random() * (max - min) + min,
  randomFrom: (items) => items[Math.floor(Math.random() * items.length)],
  px: (v) => `${v}px`,
  clamp: (v, min, max) => Math.min(Math.max(v, min), max),
}));

vi.mock("../public/js/data.js", () => ({
  get mediaFiles() {
    return mockMediaFiles;
  },
}));

// Import AFTER mocks are set up
const {
  createMediaElement,
  createCaption,
  buildFeaturedFrames,
  buildGallery,
} = await import("../public/js/scenes/gallery.js");

describe("gallery \u2014 createMediaElement", () => {
  it("creates an img element for image type", () => {
    const media = { src: "photos/test.jpg", type: "image", caption: "Test" };
    const el = createMediaElement(media, "test-class");
    expect(el.tagName).toBe("IMG");
    expect(el.className).toBe("test-class");
    expect(el.src).toContain("test.jpg");
    expect(el.alt).toBe("Test");
    expect(el.loading).toBe("eager");
  });

  it("applies objectPosition when present", () => {
    const media = { src: "photos/test.jpg", type: "image", caption: "Test", objectPosition: "center top" };
    const el = createMediaElement(media, "test-class");
    expect(el.style.objectPosition).toBe("center top");
  });

  it("does not set objectPosition when not present", () => {
    const media = { src: "photos/test.jpg", type: "image", caption: "Test" };
    const el = createMediaElement(media, "test-class");
    expect(el.style.objectPosition).toBe("");
  });

  it("adds missing-media class when media.missing is true", () => {
    const media = { src: "photos/placeholder.png", type: "image", caption: "Missing", missing: true };
    const el = createMediaElement(media, "test-class");
    expect(el.classList.contains("missing-media")).toBe(true);
  });
});

describe("gallery \u2014 createCaption", () => {
  it("creates a div with text content", () => {
    const caption = createCaption("Hello \u2764\ufe0f", "cap-class");
    expect(caption.tagName).toBe("DIV");
    expect(caption.className).toBe("cap-class");
    expect(caption.textContent).toBe("Hello \u2764\ufe0f");
  });
});

describe("gallery \u2014 buildFeaturedFrames", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFeaturedFrames.replaceChildren = vi.fn();
    mockFeaturedFrames.appendChild = vi.fn((child) => {
      mockFeaturedFrames._children = mockFeaturedFrames._children || [];
      mockFeaturedFrames._children.push(child);
    });
    mockFeaturedFrames._children = [];

    mockMediaFiles = [
      { src: "photos/1.jpg", type: "image", caption: "Satu" },
      { src: "photos/2.jpg", type: "image", caption: "Dua" },
      { src: "photos/3.jpg", type: "image", caption: "Tiga \u2764\ufe0f" },
      { src: "photos/4.jpg", type: "image", caption: "Empat" },
      { src: "photos/5.jpg", type: "image", caption: "Lima" },
      { src: "photos/6.jpg", type: "image", caption: "Enam" },
      { src: "photos/7.jpg", type: "image", caption: "Tujuh" },
      { src: "photos/8.jpg", type: "image", caption: "Delapan \ud83c\udf39" },
      { src: "photos/9.jpg", type: "image", caption: "Sembilan" },
      { src: "photos/10.jpg", type: "image", caption: "Sepuluh" },
      { src: "photos/11.jpg", type: "image", caption: "Sebelas" },
      { src: "photos/12.jpg", type: "image", caption: "Dua belas" },
      { src: "photos/13.jpg", type: "image", caption: "Tiga belas" },
      { src: "photos/placeholder.png", type: "image", caption: "Missing", missing: true },
    ];
  });

  it("clears featuredFrames and creates 4 frames", () => {
    buildFeaturedFrames();
    expect(mockFeaturedFrames.replaceChildren).toHaveBeenCalled();
    expect(mockFeaturedFrames._children.length).toBe(4);
  });

  it("each frame is a div with class .featured-frame", () => {
    buildFeaturedFrames();
    mockFeaturedFrames._children.forEach((frame) => {
      expect(frame.tagName).toBe("DIV");
      expect(frame.className).toContain("featured-frame");
    });
  });

  it("assigns tall and short layout classes", () => {
    buildFeaturedFrames();
    const classes = mockFeaturedFrames._children.map((f) => f.className);
    expect(classes[0]).toContain("tall");
    expect(classes[1]).toContain("short");
    expect(classes[2]).toContain("short");
    expect(classes[3]).toContain("tall");
  });

  it("stores featured srcs for later filtering", () => {
    buildFeaturedFrames();
    expect(buildFeaturedFrames._featuredSrcs).toBeDefined();
    expect(buildFeaturedFrames._featuredSrcs.length).toBe(4);
  });
});

describe("gallery \u2014 buildRemainingGallery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFeaturedFrames.replaceChildren = vi.fn();
    mockFeaturedFrames.appendChild = vi.fn((child) => {
      mockFeaturedFrames._children = mockFeaturedFrames._children || [];
      mockFeaturedFrames._children.push(child);
    });
    mockFeaturedFrames._children = [];

    mockRemainingGallery.replaceChildren = vi.fn();
    mockRemainingGallery.appendChild = vi.fn((child) => {
      mockRemainingGallery._children = mockRemainingGallery._children || [];
      mockRemainingGallery._children.push(child);
    });
    mockRemainingGallery._children = [];

    mockMediaFiles = [
      { src: "photos/1.jpg", type: "image", caption: "Satu" },
      { src: "photos/2.jpg", type: "image", caption: "Dua" },
      { src: "photos/3.jpg", type: "image", caption: "Tiga \u2764\ufe0f" },
      { src: "photos/4.jpg", type: "image", caption: "Empat" },
      { src: "photos/5.jpg", type: "image", caption: "Lima" },
      { src: "photos/6.jpg", type: "image", caption: "Enam" },
      { src: "photos/7.jpg", type: "image", caption: "Tujuh" },
      { src: "photos/placeholder.png", type: "image", caption: "Missing", missing: true },
    ];
  });

  it("creates remaining items (total minus 4 featured)", () => {
    buildGallery();
    expect(mockFeaturedFrames._children.length).toBe(4);
    expect(mockRemainingGallery._children.length).toBeGreaterThan(0);
  });

  it("remaining items have media and caption", () => {
    buildGallery();
    mockRemainingGallery._children.forEach((item) => {
      expect(item.className).toContain("remaining-item");
      const card = item.querySelector(".remaining-card");
      expect(card).toBeTruthy();
      expect(card.querySelector(".remaining-media")).toBeTruthy();
      expect(card.querySelector(".remaining-caption")).toBeTruthy();
    });
  });
});
