"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

interface Props {
  index?: number;
  children: ReactNode;
  innerGlowColor?: string;
  bgGlowColor?: string;
  shine?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}
export function GlassCard({
  index = 0,
  children,
  innerGlowColor = "from-indigo-500 to-blue-500",
  bgGlowColor = "group-hover:shadow-indigo-500/50",
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: Props) {
  const [shine, setShine] = useState(false);
  return (
    <div
      className="group relative"
      onMouseEnter={() => {
        setShine(true);
        if (onMouseEnter) onMouseEnter();
      }}
      onMouseLeave={() => {
        setShine(false);
        if (onMouseLeave) onMouseLeave();
      }}
      onClick={() => onClick?.()}
    >
      <div
        className={cn(
          `relative h-full overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-800 bg-background dark:bg-slate-900/50 p-3 md:p-8 backdrop-blur-sm transition-all duration-500  hover:scale-105 hover:border-slate-400 dark:hover:border-slate-700 hover:shadow-2xl anime-on-view animate-scale-in animate-stagger-${index}`,
          className,
          bgGlowColor
        )}
      >
        {/* Gradient Orb Background */}
        <div
          className={cn(
            `absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`,
            innerGlowColor
          )}
        />
        {children}

        {/* Shine Effect */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
            transform: shine ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.8s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}
