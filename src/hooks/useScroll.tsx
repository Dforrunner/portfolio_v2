'use client'

import { useState, useEffect } from 'react';

export default function useScroll(scrollY?: number) {
  const [resize, setResized] = useState(false);
  const scrollPos = scrollY || 100;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const listener = () => {
        if (window.scrollY >= scrollPos) {
          setResized(true);
        } else {
          setResized(false);
        }
      };

      document.addEventListener('scroll', listener);

      return () => {
        document.removeEventListener('scroll', listener);
      };
    }
  }, [scrollPos, scrollY]);

  return resize;
}
