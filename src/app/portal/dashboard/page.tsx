'use client';

import { Meetings } from '@/components/meetings';
import { CoachingProgressPortal } from '@/components/portal/coachingProgressPortal';
import { DocumentsPortal } from '@/components/portal/documetsPortal';
import { HomeworkPortal } from '@/components/portal/homeworkPortal';
import { ProgressChart } from '@/components/progressChart';
import data from '@/dataJson/progressBarPortal.json';
import Link from 'next/link';

const PortalDashboard = () => {
  return (
    <div className="mt-[20px] grid grid-cols-[minmax(0,_860px)_280px] gap-x-4 max-w-[1200px] mx-auto">
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
            <h2 className=" text-themetext font-bold text-[20px]">Homework</h2>
            <Link href="/portal/homework" className="text-primary btn_scale">
              See All
            </Link>
          </div>

          <HomeworkPortal />
        </section>
      </div>

      <div className=''>
        <section>
          <div className="flex justify-between items-center mb-[10px]">
            <h2 className="text-themetext font-bold text-[20px]">Meetings</h2>
            <Link href="/portal/meetings" className="text-primary btn_scale">
              See All
            </Link>
          </div>
          <Meetings isShortVersion={true} />
        </section>
        <DocumentsPortal />
      </div>
    </div>
  );
};

export default PortalDashboard;
