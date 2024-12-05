import { ChartDashboard } from '@/components/dashboard/chartDashboard';
import { HeaderDashboard } from '@/components/dashboard/headerDashboard';
import { CoachingProgress } from '@/components/dashboard/coachingProgress';
import data from '@/dataJson/progressBarDashboard.json';
import { SupportForm } from '@/components/dashboard/supportForm';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg5 background-style bg-background h-full w-full pt-[10px] px-10 pb-[100px]">
      <div className='max-w-[1350px] mx-auto '>
        <HeaderDashboard />
        <div className='flex px-20 justify-between mt-[105px] relative z-10'>
          <div>
            <h1 className="font-extrabold text-[60px] text-white">
              Welcome,
              <br /> Jeremy Pelster
            </h1>
            <p className="font-bold text-white max-w-[465px]">
              Lorem ipsum dolor sit amet consectetur. Lectus gravida praesent
              pretium varius nulla arcu nunc elementum. Tincidunt quam dui in
              sagittis mattis tincidunt cum egestas.{' '}
            </p>
          </div>
          <ChartDashboard />
        </div>
        <CoachingProgress data={data}/>
        {children}
        <SupportForm/>
      </div>
    </main>
  );
}
