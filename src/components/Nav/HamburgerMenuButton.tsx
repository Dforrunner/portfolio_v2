'use client';

import { cn } from "@/utils/cn";

interface Props {
  open: boolean;
  onClick: () => void;
}
export default function HamburgerMenuButton({ open, onClick }: Props) {
  return (
    <button
      className='text-primary-dark dark:text-white w-10 h-10 relative focus:outline-none'
      onClick={onClick}
    >
      <div className='block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <span
          aria-hidden='true'
          className={cn(
            'block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out',
            open ? 'rotate-45' : '-translate-y-1.5'
          )}
        ></span>
        <span
          aria-hidden='true'
          className={cn(
            'block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out',
            open ? 'opacity-0' : ''
          )}
        ></span>
        <span
          aria-hidden='true'
          className={cn(
            'block absolute h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out',
            open ? '-rotate-45' : 'translate-y-1.5'
          )}
        ></span>
      </div>
    </button>
  );
 }
