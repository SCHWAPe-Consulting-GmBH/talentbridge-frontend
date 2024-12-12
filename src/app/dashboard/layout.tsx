'use client';
import { ChartDashboard } from '@/components/dashboard/chartDashboard';
import { HeaderDashboard } from '@/components/dashboard/headerDashboard';
import { CoachingProgress } from '@/components/dashboard/coachingProgress';
import data from '@/dataJson/progressBarDashboard.json';
import { SupportForm } from '@/components/dashboard/supportForm';
import { useAuth } from '@/firebase/context/authContext';
import { Loader } from '@/components/loader';
import { useRouter } from 'next/navigation';
import { getUserPayment, logOut } from '@/firebase/auth';
import { useEffect, useState } from 'react';
import { isNull } from 'util';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();
  const [paymentData, setPaymentData] = useState(null);
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

  const getPayment = async () => {
    setPaymentData(await getUserPayment(currentUser.uid));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getPayment();
      if (!currentUser) {
        setIsTimeout(true);
        routeToLogin();
      }
    }, 3000);

    

    return () => clearTimeout(timer);
  }, [currentUser, router]);


  if (!currentUser && !isTimeout  && isLoading || (typeof paymentData != 'undefined' && !paymentData)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader width={150} height={150} border={20} />
      </div>
    );
  }
  const { email, displayName } = currentUser;

  return (
    <main
      className={`background-style bg-background h-full w-full pt-[10px] px-10 pb-[100px] ${(paymentData?.method === 'aid' && currentUser) ? 'bg-portal-aid' : 'bg5'}`}
    >
      <div className="max-w-[1350px] mx-auto relative">
        <HeaderDashboard />
        {(paymentData?.method != 'aid') && currentUser &&
          <>
            <div className="flex px-20 justify-between mt-[105px] relative z-10 min-h-[455px]">
              <div>
                <h1 className="font-extrabold text-[60px] text-white">
                  Welcome,
                  <br /> {displayName ? displayName : email.split('@')[0]}
                </h1>
                <p className="font-bold text-white max-w-[465px]">
                  Lorem ipsum dolor sit amet consectetur. Lectus gravida
                  praesent pretium varius nulla arcu nunc elementum. Tincidunt
                  quam dui in sagittis mattis tincidunt cum egestas.{' '}
                </p>
              </div>
              {role?.role === 'student' && <ChartDashboard />}
            </div>
            <CoachingProgress data={data} />
          </>
        }
        {children}
        <SupportForm />
      </div>
    </main>
  );
}
