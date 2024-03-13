'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Fluid = dynamic(() => import('./Fluid/Fluid'), { ssr: false });

export default function HomeSection() {

  const transitionText = (str: string, lineNum: number) => {
    const strArr: string[] = [];
    str.split(' ').forEach((el) => { 
      el.split('').forEach(c => strArr.push(c));
      strArr.push(' ');
    }); 
    
    return strArr.map((el, i) => (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.2,
          delay: (i/50)+(lineNum/2),
        }}
        key={i}
      >
        {el}
      </motion.span>
    ));
  };

  return (
    <section className='flex relative w-full' id='Home'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-white'>
        <p className='text-2xl md:text-3xl '>{transitionText('Hello there...', 1)}</p>
        <h1 className='text-5xl md:text-7xl py-2'>{transitionText(`I'M MO`, 2)}</h1>
        <p className='text-2xl md:text-3xl'>{transitionText(`A Passionate Developer`, 3)}</p>
      </div>

      <Fluid />
    </section>
  );
}
