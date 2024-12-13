'use client';

import { Loader } from '@/components/loader';
import { AsideMenu } from '@/components/portal/asideMenu';
import { HeaderPortal } from '@/components/portal/headerPortal';

import { useAuth } from '@/firebase/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkUserRole = async () => {
      if (currentUser) {
        const customAttributes = currentUser.reloadUserInfo?.customAttributes;
        // console.log(customAttributes);

        if (customAttributes) {
          const attributes = JSON.parse(customAttributes);
          if (attributes.role !== 'moderator' && attributes.role !== 'coach') {
            router.push('/dashboard');
            return;
          } else setIsLoading(false);
        }
        if (!customAttributes) {
          router.push('/dashboard');
          return;
        }
      }
    };

    checkUserRole();
  }, [currentUser, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader width={150} height={150} border={20} />
      </div>
    );
  }
  return (
    <main className="bg-background h-screen overflow-auto">
      <AsideMenu />
      <div className="pt-[30px] pb-[50px] ml-[264px] h-full flex flex-col">
        <HeaderPortal />
        {children}
      </div>
    </main>
  );
}
