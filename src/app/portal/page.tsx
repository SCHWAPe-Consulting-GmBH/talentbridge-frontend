'use client';

import cn from 'classnames';
import { HomeworkPortalCoach } from '@/components/portal/homeworkPortalCoach';
import { StudentPortalCoach } from '@/components/portal/studentPortalCoach';
import { CoursePortalCoach } from '@/components/portal/coursePortalCoach';
import { MeetingPortalCoach } from '@/components/portal/meetingPortalCoach';
import { CoachPortalMod } from '@/components/portal/coachPortalMod';
import { useAuth } from '@/firebase/context/authContext';
import GeneralDataPortalMod from '@/components/portal/generalDataPortalMod';

const Portal = () => {
  const { attributes } = useAuth();

  return (
    <div
      className={cn(
        'mt-[20px] max-w-[1200px] pr-[24px] mx-auto ',
        'flex flex-col space-y-4'
      )}
    >
      <div className="flex justify-between  w-full ">
        {attributes.role === 'moderator' ? (
          <CoachPortalMod />
        ) : (
          <HomeworkPortalCoach />
        )}
        <CoursePortalCoach />
        {attributes.role === 'coach' && <MeetingPortalCoach />}
      </div>

      <div className="flex gap-[16px]">
        <StudentPortalCoach />
        {attributes.role === 'moderator' && <GeneralDataPortalMod />}
      </div>
    </div>
  );
};

export default Portal;
