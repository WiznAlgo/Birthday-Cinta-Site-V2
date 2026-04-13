'use client';

import { sceneLabels } from '@/data/content';
import { cn } from '@/lib/utils';

type ProgressBarProps = {
  current: number;
};

export function ProgressBar({ current }: ProgressBarProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-5 sm:px-6">
      <div className="mb-3 flex items-center justify-between text-[11px] font-medium tracking-[0.14em] text-amber-900/60 uppercase">
        <span>dibuka pelan-pelan</span>
        <span>
          {current + 1} / {sceneLabels.length}
        </span>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-full border border-amber-200/40 bg-white/40 px-4 py-3 backdrop-blur-sm">
        {sceneLabels.map((label, index) => (
          <div
            key={label}
            className={cn(
              'progress-dot',
              index < current && 'is-past',
              index === current && 'is-active'
            )}
            aria-label={label}
            title={label}
          />
        ))}
      </div>

      <p className="mt-2 text-center text-xs text-amber-900/55">{sceneLabels[current]}</p>
    </div>
  );
}
