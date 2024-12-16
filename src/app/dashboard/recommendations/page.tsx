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
import rec_img_7 from '@/assets/images/recommendations_image7.png';
import rec_img_8 from '@/assets/images/recommendations_image8.png';
import rec_img_9 from '@/assets/images/recommendations_image9.png';
import { useState } from 'react';
import { CourseDetailModal } from '@/components/dashboard/courseDetailModal';
import { useAuth } from '@/firebase/context/authContext';

const Recommendations = () => {
  const [isCourseDetailShown, setIsCourseDetailShown] = useState(false);
  const { setSelectedCourse, selectedCourse } = useAuth();

  const picturesForCourse = [
    rec_img_1,
    rec_img_2,
    rec_img_3,
    rec_img_4,
    rec_img_5,
    rec_img_6,
    rec_img_7,
    rec_img_8,
    rec_img_9,
  ];

  const handleSelectCourse = (data: ICourse) => {
    setSelectedCourse(data);
    setIsCourseDetailShown(true);
  };

  const random = [
    'Few Seats Left',
    'Few Seats Left',
    'Top Recommendation',
    'Sponsored',
  ];

  return (
    <>
      <div className="mt-[56px] grid grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={uuidv4()}
            className="bg-background-second flex flex-col rounded-2xl p-6 relative green_border_hover border-box border border-transparent course_shadow"
          >
            <Image
              src={picturesForCourse[index]}
              alt="pictures for course"
              width={353}
              className="mb-4 w-full rounded-3xl h-auto"
            />
            <div
              className={cn(
                'rounded-full py-[6px] px-4 inline-flex items-center absolute top-[40px] right-[35px]',
                {
                  'border border-primary bg-light-green':
                    random[index] && random[index] === 'Top Recommendation',
                  'border border-warning bg-light-orange':
                    random[index] && random[index] === 'Sponsored',
                  'border border-info bg-light-blue':
                    random[index] && random[index] === 'Few Seats Left',
                }
              )}
            >
              {random[index] && random[index] === 'Top Recommendation' && (
                <Image src={fire} alt="" width={12} className="mr-[10px] h-auto" />
              )}
              <p
                className={cn('font-medium text-[12px]', {
                  'text-primary':
                    random[index] && random[index] === 'Top Recommendation',
                  'text-warning':
                    random[index] && random[index] === 'Sponsored',
                  'text-info':
                    random[index] && random[index] === 'Few Seats Left',
                })}
              >
                {random[index]}
              </p>
            </div>
            <p className="font-extrabold text-themetext text-[24px] mb-1">
              {course.name}
            </p>
            <p className="font-medium text-[16px] text-neutral2 mb-6">
              {course.description}
            </p>
            <button
              onClick={() => handleSelectCourse(course)}
              className="border-[1px] mt-auto border-themetext text-themetext w-full py-[11px] hover:border-transparent transition-all duration-300 ease-in-out rounded-lg font-semibold text-[16px] btn_white_hover"
            >
              More details
            </button>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <CourseDetailModal
          isCourseDetailShown={isCourseDetailShown}
          onChangeCourseDetailShown={setIsCourseDetailShown}
          course={selectedCourse}
          onChangeSelectedCourse={setSelectedCourse}
        />
      )}
    </>
  );
};

export default Recommendations;
