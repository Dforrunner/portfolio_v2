import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

async function getImages(dirRelativeToPublicFolder: string) {
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  const filenames = await fs.readdir(dir);
  const images = filenames.map((name) => ({
    name: name.split('.')[0],
    path: path.join('/', dirRelativeToPublicFolder, name),
  }));
  return images;
}

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
export default async function SkillsSection() {
  const paths = ['logos/langs', 'logos/frameworks', 'logos/tools'];
  const [langs, frameworks, tools] = await Promise.all(paths.map(getImages));

  return (
    <section id='Skills' className='flex flex-col items-center justify-center py-10'>
     
      <SectionTitle title='My Skills' />
     
      <div className='w-full mt-5'>
        <ImageSlider images={langs} />
        <ImageSlider images={frameworks} />
        <ImageSlider images={tools} />
      </div>
    </section>
  );
}
