'use client';

import { useEffect } from 'react';
import FluidApp from './FluidApp';

export default function Fluid() {
  useEffect(() => {
    FluidApp('FluidContent');
    document.body.dispatchEvent(new Event('click'));
  }, []);
  return <canvas id='FluidContent' className='w-full h-full'></canvas>;
}
