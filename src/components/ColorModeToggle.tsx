'use client';

import { useEffect, useState } from 'react';

function SunButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className='w-[35px] h-[35px] rounded-full bg-slate-400 flex justify-center items-center cursor-pointer'
      onClick={onClick}
    >
      <svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'>
        <path
          fill='yellow'
          d='M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z'
        />
      </svg>
    </div>
  );
}

function MoonButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className='w-[35px] h-[35px] rounded-full bg-slate-600 flex justify-center items-center cursor-pointer'
      onClick={onClick}
    >
      <svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 20 20'>
        <path
          fill='white'
          d='M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z'
        />
      </svg>
    </div>
  );
}
export default function ColorModeToggle() {
  const [checked, setChecked] = useState(false);

  const enableDarkMode = (enableDarkMode: boolean) => {
    setChecked(enableDarkMode);

    //Add/Remove dark class to the root element and from local storage
    if (enableDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    }
  };

  useEffect(() => {
    //Check if dark mode is enabled in local storage
    const darkMode = localStorage.getItem('darkMode');
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    //Set the checked state based on local storage value or by default user preference if there is no value in local storage
    if ((darkMode && darkMode === 'enabled') || (!darkMode && prefersDarkMode)) {
      document.documentElement.classList.add('dark');
      setChecked(true);
    }
  }, []);

  return (
    <div className='fixed top-0 right-0 p-3'>
      {!checked && <SunButton onClick={() => enableDarkMode(true)} />}
      {checked && <MoonButton onClick={() => enableDarkMode(false)} />}
    </div>
  );
}
