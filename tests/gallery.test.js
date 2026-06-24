import { describe, it, expect, beforeEach, vi } from "vitest";

const mockRemainingGallery = { replaceChildren: vi.fn(), appendChild: vi.fn() };
let mockMediaFiles;

vi.mock("../public/js/dom.js", () => ({
  remainingGallery: mockRemainingGallery,
}));

vi.mock("../public/js/data.js", () => ({
  get mediaFiles() {
    return mockMediaFiles;
  },
}));

const {
  createMediaElement,
  createCaption,
  buildGallery,
  buildRemainingGallery,
  createRemainingItem,
} = await import("../public/js/scenes/gallery.js");

describe("gallery — createMediaElement", () => {
  it("creates an img element", () => {
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

  it("adds missing-media class when media.missing is true", () => {
    const media = { src: "photos/placeholder.png", type: "image", caption: "Missing", missing: true };
    const el = createMediaElement(media, "test-class");
    expect(el.classList.contains("missing-media")).toBe(true);
  });
});

describe("gallery — createCaption", () => {
  it("creates a div with text content", () => {
    const caption = createCaption("Hello", "cap-class");
    expect(caption.tagName).toBe("DIV");
    expect(caption.className).toBe("cap-class");
    expect(caption.textContent).toBe("Hello");
  });
});

describe("gallery — buildRemainingGallery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRemainingGallery.replaceChildren = vi.fn();
    mockRemainingGallery.appendChild = vi.fn((child) => {
      mockRemainingGallery._children = mockRemainingGallery._children || [];
      mockRemainingGallery._children.push(child);
    });
    mockRemainingGallery._children = [];

    mockMediaFiles = [
      { src: "photos/0c662fc8-a4f9-476f-a4f4-e3aca31bd922.jpg", type: "image", caption: "Featured" },
      { src: "photos/452fb7df-5a15-4652-a79d-676c21eaa954.jpg", type: "image", caption: "Featured" },
      { src: "photos/2c424ea7-710a-4f8f-a0e9-9f2d17ffe124.jpg", type: "image", caption: "Featured" },
      { src: "photos/15561f40-4577-4dbb-b411-454e558889ef.jpg", type: "image", caption: "Featured" },
      { src: "photos/1.jpg", type: "image", caption: "Satu" },
      { src: "photos/2.jpg", type: "image", caption: "Dua" },
      { src: "photos/3.jpg", type: "image", caption: "Tiga" },
      { src: "photos/placeholder.png", type: "image", caption: "Missing", missing: true },
    ];
  });

  it("creates remaining items (total minus 4 featured)", () => {
    buildGallery();
    expect(mockRemainingGallery._children.length).toBe(4); // 4 non-featured
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
