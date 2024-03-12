import { useState } from 'react';
import HamburgerMenuButton from './HamburgerMenuButton';
import { Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLinks } from './NavLinks';
import Link from 'next/link';
import ColorModeToggle from '@/components/ColorModeToggle';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className='fixed top-0 flex md:hidden justify-end w-full p-3'>
      <HamburgerMenuButton open={open} onClick={() => setOpen((prevState) => !prevState)} />

      {
        <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
          <div className='w-[300px] bg-white dark:bg-slate-900 dark:text-white h-full'>
            <HamburgerMenuButton open={open} onClick={() => setOpen((prevState) => !prevState)} />
            {NavLinks.map((route) => (
              <ListItem key={route.section + 'mobilenav'} disablePadding>
                <Link href={`#${route.section}`} className='w-full'>
                  <ListItemButton onClick={() => setOpen(false)}>
                    <ListItemIcon className='text-gray-700 dark:text-white group-hover:text-white'>
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText primary={route.section} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <ListItem>
              <ColorModeToggle />
            </ListItem>
          </div>
        </Drawer>
      }
    </nav>
  );
}
