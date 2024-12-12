'use client';
import { ChartDashboard } from '@/components/dashboard/chartDashboard';
import { HeaderDashboard } from '@/components/dashboard/headerDashboard';
import { CoachingProgress } from '@/components/dashboard/coachingProgress';
import data from '@/dataJson/progressBarDashboard.json';
import { SupportForm } from '@/components/dashboard/supportForm';
import { useAuth } from '@/firebase/context/authContext';
import { Loader } from '@/components/loader';
import { useRouter } from 'next/navigation';
import { logOut } from '@/firebase/auth';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const routeToLogin = async () => {
    await router.push('/login');
  };
  const [isTimeout, setIsTimeout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      if (currentUser) {
        const customAttributes = currentUser.reloadUserInfo?.customAttributes;
        console.log(customAttributes);

        if (customAttributes) {
          const attributes = JSON.parse(customAttributes);
          if (attributes.role === 'moderator' || attributes.role === 'coach') {
            router.push('/portal');
            return;
          } else setIsLoading(false);
        }
      }
    };

    checkUserRole();
  }, [currentUser, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!currentUser) {
        setIsTimeout(true);
        routeToLogin();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentUser, router]);

  if (isLoading && !currentUser && !isTimeout) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader width={20} height={20} border={3} />
      </div>
    );
  }
  const { email, displayName } = currentUser;

  return (
    <main className="bg5 background-style bg-background h-full w-full pt-[10px] px-10 pb-[100px]">
      <div className="max-w-[1350px] mx-auto ">
        <HeaderDashboard />
        <div className="flex px-20 justify-between mt-[105px] relative z-10">
          <div>
            <h1 className="font-extrabold text-[60px] text-white">
              Welcome,
              <br /> {displayName ? displayName : email.split('@')[0]}
            </h1>
            <p className="font-bold text-white max-w-[465px]">
              Lorem ipsum dolor sit amet consectetur. Lectus gravida praesent
              pretium varius nulla arcu nunc elementum. Tincidunt quam dui in
              sagittis mattis tincidunt cum egestas.{' '}
            </p>
          </div>
          <ChartDashboard />
        </div>
        <CoachingProgress data={data} />
        {children}
        <SupportForm />
      </div>
    </main>
  );
}
