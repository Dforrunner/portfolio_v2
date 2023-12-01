import Card from './Card';
import { Link } from 'lucide-react';
import SectionTitle from './SectionTitle';

const projects = [
  {
    name: 'Portfolio',
    href: '',
    description: 'This is my portfolio website.',
  },
];

export default function PortfolioSection() {
  return (
    <section id='Portfolio' className='flex flex-col items-center justify-center py-10'>
      <SectionTitle title='Portfolio' />

      <div className='grid grid-cols-4 gap-8 content-center p-10'>
        {projects.map((p) => (
          <Card key={p.name + 'project-card'}>
            <Link
              href={p.href}
              target='_blank'
              className='p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16'
            >
              <div className='z-10 flex flex-col items-center'>
                <span className='mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200'>
                  {p.description}
                </span>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
