'use client';

import { useSyncExternalStore } from 'react';

/**
 * A tiny localStorage-backed store for useSyncExternalStore. The server (and
 * the hydration pass) always sees `fallback`, so prerendered markup matches;
 * the stored value takes over right after hydration.
 */
export function createLocalStore<T>(key: string, fallback: T, validate: (v: unknown) => T | undefined = v => v as T) {
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  function read(): T {
    if (cache === undefined) {
      try {
        const raw = window.localStorage.getItem(key);
        cache = (raw ? validate(JSON.parse(raw)) : undefined) ?? fallback;
      } catch {
        cache = fallback;
      }
    }
    return cache;
  }

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: read,
    getServerSnapshot: () => fallback,
    set(next: T | ((prev: T) => T)) {
      cache = typeof next === 'function' ? (next as (prev: T) => T)(read()) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(cache));
      } catch {
        // Storage unavailable (private mode, blocked) — keep the in-memory value.
      }
      listeners.forEach(l => l());
    },
  };
}

export function useLocalStore<T>(store: ReturnType<typeof createLocalStore<T>>) {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}
