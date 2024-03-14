import dynamic from 'next/dynamic';
import { TextFadeIn } from './Animate/TextFadeIn';

const Fluid = dynamic(() => import('./Fluid/Fluid'), { ssr: false });

export default function HomeSection() {
  return (
    <section className='flex relative w-full' id='Home'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-white'>
        <p className='text-2xl md:text-3xl '>
          <TextFadeIn text='Hello there...' lineNum={1} />
        </p>
        <h1 className='text-5xl md:text-7xl py-2'>
          <TextFadeIn text={`I'm Mo`} lineNum={2} />
        </h1>
        <p className='text-2xl md:text-3xl'>
          <TextFadeIn text='A full-stack developer' lineNum={3} />
        </p>
      </div>

      <Fluid />
    </section>
  );
}
