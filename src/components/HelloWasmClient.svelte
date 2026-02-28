<script lang="ts">
  import { onMount } from "svelte"

  let status = "Loading..."
  let message = ""

  onMount(async () => {
    try {
      const mod = await import("/wasm/hello/hello.js")
      if (mod?.default) {
        await mod.default()
      }
      message = typeof mod.hello === "function" ? mod.hello() : "Hello World"
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
