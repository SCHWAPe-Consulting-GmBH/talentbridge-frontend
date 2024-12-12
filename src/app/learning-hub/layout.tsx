'use client';

import { HeaderDashboard } from '@/components/dashboard/headerDashboard';
import { useAuth } from '@/firebase/context/authContext';
import { Loader } from '@/components/loader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function LearningHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const roleObj = currentUser?.reloadUserInfo.customAttributes;
  let role: Record<'role', string> | null = null;

  if (roleObj) {
    role = JSON.parse(roleObj);
  }

  const routeToLogin = async () => {
    await router.push('/login');
  };
  const [isTimeout, setIsTimeout] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (!currentUser) {
        setIsTimeout(true);
        routeToLogin();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentUser, router]);


  if (
    (!currentUser && !isTimeout)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader width={150} height={150} border={20} />
      </div>
    );
  }
  const { email, displayName } = currentUser;

  return (
    <main className="background-style bg-background bg-learning-hub h-full w-full pt-[10px] pb-[100px]">
      <div className="max-w-[1350px] mx-auto relative">
        <HeaderDashboard />
      </div>
      <div className="flex flex-col items-center w-full min-h-[412px] backdrop-blur-sm mt-[50px]">
        <h1 className="font-extrabold text-[60px] max-w-[1068px] leading-[104px] mb-8 text-white text-center mt-[85px]">
          Take the First Step Towards a Successful Future!
        </h1>

        <button className="bg-primary text-secondary btn_green_hover py-[11px] max-w-[170px] w-full">
          Start Now
        </button>
      </div>
      <div className="max-w-[1152px] mx-auto relative">
        {children}
      </div>
    </main>
  );
}
