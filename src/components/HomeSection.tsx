'use client';

import { motion } from 'framer-motion';

export default function HomeSection() {
  return (
    <section className='flex flex-col-reverse lg:flex-row' id='Home'>
      <div className='w-full flex flex-col justify-center items-center grow min-h-[300px]'>
        <div>
          <p className='text-2xl md:text-3xl'>
            {'Hello there...'.split(' ').map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: i / 5,
                }}
                key={i}
              >
                {el}{' '}
              </motion.span>
            ))}
          </p>
          <h1 className='text-5xl md:text-7xl py-2'>{`I'M MO`}</h1>
          <p className='text-2xl md:text-3xl'>A Passionate Developer</p>
        </div>
      </div>
      <div className='w-full flex justify-center items-center md:px-10 lg:p-0'>
        <div className='w-[90%] max-w-[600px] h-[400px] md:h-[600px] lg:h-[90%]  bg-slate-400 rounded bg-[url(/p1.JPG)] bg-cover bg-center'></div>
      </div>
    </section>
  );
}
