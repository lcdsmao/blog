<script lang="ts">
  import { onMount } from "svelte"

  let status = "Loading..."
  let message = ""
  let caretOn = true
  let phase = 0
  let reduceMotion = false

  function hashSeed(value: string): number {
    let hash = 2166136261
    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i)
      hash = Math.imul(hash, 16777619)
    }
    return hash >>> 0
  }

  onMount(async () => {
    try {
      const moduleUrl = new URL("/wasm/hello/hello.js", window.location.origin)
      const wasmUrl = new URL(
        "/wasm/hello/hello_bg.wasm",
        window.location.origin
      )
      const module = await import(/* @vite-ignore */ moduleUrl.toString())
      if (typeof module?.default === "function") {
        await module.default(wasmUrl)
      }
      const media = window.matchMedia("(prefers-reduced-motion: reduce)")
      reduceMotion = media.matches

      const now = new Date()
      const hour = now.getHours()
      const locale = navigator.language || "en"
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Local"
        const formatTime = () =>
          new Date().toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
          })
        let localTime = formatTime()
        const seed = hashSeed(`${now.toDateString()}-${timeZone}`)

      if (typeof module?.Animator === "function") {
        const animator = new module.Animator(hour, locale, timeZone, localTime, seed)
        if (reduceMotion) {
          message = animator.full_message()
          caretOn = false
          phase = 0
        } else {
          let last = performance.now()
          let lastMinute = new Date().getMinutes()
          const loop = (time: number) => {
            const delta = time - last
            last = time
            const currentMinute = new Date().getMinutes()
            if (currentMinute !== lastMinute) {
              lastMinute = currentMinute
              localTime = formatTime()
            }
            const result = animator.tick_with_time(delta, localTime)
            message = result.text
            caretOn = result.caret_on
            phase = result.phase
            requestAnimationFrame(loop)
          }
          requestAnimationFrame(loop)
        }
      } else {
        message = "Hello"
      }
      status = "Ready"
    } catch (err) {
      status = "Failed to load WASM"
      message = "WASM unavailable"
    }
  })
</script>

<div class="hello">
  <div class="mute">{status}</div>
  <div class="hello-message">
    {message}
    <span class:caret={!reduceMotion && caretOn}>|</span>
  </div>
</div>
