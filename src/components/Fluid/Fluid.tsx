'use client';

import { useEffect, useState } from 'react';
import FluidApp from './FluidApp';
import { Slider } from '@mui/material';

export default function Fluid() {
  useEffect(() => {
    const canvas = document.getElementById('FluidContent');
    FluidApp('FluidContent');
    const timer = setTimeout(() => {
      if (canvas) {
        canvas.dispatchEvent(new Event('mousedown'));
      }

      clearTimeout(timer);
    }, 500);
  }, []);
  return (
    <canvas
      id='FluidContent'
      className='w-screen h-screen hidden xl:block'
    ></canvas>
  );
}
