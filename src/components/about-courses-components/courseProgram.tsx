import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import plus from '@/assets/icons/plus.svg';
import { Fragment, useState } from 'react';
import { useTheme } from 'next-themes';
import cn from 'classnames';

const programData = [
  {
    title: '1.Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, corrupti modi. Fugiat veniam aut perspiciatis, nostrum optio quas aspernatur nesciunt harum nihil totam ullam non aliquam ducimus architecto mollitia eveniet?',
  },
  {
    title: '2.Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, corrupti modi. Fugiat veniam aut perspiciatis, nostrum optio quas aspernatur nesciunt harum nihil totam ullam non aliquam ducimus architecto mollitia eveniet?',
  },
  {
    title: '3.Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, corrupti modi. Fugiat veniam aut perspiciatis, nostrum optio quas aspernatur nesciunt harum nihil totam ullam non aliquam ducimus architecto mollitia eveniet?',
  },
  {
    title: '4.Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, corrupti modi. Fugiat veniam aut perspiciatis, nostrum optio quas aspernatur nesciunt harum nihil totam ullam non aliquam ducimus architecto mollitia eveniet?',
  },
  {
    title: '5.Lorem ipsum dolor sit amet',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, corrupti modi. Fugiat veniam aut perspiciatis, nostrum optio quas aspernatur nesciunt harum nihil totam ullam non aliquam ducimus architecto mollitia eveniet?',
  },
];

export const CourseProgram = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { resolvedTheme } = useTheme()

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  console.log(resolvedTheme)

  return (
    <section className='mb-[100px]'>
      <h2 className="font-extrabold text-primary text-[64px] leading-[87px] mb-8">
        course program, <br />
        <span className="text-themetext">
          from the basics to the first projects
        </span>
      </h2>

      {programData.map((part, index) => (
        <Fragment key={uuidv4()}>
          <div
            className="relative after:block after:h-[2px] flex justify-between items-center after:bg-primary after:absolute after:top-0 after:w-full"
          >
            <h3 className="font-medium text-themetext text-[32px] pt-[14px] mb-6">
              {part.title}
            </h3>
            <button
              onClick={() => handleToggle(index)}
              className="bg-background-revert rounded-full w-[38px] h-[38px] flex justify-center items-center btn_shadow"
            >
              <Image src={plus} alt="plus" width={14} className={cn( {'graphic_gray_answer': resolvedTheme === 'dark'})}/>
            </button>
          </div>
          <div
            key={uuidv4()}
            className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[500px] py-4' : 'max-h-0'}`}
          >
            <p className='text-themetext text-[24px]'>{part.text}</p>{' '}
          </div>
        </Fragment>
      ))}
    </section>
  );
};
