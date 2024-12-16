import { useEffect, useState } from 'react';
import { getCourseForCoach } from '@/api/coachOperations';
import { v4 as uuidv4 } from 'uuid';
import avatars from '@/assets/images/Avatars5.png';
import Image from 'next/image';
import { useAuth } from '@/firebase/context/authContext';
import { newCourse } from '@/types/newCourse';
import toast from 'react-hot-toast';
import { createCourseForMod, getCourseForMod } from '@/api/modOperations';

export const CoursePortalMod = () => {
  const [courses, setCourses] = useState([]);
  const { attributes } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (attributes.role === 'moderator') {
          const coursesData = await getCourseForMod();
          setCourses(coursesData);
        } else {
          const coursesData = await getCourseForCoach();
          setCourses(coursesData);
        }
      } catch (error) {
        console.error('Failed to fetch homework data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('courses', courses);

  const handleCreateCourse = async (courseData: newCourse) => {
    try {
      await createCourseForMod(courseData);
      toast.success('Successfully created course');
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };

  return (
    <section className="max-w-[280px] w-[100%]">
      <h2 className="mb-[10px] text-themetext font-bold text-[20px]">
        Courses
      </h2>
      <div className="max-h-[307px] h-[100%] overflow-y-auto custom-scrollbar">
        <ul className="flex flex-col gap-[8px] pr-[6px]">
          {[1, 2, 3, 4, 5].map((course) => {
            return (
              <li
                key={uuidv4()}
                className="p-[15px] max-w-[261px] h-[97px] bg-background-second rounded-[20px]"
              >
                <div>
                  <p className="text-themetext text-[16px] leading-[20px] font-bold mb-[2px] truncate">
                    Job Jumper
                  </p>
                  <p className="font-bold text-[12px] leading-[20px] text-dark-gray mb-[2px] truncate">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                  <Image src={avatars} alt="people" width={78} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
