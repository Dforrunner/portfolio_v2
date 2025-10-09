"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
}
export function Loading({ className }: Props) {
  const [dots, setDots] = useState("...");

  useEffect(() => {
    // Animate dots every 600ms
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 300);
    return () => {
      clearInterval(dotsInterval);
    };
  }, []);
  return (
    <div
      className={cn(
        "container m-auto py-10 px-4 max-w-3xl flex flex-col items-center justify-center relative",
        className
      )}
    >
      <div className="text-xl text-center text-muted-foreground absolute">loading{dots}</div>
      <div className="animate-spin rounded-full h-28 w-28 border-b-2 border-primary"></div>
    </div>
  );
}
