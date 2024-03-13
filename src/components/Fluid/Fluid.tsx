'use client';

import { useEffect } from 'react';
import FluidApp from './FluidApp';

export default function Fluid() {
  useEffect(() => {
    FluidApp('FluidContent');
    const el = document.getElementById('FluidContent');
    const timer = setTimeout(() => {
      el?.dispatchEvent(new Event('mousedown'));
      clearTimeout(timer);
    }, 500);
  }, []);
  return <canvas id='FluidContent' className='w-full h-screen hidden xl:block'></canvas>;
}
