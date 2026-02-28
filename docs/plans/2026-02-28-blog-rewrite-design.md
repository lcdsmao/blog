# Blog Rewrite Design

Date: 2026-02-28

## Goals
- Rewrite the blog as a static site hosted on Vercel.
- Remove old markdown content and keep a minimal home page.
- Preserve the existing dark mode toggle animation (SVG/CSS behavior) exactly.
- Add a parallax background inspired by Edvard Munch’s “The Scream.”
- Provide a WASM-capable path at `/hello` with a Rust “Hello World” module.
- Allow unlocking `/hello` after 7 background clicks.

## Non-Goals
- SSR or dynamic server features.
- Additional profile content beyond avatar, GitHub link, and toggle.
- Complex blog content or content management.

## Proposed Architecture
- **Framework**: Astro for static site generation.
- **UI Islands**: Svelte components for interactive pieces only (toggle, parallax, click counter).
- **Hosting**: Vercel static output (no SSR).
- **WASM**: Rust-compiled WASM bundle loaded on `/hello`.

## Pages & Components
### Home (`/`)
- Foreground: GitHub avatar (The Scream), GitHub icon link, dark mode toggle.
- Background: multi-layer parallax with subtle motion, inspired palette and gradients.
- Interaction: background click counts to 7; once reached, reveals navigation to `/hello`.

### Hello (`/hello`)
- Loads Rust WASM module on demand.
- Displays “Hello World” output from WASM.
- Shows loading and error states.

### Shared
- Layout wrapper with theme variables.
- Dark mode state persisted in `localStorage`.

## Interaction & Data Flow
- **Parallax**: mouse move updates CSS transforms on background layers; disabled for touch and `prefers-reduced-motion`.
- **Unlock**: local click counter stored in component state; once at 7, reveal a link or indicator to `/hello`.
- **Dark Mode**: use the existing SVG/CSS animation logic and match behavior exactly; apply CSS variables to body/root to prevent flicker.

## Error Handling & Fallbacks
- WASM load failure shows a fallback message and keeps `/hello` usable.
- If `localStorage` is unavailable, default to light theme and keep toggle functional.
- Reduced motion and touch devices use static background (no parallax).

## Testing & Verification
- `astro build` for static output.
- Manual smoke checks:
  - dark toggle animation behaves as before
  - parallax responds to mouse movement on desktop
  - `/hello` loads WASM and renders “Hello World”
  - 7-click unlock works
  - reduced-motion disables parallax
- Optional Playwright smoke tests for home and `/hello` routes.

## Open Questions
- None. User approved the design as written.
