'use client';

import cn from 'classnames';
import { Meetings } from '@/components/meetings';
import { CoachingProgressPortal } from '@/components/portal/coachingProgressPortal';
import { DocumentsPortal } from '@/components/portal/documetsPortal';
import { HomeworkPortal } from '@/components/portal/homeworkPortal';
import { ProgressChart } from '@/components/progressChart';
import data from '@/dataJson/progressBarPortal.json';
import Link from 'next/link';
import { HomeworkPortalCoach } from '@/components/portal/homeworkPortalCoach';

const PortalDashboard = () => {
  let user = 'coach';

  return (
    <div className={cn("mt-[20px]  max-w-[1200px] mx-auto", {
      'grid grid-cols-[minmax(0,_860px)_280px] gap-x-4': user === 'student',
      'flex flex-col space-y-4': user === 'coach'
    })}>
      {user === 'student' && (
        <>
          <div className="">
            <CoachingProgressPortal data={data} />
            <section className="mt-[16px]">
              <h2 className="mb-[10px] text-themetext font-bold text-[20px]">
                Progress
              </h2>
              <ProgressChart maxHeightWrap={377} maxHeightInner={367} />
            </section>

            <section className="mt-4 w-full">
              <div className="mb-[12px] flex justify-between">
                <h2 className=" text-themetext font-bold text-[20px]">
                  Homework
                </h2>
                <Link
                  href="/portal/homework"
                  className="text-primary btn_scale"
                >
                  See All
                </Link>
              </div>

              <HomeworkPortal />
            </section>
          </div>

          <div className="">
            <section>
              <div className="flex justify-between items-center mb-[10px]">
                <h2 className="text-themetext font-bold text-[20px]">
                  Meetings
                </h2>
                <Link
                  href="/portal/meetings"
                  className="text-primary btn_scale"
                >
                  See All
                </Link>
              </div>
              <Meetings isShortVersion={true} />
            </section>
            <DocumentsPortal />
          </div>
        </>
      )}

      {user === 'coach' && (
        <>
        <div className='flex'>
          <HomeworkPortalCoach/>
        </div>

        <div>

        </div>
        </>
      )}
    </div>
  );
};

export default PortalDashboard;
