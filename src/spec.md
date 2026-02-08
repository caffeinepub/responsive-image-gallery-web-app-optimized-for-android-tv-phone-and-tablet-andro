# Specification

## Summary
**Goal:** Build a responsive web-based image gallery optimized for Android TV (10-foot UI) and Android phones/tablets (Android 10+), with a full-screen viewer supporting slideshow, navigation, zoom, and “more options”.

**Planned changes:**
- Create a responsive gallery grid UI with TV-friendly typography, large focusable controls, clear focus outlines, and English-only text.
- Add flows to populate the gallery by pasting image URLs and uploading JPG/PNG/WebP files, then render items as thumbnail tiles with basic metadata.
- Implement a full-screen viewer with Next/Previous controls, visible index (e.g., “3 / 20”), and remote-friendly keyboard support (D-pad/arrow keys, Enter/OK, Back/Escape).
- Add slideshow mode with Play/Pause and configurable interval (3s/5s/10s), with consistent end-of-list behavior.
- Add zoom controls (In/Out/Reset) with min/max limits, plus panning via drag and arrow keys when zoomed.
- Add a “more options” menu with Fit-to-Screen vs Actual Size toggle, Rotate Left/Right (90°), and optional image info.
- Implement TV-friendly accessibility and focus management (keyboard-only operation, focus trapping/restoration for modal/menus, sensible tab order).
- Apply a coherent living-room theme that is high-contrast and readable, avoiding blue/purple as dominant colors.
- Add a Motoko backend API to create/list/get/delete gallery items and serve uploaded image blobs; integrate via React Query.
- Add and reference generated static assets (logo and subtle background texture) from `frontend/public/assets/generated`.

**User-visible outcome:** Users can add images (URL or upload), browse them in a responsive grid on TV/phone/tablet, open a full-screen viewer, navigate next/previous, run a slideshow, zoom/pan, rotate and change fit mode, and operate everything with a TV remote/keyboard or touch/mouse.
