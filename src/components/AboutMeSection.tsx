import { getAge } from '@/utils/helpers';
import { Button } from '@mui/material';
import SectionTitle from './SectionTitle';

const aboutMeContent = {
  subtitle: 'A Full Stack Developer Based In IL, USA',
  introTitle: `Hey I'm Mo 👋`,
  paragraphs: [
    `My full name is Muhammet Barut, but friends call me Mo. I'm a tech enthusiast passionate about transforming ideas into reality.
    With a background in full stack development, I've dived into various projects, from crafting web applications and APIs to contributing
    to a dynamic community of young professionals.`,
    `In my journey, I've embraced agile software development and tackled challenges head-on. Outside the
    tech realm, you'll find me working on my DIY projects, or outdoors.`,
    `Excited to bring my skills and enthusiasm to your team,
    I'm all about making things happen and enjoying the ride! Let's connect and explore the
    possibilities. 🚀`,
  ],
  details: [
    { label: 'Age', value: getAge('1996-03-17') },
    { label: 'Residence', value: 'USA' },
    { label: 'Address', value: 'Centerville, IL' },
    { label: 'Email', value: 'vtme-996@hotmail.com' },
    { label: 'Freelance', value: 'Available' },
  ],
};

export default function AboutMeSection() {
  return (
    <section id='About' className='flex flex-col justify-center items-center py-10'>
      <div className='flex flex-col justify-center lg:grid lg:grid-cols-[40%_60%] gap-5 xl:min-w-[950px]'>
        <div className='pl-4 lg:p-0 col-span-2'>
          <SectionTitle title='About Me' />
          <h2 className='pt-2 text-center lg:text-left'>{aboutMeContent.subtitle}</h2>
        </div>

        <div className='flex justify-center lg:col-span-1 px-5 lg:p-0'>
          <div className='w-full max-w-[600px] h-[500px] bg-slate-300 rounded bg-[url(/p2.JPG)] bg-cover bg-center'></div>
        </div>

        <div className='flex flex-col justify-between lg:col-span-1 text-[15px] px-5'>
          <h2 className='pb-1'>{aboutMeContent.introTitle}</h2>
          <div className='max-w-[700px] flex flex-col gap-4'>
            {aboutMeContent.paragraphs.map((p, i) => (
              <p key={i + 'ps'}>{p}</p>
            ))}
          </div>

          <div className='pt-5 text-sm flex flex-col gap-2'>
            {aboutMeContent.details.map((item) => (
              <div key={item.label + 'aboutme'} className='w-[350px] flex gap-5'>
                <span className='font-bold border-r border-slate-300 w-1/2'>{item.label}</span>
                <span className='w-1/2'>{item.value}</span>
              </div>
            ))}
          </div>

          <Button variant='outlined' className='w-[180px] mt-1'>
            <a href='/Resume_.pdf' target='_blank' download>
              Download CV
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
