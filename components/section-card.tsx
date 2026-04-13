'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SectionCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionCard({ children, className }: SectionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.99 }}
      transition={{ duration: 0.38, ease: 'easeOut' }}
      className={cn(
        'card-surface mx-auto w-full max-w-xl rounded-[30px] px-5 py-6 text-center sm:px-8 sm:py-8',
        className
      )}
    >
      {children}
    </motion.section>
  );
}
