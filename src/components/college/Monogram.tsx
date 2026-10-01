import { cn } from '@/lib/utils';

export function getMonogram(name: string): string {
  const words = name.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 3).toUpperCase();
}

const SIZES = {
  sm: 'w-8 h-8 text-[10px] rounded-lg',
  md: 'w-11 h-11 text-xs rounded-xl',
  lg: 'w-16 h-16 text-base rounded-2xl',
};

export default function Monogram({
  name,
  size = 'md',
  tone = 'ink',
  className,
}: {
  name: string;
  size?: keyof typeof SIZES;
  tone?: 'ink' | 'paper' | 'accent';
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex items-center justify-center shrink-0 font-mono font-semibold tracking-tight',
        SIZES[size],
        tone === 'ink' && 'bg-ink text-paper',
        tone === 'paper' && 'bg-paper-2 text-ink border border-line',
        tone === 'accent' && 'bg-accent text-white',
        className,
      )}
    >
      {getMonogram(name)}
    </span>
  );
}
