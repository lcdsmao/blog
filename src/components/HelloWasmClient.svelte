<script lang="ts">
  import { onMount } from "svelte"

  let status = "Loading..."
  let message = ""

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
      message = typeof module?.hello === "function" ? module.hello() : "Hello World"
      status = "Ready"
    } catch (err) {
      status = "Failed to load WASM"
      message = "WASM unavailable"
    }
  })
</script>

<div class="hello">
  <div class="mute">{status}</div>
  <div style="font-size: 1.6rem; font-weight: 600;">{message}</div>
</div>
