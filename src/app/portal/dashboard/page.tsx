'use client';

import { CoachingProgressPortal } from '@/components/portal/coachingProgressPortal';
import { HomeworkPortal } from '@/components/portal/homeworkPortal';
import { ProgressChart } from '@/components/progressChart';
import data from '@/dataJson/progressBarPortal.json';

const PortalDashboard = () => {
  return (
    <div className="mt-[20px] flex space-x-4">
      <div className="">
        <CoachingProgressPortal data={data} />
        <div className="mt-[10px]">
          <h2 className="mb-[10px] text-themetext font-bold text-[20px]">
            Progress
          </h2>
            <ProgressChart maxHeightWrap={377} maxHeightInner={367}/>
        </div>

        <div className='mt-[10px]'>
          <h2 className="mb-[10px] text-themetext font-bold text-[20px]">Homework</h2>
          <HomeworkPortal/>
        </div>
      </div>
    </div>
  );
};

export default PortalDashboard;
