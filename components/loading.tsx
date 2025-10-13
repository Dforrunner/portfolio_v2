'use client';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
}
export function Loading({ className }: Props) {
  const [dots, setDots] = useState('...');

  useEffect(() => {
    // Animate dots every 600ms
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 300);
    return () => {
      clearInterval(dotsInterval);
    };
  }, []);
  return (
    <div
      className={cn(
        'relative container m-auto flex max-w-3xl flex-col items-center justify-center px-4 py-10',
        className
      )}
    >
      <div className="text-muted-foreground absolute text-center text-xl">loading{dots}</div>
      <div className="border-primary h-28 w-28 animate-spin rounded-full border-b-2"></div>
    </div>
  );
}
