<script lang="ts">
  import { onMount } from "svelte"
  import { Spring } from "svelte/motion"

  type Mode = "light" | "dark"
  let mode: Mode = "light"
  let mounted = false

  const springConfig = { stiffness: 0.12, damping: 0.6 }

  const svg = new Spring({ rotate: 180, opacity: 1 }, springConfig)
  const mask = new Spring({ cx: 100, cy: 0, r: 3 }, springConfig)
  const center = new Spring({ r: 5 }, springConfig)
  let rayStates = Array.from({ length: 8 }).map(() => ({
    scale: 1,
    opacity: 1,
  }))

  const applyMode = (next: Mode) => {
    mode = next
    document.documentElement.dataset.theme = next
    localStorage.setItem("theme", next)
  }

  const setMoon = () => {
    svg.set({ rotate: 45, opacity: 1 })
    mask.set({ cx: 50, cy: 3, r: 9 })
    center.set({ r: 9 })
    rayStates = rayStates.map(() => ({ scale: 0, opacity: 0 }))
  }

  const setSun = () => {
    svg.set({ rotate: 180, opacity: 1 })
    mask.set({ cx: 100, cy: 0, r: 3 })
    center.set({ r: 5 })
    rayStates = rayStates.map(() => ({ scale: 0, opacity: 0 }))
    rayStates.forEach((_, i) => {
      setTimeout(() => {
        rayStates = rayStates.map((ray, index) =>
          index === i ? { scale: 1, opacity: 1 } : ray
        )
      }, i * 50)
    })
  }

  const toggle = () => {
    const next = mode === "light" ? "dark" : "light"
    applyMode(next)
    next === "dark" ? setMoon() : setSun()
  }

  onMount(() => {
    const saved = (localStorage.getItem("theme") as Mode | null) ?? "light"
    applyMode(saved)
    saved === "dark" ? setMoon() : setSun()
    mounted = true
  })
</script>

<button
  class="toggle-button"
  aria-label={`Toggle ${mode === "light" ? "Dark" : "Light"}`}
  on:click={toggle}
>
  {#if mounted}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      style={`transform: rotate(${svg.current.rotate}deg); opacity: ${svg.current.opacity};`}
    >
      <defs>
        <mask id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle
            fill="black"
            cx={mask.current.cx + "%"}
            cy={mask.current.cy}
            r={mask.current.r}
          />
        </mask>
      </defs>
      <circle
        cx="12"
        cy="12"
        fill="currentColor"
        mask="url(#moon-mask)"
        r={center.current.r}
      />
      {#each rayStates as ray, i}
        {#key i}
          <circle
            cx={12 + 9 * Math.cos(Math.PI / 2 - (i * Math.PI) / 4)}
            cy={12 - 9 * Math.sin(Math.PI / 2 - (i * Math.PI) / 4)}
            r="1.5"
            fill="currentColor"
            style={`transform-origin: center; transform: scale(${ray.scale}); opacity: ${ray.opacity}; transition: transform 250ms ease, opacity 250ms ease;`}
          />
        {/key}
      {/each}
    </svg>
  {/if}
</button>
