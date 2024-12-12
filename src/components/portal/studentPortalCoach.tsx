import { useEffect, useState } from 'react';
import { getStudentsForCoach } from '@/api/coachOperations';
import Image from 'next/image';
import avatar from '@/assets/images/calling-coach.jpg';
import { v4 as uuidv4 } from 'uuid';
import progress from '@/assets/icons/progress.svg';
import document from '@/assets/icons/document.svg';

export const StudentPortalCoach = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await getStudentsForCoach();
        setStudents(studentData);
      } catch (error) {
        console.error('Failed to fetch homework data:', error);
      }
    };

    fetchData();
  }, []);

  const studentInformation = [
    'Student Information',
    'Current Stage',
    'Tasks',
    'Documents',
    'Progress Coachings',
  ];
  console.log('students', students);
  return (
    <section>
      <h2 className=" text-themetext font-bold text-[20px]">Students</h2>
      <div className="grid grid-cols-5 text-center items-center font-semibold text-sm bg-background-second rounded-[20px] h-[43px] pl-[15px] pr-[88px] mb-1">
        {studentInformation.map((student) => {
          return <p>{student}</p>;
        })}
      </div>
      <div>
        <ul className="flex flex-col gap-[4px]">
          {[1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((student) => {
            return (
              <li
                key={uuidv4()}
                className="flex  items-center gap-[37px] bg-background-second rounded-[20px] pr-[15px]"
              >
                <div className="grid grid-cols-5 place-items-center  h-[61px] pl-[15px]">
                  <div className="flex gap-[10px]">
                    <Image
                      src={avatar}
                      alt="people"
                      width={34}
                      height={34}
                      className="rounded-full object-cover"
                    />

                    <div>
                      <p className="font-semibold text-sm">Jordan Seler</p>
                      <p className="font-normal text-xs">
                        Lorem ipsum dolor sit amet{' '}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={progress} alt="progress" />
                    <span className="text-gray-600 text-sm font-normal">
                      100%
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <p>Complete (3)</p>
                    <p>Incomplete (5)</p>
                  </div>
                  <p>Documents (5)</p>
                  <div className="flex gap-3">
                    <p>Done (3)</p>
                    <p>Pending (5)</p>
                  </div>
                </div>
                <button className="flex justify-center items-center w-[30px] h-[30px] rounded-full object-cover bg-[#f1f1f1]">
                  <Image
                    src={document}
                    alt="progress"
                    width={18}
                    height={18}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
