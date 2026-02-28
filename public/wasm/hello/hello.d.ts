/* tslint:disable */
/* eslint-disable */

export enum AnimState {
    Typing = 0,
    Hold = 1,
    Erase = 2,
    Pause = 3,
}

export class Animator {
    free(): void;
    [Symbol.dispose](): void;
    full_message(): string;
    constructor(hour: number, locale: string, time_zone: string, local_time: string, seed: number);
    set_local_time(local_time: string): void;
    tick(delta_ms: number): TickResult;
    tick_with_time(delta_ms: number, local_time: string): TickResult;
}

export class TickResult {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    readonly caret_on: boolean;
    readonly phase: number;
    readonly text: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_animator_free: (a: number, b: number) => void;
    readonly __wbg_tickresult_free: (a: number, b: number) => void;
    readonly animator_full_message: (a: number) => [number, number];
    readonly animator_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly animator_set_local_time: (a: number, b: number, c: number) => void;
    readonly animator_tick: (a: number, b: number) => number;
    readonly animator_tick_with_time: (a: number, b: number, c: number, d: number) => number;
    readonly tickresult_caret_on: (a: number) => number;
    readonly tickresult_phase: (a: number) => number;
    readonly tickresult_text: (a: number) => [number, number];
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
