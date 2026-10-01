'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface Props {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Group thousands with Indian-style commas. */
  grouped?: boolean;
  duration?: number;
  /** Count from zero the first time it scrolls into view. */
  fromZero?: boolean;
  className?: string;
}

function format(n: number, decimals: number, grouped: boolean) {
  const fixed = n.toFixed(decimals);
  if (!grouped) return fixed;
  const [int, dec] = fixed.split('.');
  return Number(int).toLocaleString('en-IN') + (dec ? `.${dec}` : '');
}

/** Tweens between numeric values; used for scores, ranks and metrics. */
export default function AnimatedNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  grouped = false,
  duration = 0.5,
  fromZero = false,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(fromZero && !reduce ? 0 : value);
  const current = useRef(display);

  useEffect(() => {
    if (fromZero && !inView) return;
    if (reduce) {
      current.current = value;
      setDisplay(value);
      return;
    }
    const controls = animate(current.current, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: v => {
        current.current = v;
        setDisplay(v);
      },
    });
    return () => controls.stop();
  }, [value, inView, fromZero, reduce, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(display, decimals, grouped)}
      {suffix}
    </span>
  );
}
