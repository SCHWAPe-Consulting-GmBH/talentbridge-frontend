import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import img1 from '@/assets/images/develop_skills_first_img.jpg';
import img2 from '@/assets/images/develop_skills_second_img.jpg';
import img3 from '@/assets/images/develop_skills_third_img.png';
import img4 from '@/assets/images/develop_skills_fourth_img.jpg';
import img5 from '@/assets/images/develop_skills_fifth_img.png';
import img6 from '@/assets/images/develop_skills_sixth_img.jpg';
import skills from '@/dataJson/developScillsCategory.json';
import premium_icon from '@/assets/icons/premium_content.svg';

export const DevelopSkillsHub = () => {
  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <div className="mt-[150px] flex flex-col items-center">
      <h2 className="font-bold text-[48px] mb-6">Develop your skills</h2>
      <p className="text-[16px] mb-[80px]">
        Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Morbi
        mattis ullamcorper velit.
      </p>

      <div className="grid grid-cols-3 w-full gap-6">
        {skills.map((skill, index) => (
          <div key={uuidv4()} className={`relative rounded-lg ${!skill.isPremium && 'btn_shadow cursor-pointer'}`}>
            <Image
              src={images[index]}
              alt="skill image"
              className="rounded-lg bg-gradient-to-b to-dark-gray from-transparent object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-secondary to-transparent rounded-lg opacity-60 z-[1] pointer-events-none"/>
            <p className='text-white absolute bottom-5 left-[50%] translate-x-[-50%] w-[315px] text-center text-[24px] font-extrabold leading-[33px] z-[2]'>{skill.title}</p>
          
            {skill.isPremium && (
              <div className='absolute w-full h-full top-0 left-0 bg-opacity-55 flex flex-col items-center justify-center'>
                <Image
                  src={premium_icon}
                  alt='premium content'
                  width={36}
                  className='mb-2 z-[2]'
                />
                <div className="absolute w-full h-full bg-gradient-to-b to-primary from-secondary rounded-lg opacity-60 z-[1]"/>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
