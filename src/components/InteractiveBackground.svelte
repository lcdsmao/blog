<script lang="ts">
  import { onMount } from "svelte"

  let container: HTMLDivElement | null = null
  let enabled = true
  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0
  let rafId = 0

  const update = (x: number, y: number) => {
    if (!container) return
    container.style.setProperty("--mx", x.toFixed(2))
    container.style.setProperty("--my", y.toFixed(2))
  }

  onMount(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    enabled = !media.matches

    if (!enabled) return

    const handleMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      targetX = (event.clientX / innerWidth - 0.5) * 2
      targetY = (event.clientY / innerHeight - 0.5) * 2
    }

    const loop = () => {
      if (!enabled) return
      currentX += (targetX - currentX) * 0.2
      currentY += (targetY - currentY) * 0.2
      update(currentX, currentY)
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", handleMove)
    rafId = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      cancelAnimationFrame(rafId)
    }
  })
</script>

<div bind:this={container} class="parallax">
  <div class="parallax-layer layer-1"></div>
  <div class="parallax-layer layer-2"></div>
  <div class="parallax-layer layer-3"></div>
</div>
