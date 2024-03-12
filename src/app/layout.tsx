import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ColorModeToggle from '@/components/ColorModeToggle';
import Nav from '@/components/Nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Muhammet Barut - Fullstack Developer',
  description: "Muhammet Barut's personal website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='hidden md:block'>
          <ColorModeToggle />
        </div>
        <Nav />
        {children}
        <div className='w-full h-[50px] bg-gray-800 text-gray-500 flex items-center px-10 text-sm'>
          &copy; 2023 copyright all right reserved
        </div>
      </body>
    </html>
  );
}
