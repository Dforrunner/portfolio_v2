'use client';

import { cn } from '@/utils/cn';
import { TextFadeIn } from './Animate/TextFadeIn';
import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

export default function SectionTitle({ title, className }: { title: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className={cn('group relative h-[52px] flex justify-center cursor-default', className)}
      ref={ref}
    >
      <h1 className='text-4xl group/item'>
        <TextFadeIn text={title} />
      </h1>
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0}}
          transition={{ duration: 2 }}
          className='h-[2px] w-36 bg-zinc-200 absolute bottom-0 group-hover:bg-blue-600 group-hover:w-44 transition-all duration-300 ease-in-out'
        />
      )}
    </div>
  );
}
