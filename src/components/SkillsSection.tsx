import { skillImages } from '@/utils/skillImages';
import SkillsSlider from './SkillsSlider';
import Image from 'next/image';
import SectionTitle from './SectionTitle';

export default async function SkillsSection() {
  const skills = await skillImages();
  const { langs, frameworks, tools } = skills;

  return (
    <section id='Skills' className='py-10'>
      <SectionTitle title='My Skills' />

      <SkillsSlider className='hidden lg:flex' skills={skills} />

      <div className='flex flex-wrap justify-center lg:hidden'>
        {[...langs, ...frameworks, ...tools].map((image) => (
          <div
            key={image.path}
            className='flex justify-center items-center grayscale hover:grayscale-0 transition-all duration-200 ease-in-out'
          >
            <Image
              src={image.path}
              alt={`${image.name} logo`}
              width={100}
              height={100}
              className='p-2'
            />
          </div>
        ))}
      </div>
    </section>
  );
}
