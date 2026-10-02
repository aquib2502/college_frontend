'use client';

import { useSyncExternalStore } from 'react';

let now: Date | null = null;
const noop = () => () => {};

/**
 * Current date on the client, `null` on the server and during hydration.
 * Pages are prerendered, so date-relative copy ("in 11 days") must not be
 * computed at build time.
 */
export function useNow() {
  return useSyncExternalStore(
    noop,
    () => (now ??= new Date()),
    () => null,
  );
}
