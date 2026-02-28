<script lang="ts">
  import { onMount } from "svelte"

  let container: HTMLDivElement | null = null
  let enabled = true
  let clickCount = 0

  const update = (x: number, y: number) => {
    if (!container) return
    container.style.setProperty("--px", x.toFixed(2))
    container.style.setProperty("--py", y.toFixed(2))
  }

  const revealHello = () => {
    const target = document.querySelector("[data-hello-link]")
    if (target) target.classList.add("visible")
  }

  onMount(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    enabled = !media.matches && !isTouch

    if (!enabled) return

    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (event.clientX / innerWidth - 0.5) * 2
      const y = (event.clientY / innerHeight - 0.5) * 2
      update(x, y)
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  })

  const handleClick = () => {
    clickCount += 1
    if (clickCount === 7) revealHello()
  }
</script>

<div bind:this={container} class="parallax" on:click={handleClick}>
  <div class="parallax-layer layer-1" style="transform: translate3d(calc(var(--px, 0) * 20px), calc(var(--py, 0) * 14px), 0);"></div>
  <div class="parallax-layer layer-2" style="transform: translate3d(calc(var(--px, 0) * 12px), calc(var(--py, 0) * 8px), 0);"></div>
  <div class="parallax-layer layer-3" style="transform: translate3d(calc(var(--px, 0) * 6px), calc(var(--py, 0) * 4px), 0);"></div>
</div>
