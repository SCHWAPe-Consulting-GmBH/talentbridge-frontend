'use client';

import { HomeworkDashboard } from "@/components/dashboard/homework";
import { Meetings } from "@/components/dashboard/meetings";
import { ProgressChart } from "@/components/dashboard/progressChart";

const Dashboard = () => {
  return (
    <div className="mt-[30px]">
      <div className="flex space-x-[30px]">
        <ProgressChart/>
        <Meetings />
      </div>
      <HomeworkDashboard/>
    </div>
  );
};

export default Dashboard;
