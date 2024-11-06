import people from '@/assets/images/Avatars5.png'
import Image from 'next/image';

const CourseMatching = () => {

  const courses = [
    {
      color: 'success',
      level: 'Beginner',
      title: 'Graphic Design',
      image: '',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      color: 'warning',
      level: 'Advanced',
      title: 'Architect',
      image: '',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      color: 'info',
      level: 'Expert',
      title: 'Programmer',
      image: '',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
]

  return (
    <main className="bg2 px-[100px]">
      <div className="max-w-[1239] mx-auto pt-[168px] flex flex-col items-center">
        <p className="text-primary border border-primary rounded-full font-bold text-[24px] px-4 py-2 mb-8">Welcome to us!</p>
        <h1 className="font-extrabold text-[48px] mb-4 leading-[65px] text-themetext">Let's lmprove your skills with us!</h1>
        <p className="font-medium text-[24px] text-neutral2 w-[737px] text-center px-[45px] mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
        </p>
        <div className='flex mb-[48px]'>
          <Image
            src={people}
            alt='people'
            width={120}
            className='mr-[8px]'
          />
          <p className='text-neutral2 text-[16px] font-medium'>Join over <span className='text-primary font-bold text-[20px]'>+10K</span> student</p>
        </div>
        <div>
          <p>dfghj</p>
        </div>
      </div>
      
    </main>
  )
};

export default CourseMatching;
