import HomeIcon from '@mui/icons-material/Home';
import { ReactNode } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';

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
    <nav className='fixed left-0 top-0 h-screen w-[140px] flex flex-col justify-center items-start pl-5 gap-3'>
      <IconButtonWithLabel icon={<HomeIcon fontSize='medium' />} section='Home' />
      <IconButtonWithLabel icon={<PersonIcon fontSize='medium' />} section='About' />
      <IconButtonWithLabel icon={<HomeRepairServiceIcon fontSize='medium' />} section='Skills' />
      <IconButtonWithLabel icon={<RoomServiceIcon fontSize='medium' />} section='Services' />
      <IconButtonWithLabel icon={<BusinessCenterIcon fontSize='medium' />} section='Portfolio' />
      <IconButtonWithLabel icon={<EmailIcon fontSize='medium' />} section='Contact' />
    </nav>
  );
}
