'use client';

import { useEffect, useState } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number;
  className?: string;
};

export function Typewriter({ text, speed = 24, className }: TypewriterProps) {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, speed]);

  return <p className={`${className ?? ''} ${visibleText.length < text.length ? 'type-caret' : ''}`}>{visibleText}</p>;
}
