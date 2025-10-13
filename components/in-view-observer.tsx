'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function InViewObserver() {
  const pathname = usePathname();
  useEffect(() => {
    console.log('called');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            el.classList.add('in-view');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 } // 20% visible
    );

    // 👇 Only target elements you explicitly mark for animation
    const elements = document.querySelectorAll('.anime-on-view');

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        el.classList.add('in-view');
      } else {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [pathname]);
  return <></>;
}
