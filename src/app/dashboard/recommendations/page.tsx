'use client';

import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import fire from '@/assets/icons/top_recommendations.svg';
import courses from '@/dataJson/courses_recomendations.json';

const Recommendations = () => {
  const router = useRouter();

  return (
    <div className="mt-[56px] grid grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={uuidv4()} className="bg-background-second rounded-2xl p-6">
          <div
            className={cn(
              'rounded-full py-2 px-4 inline-flex items-center mb-4',
              {
                'border border-primary bg-opacity-primary':
                  course.color === 'green',
                'border border-warning bg-opacity-warning':
                  course.color === 'orange',
                'border border-info bg-opacity-info': course.color === 'blue',
              }
            )}
          >
            {course.color === 'green' && (
              <Image src={fire} alt="" width={12} className="mr-[10px]" />
            )}
            <p
              className={cn('font-medium text-[12px]', {
                'text-primary': course.color === 'green',
                'text-warning': course.color === 'orange',
                'text-info': course.color === 'blue',
              })}
            >
              {course.status}
            </p>
          </div>
          <p className="font-extrabold text-themetext text-[24px] mb-1">
            {course.title}
          </p>
          <p className="font-medium text-[16px] text-neutral2 mb-6">
            Get ready for your AVGS application with our expert-led course
          </p>
          <button
            onClick={() => router.push(`/dashboard/about-courses/${course.id}`)}
            className='border-[1px] border-themetext text-themetext w-full py-[11px] rounded-lg font-semibold text-[16px] btn_hover'
          >
            More details
          </button>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
