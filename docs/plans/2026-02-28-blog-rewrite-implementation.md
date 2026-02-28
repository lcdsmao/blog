# Blog Rewrite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing Gatsby blog with a static Astro site using Svelte islands, preserve the dark toggle animation, add a parallax background, and include a Rust WASM “Hello World” at `/hello` unlocked after 7 background clicks.

**Architecture:** Astro renders static pages and shared layout; Svelte components handle interactive behavior (dark toggle, parallax, unlock). The `/hello` page loads a Rust WASM bundle compiled by wasm-pack during build. No SSR or server routes.

**Tech Stack:** Astro, Svelte, TypeScript, CSS, Rust + wasm-bindgen, Playwright.

---

### Task 1: Remove Gatsby-specific structure

**Files:**

- Delete: `gatsby-browser.js`
- Delete: `gatsby-config.js`
- Delete: `gatsby-node.js`
- Delete: `gatsby-ssr.js`
- Delete: `content/`
- Delete: `src/components/`
- Delete: `src/hooks/`
- Delete: `src/images/`
- Delete: `src/pages/`
- Delete: `src/templates/`
- Delete: `src/gatsby-plugin-theme-ui/`
- Delete: `src/types.ts`
- Delete: `src/utils/`

**Step 1: Delete the Gatsby files and folders**

Run: `rm -rf gatsby-browser.js gatsby-config.js gatsby-node.js gatsby-ssr.js content src/components src/hooks src/images src/pages src/templates src/gatsby-plugin-theme-ui src/types.ts src/utils`

Expected: Paths removed, working tree shows deletions.

**Step 2: Commit**

```bash
git add -A
git commit -m "chore: remove gatsby files"
```

---

### Task 2: Create Astro project structure and config

**Files:**

- Create: `astro.config.mjs`
- Create: `src/pages/index.astro`
- Create: `src/pages/hello.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/styles/global.css`
- Create: `src/components/ParallaxBackground.svelte`
- Create: `src/components/DarkToggle.svelte`
- Create: `src/components/GitHubLink.svelte`
- Create: `src/components/HelloWasmClient.svelte`

**Step 1: Create base Astro config**

Create `astro.config.mjs` with Svelte integration and static output:

```js
import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"

export default defineConfig({
  output: "static",
  integrations: [svelte()],
})
```

**Step 2: Add base layout and global styles**

Create `src/layouts/BaseLayout.astro` and `src/styles/global.css` to:

- Define CSS variables for light/dark themes.
- Include a non-default font stack (e.g. "Cormorant Garamond" + "Space Grotesk").
- Add background gradients inspired by “The Scream.”
- Add `prefers-reduced-motion` handling.

**Step 3: Add placeholder pages**

Create minimal `src/pages/index.astro` and `src/pages/hello.astro` using the layout and placeholders for components.

**Step 4: Commit**

```bash
git add astro.config.mjs src
git commit -m "feat: add astro skeleton"
```

---

### Task 3: Update package.json for Astro + Svelte + Playwright

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Replace dependencies and scripts**

Update `package.json`:

- Remove Gatsby/React/theme-ui dependencies.
- Add `astro`, `svelte`, `@astrojs/svelte`, `typescript`.
- Add Playwright dev dependencies: `@playwright/test`.
- Add scripts:
  - `dev`: `astro dev`
  - `build:wasm`: `wasm-pack build wasm/hello --target web --out-dir public/wasm/hello`
  - `build`: `npm run build:wasm && astro build`
  - `preview`: `astro preview`
  - `test:e2e`: `playwright test`

**Step 2: Install deps**

Run: `npm install`

