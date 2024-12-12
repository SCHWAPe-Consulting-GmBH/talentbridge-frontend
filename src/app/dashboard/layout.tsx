'use client';
import { ChartDashboard } from '@/components/dashboard/chartDashboard';
import { HeaderDashboard } from '@/components/dashboard/headerDashboard';
import { CoachingProgress } from '@/components/dashboard/coachingProgress';
import data from '@/dataJson/progressBarDashboard.json';
import { SupportForm } from '@/components/dashboard/supportForm';
import { useAuth } from '@/firebase/context/authContext';
import { Loader } from '@/components/loader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentUrl = pathname.split('/')[0];
  const { currentUser, paymentData } = useAuth();
  const [userData, setUserData] = useState({
    email: '',
    name: '',
  });
  const router = useRouter();
  const roleObj = currentUser?.reloadUserInfo.customAttributes;
  let role: Record<'role', string> | null = null;
  const isNotHavePayment = currentUser && (paymentData === 'undefined' || (paymentData && paymentData.done));

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
        const { email, displayName } = currentUser;
        setUserData({
          email,
          name: displayName,
        });

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
    if (
      currentUser &&
      paymentData &&
      !paymentData.done &&
      currentUrl != 'financial-aid'
    ) {
      router.push('/dashboard/financial-aid');
    }
  }, [paymentData, currentUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!currentUser) {
        routeToLogin();
        setIsTimeout(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentUser, router]);

  if (!currentUser && !isTimeout && isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader width={150} height={150} border={20} />
      </div>
    );
  }

  if (currentUser && paymentData != 'undefined' && !paymentData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader width={150} height={150} border={20} />
      </div>
    );
  }

  return (
    <main
      className={`background-style bg-background h-full w-full pt-[10px] px-10 pb-[100px] ${paymentData?.method === 'aid' && currentUser ? 'bg-portal-aid' : 'bg5'}`}
    >
      <div className="max-w-[1350px] mx-auto relative">
        <HeaderDashboard />
        {isNotHavePayment && (
          <>
            <div className="flex px-20 justify-between mt-[105px] relative z-10 min-h-[455px]">
              <div>
                <h1 className="font-extrabold text-[60px] text-white">
                  Welcome,
                  <br />{' '}
                  {userData.name ? userData.name : userData.email.split('@')[0]}
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
        )}
        {children}
        <SupportForm />
      </div>
    </main>
  );
}
