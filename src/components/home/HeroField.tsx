'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';
import { COLLEGES } from '@/lib/mockData';

// Positions are percentages of the hero box; kept in the side gutters so
// they never sit behind the headline or the search console.
const NODES: { id: string; x: number; y: number; side: 'l' | 'r' }[] = [
  { id: 'iit-bombay', x: 7.5, y: 30, side: 'l' },
  { id: 'vjti', x: 10, y: 52, side: 'l' },
  { id: 'nmims', x: 4.5, y: 72, side: 'l' },
  { id: 'bits-pilani', x: 91.5, y: 26, side: 'r' },
  { id: 'coep', x: 94.5, y: 49, side: 'r' },
  { id: 'manipal', x: 90.5, y: 71, side: 'r' },
];

const EDGES: [number, number][] = [[0, 1], [1, 2], [0, 2], [3, 4], [4, 5], [3, 5]];

/**
 * A quiet "living map" of the demo dataset: each node is a real record
 * (score, median CTC) drifting in the gutters, joined by thin lines, with a
 * percentile curve along the base. Fades back as the hero scrolls away.
 */
export default function HeroField({ progress, dim = false }: { progress: MotionValue<number>; dim?: boolean }) {
  const fade = useTransform(progress, [0, 0.6], [1, 0.15]);
  const nodes = NODES.map(n => ({ ...n, college: COLLEGES.find(c => c.id === n.id)! }));

  return (
    <motion.div aria-hidden style={{ opacity: fade }} className="pointer-events-none absolute inset-0 hidden xl:block">
      <div className={`absolute inset-0 transition-opacity duration-500 ${dim ? 'opacity-40' : 'opacity-100'}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {EDGES.map(([a, b], i) => {
          const A = nodes[a];
          const B = nodes[b];
          const mx = (A.x + B.x) / 2 + (A.side === 'l' ? 4 : -4);
          return (
            <path
              key={i}
              d={`M${A.x} ${A.y} Q ${mx} ${(A.y + B.y) / 2} ${B.x} ${B.y}`}
              fill="none"
              stroke="#121417"
              strokeOpacity={0.12}
              strokeWidth={1}
              strokeDasharray="2 4"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        {/* Long arc linking both clusters behind the headline */}
        <path
          d="M 7.5 30 C 30 6, 70 6, 91.5 26"
          fill="none"
          stroke="#2b4fe0"
          strokeOpacity={0.16}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        {/* Percentile curve */}
        <path
          d="M 0 96 C 22 96, 34 94, 46 86 S 70 70, 100 68"
          fill="none"
          stroke="#121417"
          strokeOpacity={0.1}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {nodes.map((n, i) => (
        <div
          key={n.id}
          className="absolute animate-drift"
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * -1.1}s` }}
        >
          <span className="absolute -left-[5px] -top-[5px] block h-[10px] w-[10px] rounded-full border border-ink/25 bg-paper" />
          <span className="absolute -left-[2px] -top-[2px] block h-[4px] w-[4px] rounded-full bg-accent" />
          <div className={`absolute top-2 whitespace-nowrap ${n.side === 'l' ? 'left-3' : 'right-3 text-right'}`}>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink-2/70">{n.college.shortName}</p>
            <p className="font-mono text-[10px] text-faint nums">
              {n.college.realityScore} · ₹{n.college.medianPackage}L · {n.college.city}
            </p>
          </div>
        </div>
      ))}
      </div>
    </motion.div>
  );
}
