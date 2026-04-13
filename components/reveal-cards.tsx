'use client';

import { AnimatePresence, motion } from 'framer-motion';

type RevealCardsProps = {
  items: string[];
  visibleCount: number;
  onReveal: () => void;
  onComplete: () => void;
};

export function RevealCards({ items, visibleCount, onReveal, onComplete }: RevealCardsProps) {
  const canRevealMore = visibleCount < items.length;

  return (
    <div className="space-y-4 text-left">
      <AnimatePresence initial={false}>
        {items.slice(0, visibleCount).map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, delay: index * 0.05 }}
            className="rounded-[24px] border border-amber-200/50 bg-white/70 px-4 py-4 text-sm leading-7 text-amber-950/82 shadow-[0_8px_20px_rgba(128,94,50,0.04)] sm:px-5 sm:text-base"
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="pt-3 text-center">
        {canRevealMore ? (
          <button type="button" onClick={onReveal} className="primary-button text-sm">
            buka lagi satu 🤍
          </button>
        ) : (
          <button type="button" onClick={onComplete} className="secondary-button text-sm">
            ada satu hal yang masih aku inget...
          </button>
        )}
      </div>
    </div>
  );
}
