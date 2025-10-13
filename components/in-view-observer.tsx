"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function InViewObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            el.classList.add("in-view");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 } // 20% visible
    );
    return () => observer.disconnect();
  }, [pathname]);
  return <></>;
}
