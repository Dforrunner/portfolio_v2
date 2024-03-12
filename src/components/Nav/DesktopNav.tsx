import { ReactNode } from 'react';
import Link from 'next/link';
import { NavLinks } from './NavLinks';

function IconButtonWithLabel({ icon, section }: { icon: ReactNode; section: string }) {
  return (
    <Link href={`#${section}`}>
      <div className='bg-gray-200 dark:bg-gray-600 dark:hover:bg-slate-700 hover:bg-slate-400 rounded-full p-3 w-[50px] h-[50px] hover:min-w-[140px] hover:rounded-[25px] group flex justify-between items-center transition-all duration-300 ease-in-out'>
        <span className='text-gray-700 dark:text-white group-hover:text-white'>{icon}</span>
        <span className='pr-2 text-gray-900 group-hover:text-gray-100 dark:text-gray-100 text-[0] group-hover:text-[18px] group-hover:inline-flex transition-all duration-200 '>
          {section}
        </span>
      </div>
    </Link>
  );
}

export default function Nav() {
  return (
    <nav className='hidden fixed left-0 top-0 h-screen w-[140px] md:flex flex-col justify-center items-start pl-5 gap-3 z-50'>
      {NavLinks.map((route) => (
        <IconButtonWithLabel key={route.section} icon={route.icon} section={route.section} />
      ))}
    </nav>
  );
}
