declare module "/wasm/hello/hello.js" {
  export default function init(): Promise<void>
  export function hello(): string
}
