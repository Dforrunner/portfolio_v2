import { cn } from '@/utils/cn';

export default function SectionTitle({ title, className }: { title: string; className?: string }) {
  return (
    <div className={cn('group relative h-[52px] flex justify-center cursor-default', className)}>
      <h1 className='text-4xl group/item'>{title}</h1>
      <div className='h-[2px] w-36 bg-zinc-200 absolute bottom-0 group-hover:bg-blue-600 group-hover:w-44 transition-all duration-300 ease-in-out' />
    </div>
  );
}
