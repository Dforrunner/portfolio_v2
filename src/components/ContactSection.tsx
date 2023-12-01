import SectionTitle from './SectionTitle';
import { Github, Mail, Linkedin, X } from 'lucide-react';
import Link from 'next/link';
import Card from './Card';

const socials = [
  {
    icon: <Mail size={20} />,
    href: 'mailto:vtme-996@hotmail.com',
    label: 'Email',
    handle: 'vtme-996@hotmail.com',
  },
  {
    icon: <Linkedin size={20} />,
    href: 'https://www.linkedin.com/in/muhammet-barut-b5632675/',
    label: 'LinkedIn',
    handle: 'Muhammet Barut',
  },
  {
    icon: <Github size={20} />,
    href: 'https://github.com/Dforrunner',
    label: 'Github',
    handle: 'dforrunner',
  },
  {
    icon: <X size={20} />,
    href: 'https://twitter.com/dforrunner',
    label: 'X',
    handle: '@dforrunner',
  },
];

export default function ContactSection() {
  return (
    <section id='Contact' className='flex flex-col items-center justify-center py-10 '>
      <SectionTitle title='Contact Me' />

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 content-center p-10'>
        {socials.map((s) => (
          <Card key={s.label + 'contact-card'}>
            <Link
              href={s.href}
              target='_blank'
              className='p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16'
            >
              <span
                className='absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent'
                aria-hidden='true'
              />
              <span className='relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange'>
                {s.icon}
              </span>{' '}
              <div className='z-10 flex flex-col items-center'>
                <span className='lg:text-xl font-medium duration-150 text-zinc-800 dark:text-zinc-200 group-hover:text-white font-display text-center'>
                  {s.handle}
                </span>
                <span className='mt-4 text-sm text-center duration-1000 text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-200'>
                  {s.label}
                </span>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
