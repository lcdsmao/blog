/// <reference path="../.astro/types.d.ts" />
declare module "/wasm/hello/hello.js" {
  export default function init(): Promise<void>
  export function hello(): string
}
