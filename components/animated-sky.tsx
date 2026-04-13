'use client';

import { cn } from '@/lib/utils';

type AnimatedSkyProps = {
  variant: 'sky' | 'soft' | 'warm' | 'vault';
};

export function AnimatedSky({ variant }: AnimatedSkyProps) {
  const backgroundClass =
    variant === 'vault'
      ? 'scene-vault'
      : variant === 'warm'
        ? 'scene-warm'
        : variant === 'soft'
          ? 'scene-soft'
          : '';

  return (
    <div className={cn('absolute inset-0 -z-10 overflow-hidden', backgroundClass)}>
      {variant !== 'vault' ? (
        <>
          <div className="floating-cloud left-[-6%] top-[15%] h-12 w-24 opacity-60" />
          <div className="floating-cloud top-[30%] h-8 w-16 opacity-45 [animation-duration:40s]" />
          <div className="floating-cloud top-[60%] h-10 w-20 opacity-35 [animation-duration:44s]" />
        </>
      ) : null}

      <div className="sparkle left-[14%] top-[22%]" />
      <div className="sparkle left-[78%] top-[18%] [animation-delay:0.5s]" />
      <div className="sparkle left-[68%] top-[74%] [animation-delay:1s]" />
    </div>
  );
}