Expected: `package-lock.json` updated without Gatsby deps.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: switch to astro and svelte"
```

---

### Task 4: Implement the dark mode toggle in Svelte

**Files:**

- Create: `src/components/DarkToggle.svelte`
- Modify: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Port the SVG toggle**

Use `src/components/DarkToggleButton.tsx` from the old code as reference. Implement the same SVG structure and properties in Svelte. Use `svelte/motion` spring stores to mirror the current animation timing (`mass`, `tension`, `friction`) and values in the existing `sunProp`/`moonProp` objects.

**Step 2: Persist theme**

Use `localStorage` to store theme and set a `data-theme` attribute on `document.documentElement`. Add a small inline script in `BaseLayout.astro` to apply the saved theme before paint.

**Step 3: Update CSS variables**

Add light/dark theme variable sets in `src/styles/global.css` and ensure the toggle icon color uses `currentColor`.

**Step 4: Commit**

```bash
git add src/components/DarkToggle.svelte src/styles/global.css src/layouts/BaseLayout.astro
git commit -m "feat: add dark mode toggle"
```

---

### Task 5: Implement the parallax background and unlock logic

**Files:**

- Create: `src/components/ParallaxBackground.svelte`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

**Step 1: Build parallax layers**

Create 3-5 background layers with different depth multipliers. Use mousemove to update CSS variables, and apply `transform: translate3d(...)` per layer.

**Step 2: Add reduced-motion + touch fallback**

Detect `prefers-reduced-motion` and touch devices to disable motion and keep a static background.

**Step 3: Add 7-click unlock**

Track clicks on the background. After 7 clicks, set a state flag to reveal a `/hello` link. Keep state in memory (no persistence required).

**Step 4: Commit**

```bash
git add src/components/ParallaxBackground.svelte src/pages/index.astro src/styles/global.css
git commit -m "feat: add parallax background and unlock"
```

---

### Task 6: Create the minimal home layout

**Files:**

- Modify: `src/pages/index.astro`
- Create: `src/components/GitHubLink.svelte`
- Modify: `src/styles/global.css`

**Step 1: Add avatar and GitHub link**

Use `https://github.com/lcdsmao.png` as avatar. Add a GitHub icon linking to `https://github.com/lcdsmao`.

**Step 2: Compose the layout**

Place avatar, GitHub link, and dark toggle centered and minimal. Ensure responsive behavior.

**Step 3: Commit**

```bash
git add src/pages/index.astro src/components/GitHubLink.svelte src/styles/global.css
git commit -m "feat: add minimal home content"
```

---

### Task 7: Add Rust WASM hello module

**Files:**

- Create: `wasm/hello/Cargo.toml`
- Create: `wasm/hello/src/lib.rs`
- Modify: `package.json`
- Modify: `.gitignore`

**Step 1: Create the Rust crate**

Create a `cdylib` crate with `wasm-bindgen` and a function that returns a greeting string:

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn hello() -> String {
    "Hello World".to_string()
}
```

**Step 2: Ignore generated wasm output**

Add `public/wasm/hello/` to `.gitignore` if generated by build.

**Step 3: Commit**

```bash
git add wasm/hello .gitignore package.json
git commit -m "feat: add rust wasm hello"
```

---

### Task 8: Wire `/hello` page to load WASM

**Files:**

- Create: `src/components/HelloWasmClient.svelte`
- Modify: `src/pages/hello.astro`

**Step 1: Create a WASM loader component**

`HelloWasmClient.svelte` should:

- Dynamically import `/wasm/hello/hello.js`.
- Call `hello()` and render the result.
- Show loading and error states.

**Step 2: Add component to `/hello`**

Use `client:load` to run on the client.

**Step 3: Commit**

```bash
git add src/components/HelloWasmClient.svelte src/pages/hello.astro
git commit -m "feat: load wasm hello page"
```

---

### Task 9: Add Playwright smoke tests

**Files:**

- Create: `playwright.config.ts`
- Create: `tests/e2e/home.spec.ts`
- Create: `tests/e2e/hello.spec.ts`
- Modify: `package.json`

**Step 1: Configure Playwright**

Add a config that serves the built site or uses `astro dev` in CI.

**Step 2: Add tests**

Home test should assert avatar and GitHub link are visible. Hello test should navigate to `/hello` and see “Hello World” after load.

**Step 3: Run tests**

Run: `npm run test:e2e`

Expected: All tests pass.

**Step 4: Commit**

```bash
git add playwright.config.ts tests/e2e package.json
git commit -m "test: add playwright smoke tests"
```

---

### Task 10: Final verification

**Step 1: Build**

Run: `npm run build`

Expected: Astro build succeeds and `public/wasm/hello` is generated.

**Step 2: Manual checks**

- Toggle animation matches old behavior.
- Parallax motion responds to mouse movement on desktop.
- 7-click unlock reveals `/hello` navigation.
- `/hello` shows “Hello World”.
- Reduced-motion disables parallax.

**Step 3: Commit any small fixes**

```bash
git add -A
git commit -m "chore: finalize rewrite"
```

---

## Notes

- If `wasm-pack` is not installed, run: `cargo install wasm-pack`.
- Optional: Use @playwright-cli to validate interactions visually.
