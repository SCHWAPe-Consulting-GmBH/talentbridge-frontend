import { useEffect, useState } from 'react';
import { getCourseForCoach } from '@/api/coachOperations';
import { v4 as uuidv4 } from 'uuid';
import avatars from '@/assets/images/Avatars5.png';
import Image from 'next/image';
import { useAuth } from '@/firebase/context/authContext';
import { newCourse } from '@/types/newCourse';
import toast from 'react-hot-toast';
import { createCourseForMod, getCourseForMod } from '@/api/modOperations';
import plus from '@/assets/icons/plus.svg';
import edit from '@/assets/icons/edit.svg';
import addPeople from '@/assets/icons/addPeople.svg';
import deleteCourse from '@/assets/icons/deleteCourse.svg';

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
    toast.success('Successfully created course');
  };

  return (
    <section className="max-w-[569px] w-[100%] mt-[15px]">
      <div className="flex justify-between mb-[10px]">
        <h2 className=" text-themetext font-bold text-[20px]">Courses</h2>
        <button className="flex gap-1 items-center text-primary">
          <Image src={plus} alt="add homework" width={11} />
          <p>Add Courses</p>
        </button>
      </div>
      <div className="max-h-[324px] h-[100%] overflow-y-auto custom-scrollbar">
        <ul className="grid grid-cols-2 gap-[15px]">
          {[1, 2, 3, 4, 5, 6].map((course) => {
            return (
              <li
                key={uuidv4()}
                className="p-[15px] max-w-[261px] h-[97px] bg-background-second rounded-[20px]"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-themetext text-[16px] leading-[20px] font-bold mb-[2px] truncate">
                    Name of course
                  </p>
                  <p className="font-bold text-[12px] leading-[20px] text-dark-gray mb-[2px] truncate">
                    Lorem ipsum dolor sit amet consectetur. Ut tincidunt nunc
                    vestibulum diam senectus
                  </p>
                  <div className="flex gap-2">
                    <Image
                      src={edit}
                      alt="add homework"
                      width={24}
                      className="cursor-pointer"
                    />
                    <Image
                      src={addPeople}
                      alt="add homework"
                      width={24}
                      className="cursor-pointer"
                    />
                    <Image
                      src={deleteCourse}
                      alt="add homework"
                      width={24}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
