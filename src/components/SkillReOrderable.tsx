'use client';

import { Reorder } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

interface Props {
  skillList: { name: string; path: string }[];
  className?: string;
}
export default function SkillReOrderable({ skillList, className }: Props) {
  const [skills, setSkills] = useState(skillList);

  return (
    <Reorder.Group axis='y' values={skills} onReorder={setSkills} className={cn('', className)}>
      {skills.map((img) => (
        <Reorder.Item key={img.name} value={img}>
          <Image src={img.path} alt={`${img.name} logo`} width={100} height={100} className='p-2' />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
