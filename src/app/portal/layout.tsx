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

        if (customAttributes) {
          const attributes = JSON.parse(customAttributes);
          if (attributes.role !== 'admin' && attributes.role !== 'coach') {
            router.push('/dashboard');
            return;
          } else setIsLoading(false);
        }
      }
    };

    checkUserRole();
  }, [currentUser, router]);
  if (isLoading) {
    return <Loader width={50} height={50} border={5} />;
  }
  return (
    <main className="bg-background">
      <AsideMenu />
      <div className="pt-[30px] pb-[50px] ml-[250px] flex flex-col">
        <HeaderPortal />
        {children}
      </div>
    </main>
  );
}
