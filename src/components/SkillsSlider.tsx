import Image from 'next/image';
import { cn } from '@/utils/cn';

function ImageCard({ image }: { image: { name: string; path: string } }) {
  return (
    <div className='inline-block px-5'>
      <div className='min-w-[200px] max-w-[200px] group relative flex justify-center items-center grayscale hover:grayscale-0 transition-all duration-500 ease-in-out'>
        <Image priority src={image.path} height={150} width={150} alt={`${image.name} logo`} />
        <div className='h-full w-full justify-center items-end absolute z-10 bg-red bottom-0 hidden group-hover:flex'>
          <label className='rounded px-2 bg-gray-900 '>{image.name}</label>
        </div>
      </div>
    </div>
  );
}
function ImageSlider({ images }: { images: { name: string; path: string }[] }) {
  return (
    <div className='slider slider-light dark:slider-dark'>
      <div className='slide'>
        {images.map((image) => (
          <ImageCard key={image.path} image={image} />
        ))}
      </div>
      <div className='slide'>
        {images.map((image) => (
          <ImageCard key={image.path + '2'} image={image} />
        ))}
      </div>
    </div>
  );
}

interface Props {
  className?: string;
  skills: {
    langs: { name: string; path: string }[];
    frameworks: { name: string; path: string }[];
    tools: { name: string; path: string }[];
  };
}
export default function SkillsSlider({ className, skills }: Props) {
  const { langs, frameworks, tools } = skills;
  return (
    <div className={cn('flex flex-col items-center justify-center py-10', className)}>
      <div className='w-full mt-5'>
        <ImageSlider images={[...langs, ...langs]} />
        <ImageSlider images={frameworks} />
        <ImageSlider images={tools} />
      </div>
    </div>
  );
}
