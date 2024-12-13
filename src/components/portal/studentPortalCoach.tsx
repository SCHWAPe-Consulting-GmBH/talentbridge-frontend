'use client'

import { useEffect, useState } from 'react';
import { getStudentProgress, getStudentsForCoach } from '@/api/coachOperations';
import Image from 'next/image';
import avatar from '@/assets/images/calling-coach.jpg';
import { v4 as uuidv4 } from 'uuid';
import progress from '@/assets/icons/progress.svg';
import document from '@/assets/icons/document.svg';
import { Pagination } from './Pagination';
import { useAuth } from '@/firebase/context/authContext';
import { getStudentsForMod } from '@/api/modOperations';

export const StudentPortalCoach = () => {
  const { attributes } = useAuth();
  const [student, setStudents] = useState([]);
  // const [studentsProgress, setStudentsProgress] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const studentInformation = [
    'Student Information',
    'Current Stage',
    'Tasks',
    'Documents',
    'Progress Coachings',
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (attributes.role === 'moderator') {
          const studentData = await getStudentsForMod();
          setStudents(studentData);
        } else {
          const studentData = await getStudentsForCoach();
          setStudents(studentData);
        }
        // const studentProgress = await getStudentProgress();
        // setStudentsProgress(studentProgress);
      } catch (error) {
        console.error('Failed to fetch homework data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('students', student);
  // console.log('studentsProgress', studentsProgress);

  const students = [
    1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  ];
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's students
  const currentStudents = students.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(students.length / itemsPerPage);

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
          {currentStudents.map((student) => {
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
                  <Image src={document} alt="progress" width={18} height={18} />
                </button>
              </li>
            );
          })}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};
