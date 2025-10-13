'use client';

import React, { JSX, useMemo } from 'react';

interface TextClampProps {
  minFont: number; // minimum font size in px
  maxFont: number; // maximum font size in px
  minVw?: number; // minimum viewport width in px
  maxVw?: number; // maximum viewport width in px
  as?: keyof JSX.IntrinsicElements; // HTML tag to render
  className?: string;
  children: React.ReactNode;
}

/**
 * TextClamp
 * Wrap any content and scale font size responsively between minFont and maxFont,
 * based on viewport width between minVw and maxVw.
 */
export default function TextClamp({
  minFont,
  maxFont,
  minVw = 375,
  maxVw = 1440,
  as: Tag = 'div',
  className,
  children,
}: TextClampProps) {
  const clampStyle = useMemo(() => {
    const slope = ((maxFont - minFont) / (maxVw - minVw)) * 100;
    const intercept = minFont - (slope * minVw) / 100;

    const fontSize = `clamp(${minFont}px, calc(${slope.toFixed(3)}vw + ${intercept.toFixed(
      2
    )}px), ${maxFont}px)`;

    return { fontSize };
  }, [minFont, maxFont, minVw, maxVw]);

  return (
    <Tag style={clampStyle} className={className}>
      {children}
    </Tag>
  );
}
