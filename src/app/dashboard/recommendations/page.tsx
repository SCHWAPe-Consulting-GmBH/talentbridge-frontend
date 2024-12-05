'use client';

import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import Image from 'next/image';
import fire from '@/assets/icons/top_recommendations.svg';
import courses from '@/dataJson/courses_recommendations.json';
import rec_img_1 from '@/assets/images/recommendations_image1.jpg';
import rec_img_2 from '@/assets/images/recommendations_image2.jpg';
import rec_img_3 from '@/assets/images/recommendations_image3.jpg';
import rec_img_4 from '@/assets/images/recommendations_image4.jpg';
import rec_img_5 from '@/assets/images/recommendations_image5.jpg';
import rec_img_6 from '@/assets/images/recommendations_image6.jpg';
import { useState } from 'react';
import { CourseDetailModal } from '@/components/dashboard/courseDetailModal';

const Recommendations = () => {
  const [isCourseDetailShown, setIsCourseDetailShown] = useState(false);
  const picturesForCourse = [
    rec_img_1,
    rec_img_2,
    rec_img_3,
    rec_img_4,
    rec_img_5,
    rec_img_6,
  ];

  return (
    <>
      <div className="mt-[56px] grid grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={uuidv4()}
            className="bg-background-second rounded-2xl p-6 relative green_border_hover border-box border border-transparent course_shadow"
          >
            <Image
              src={picturesForCourse[index]}
              alt="pictures for course"
              width={353}
              className="mb-4 w-full rounded-3xl"
            />
            <div
              className={cn(
                'rounded-full py-[6px] px-4 inline-flex items-center absolute top-[40px] right-[35px]',
                {
                  'border border-primary bg-light-green':
                    course.color === 'green',
                  'border border-warning bg-light-orange':
                    course.color === 'orange',
                  'border border-info bg-light-blue': course.color === 'blue',
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
              {course.description}
            </p>
            <button
              onClick={() => setIsCourseDetailShown(true)}
              className="border-[1px] border-themetext text-themetext w-full py-[11px] hover:border-transparent transition-all duration-300 ease-in-out rounded-lg font-semibold text-[16px] btn_white_hover"
            >
              More details
            </button>
          </div>
        ))}
      </div>

      {isCourseDetailShown && <CourseDetailModal isCourseDetailShown={isCourseDetailShown} onChangeCourseDetailShown={setIsCourseDetailShown}/>}
    </>
  );
};

export default Recommendations;
