/// <reference path="../.astro/types.d.ts" />
declare module "*.wasm" {
  const wasmUrl: string
  export default wasmUrl
}
