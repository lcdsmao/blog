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
    container.style.setProperty("--px", x.toFixed(2))
    container.style.setProperty("--py", y.toFixed(2))
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

    const loop = (time: number) => {
      if (!enabled) return
      const driftX = Math.sin(time / 4500) * 0.2
      const driftY = Math.cos(time / 5200) * 0.2
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      update(currentX + driftX, currentY + driftY)
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
  <div class="parallax-layer layer-1" style="transform: translate3d(calc(var(--px, 0) * 20px), calc(var(--py, 0) * 14px), 0);"></div>
  <div class="parallax-layer layer-2" style="transform: translate3d(calc(var(--px, 0) * 12px), calc(var(--py, 0) * 8px), 0);"></div>
  <div class="parallax-layer layer-3" style="transform: translate3d(calc(var(--px, 0) * 6px), calc(var(--py, 0) * 4px), 0);"></div>
</div>
