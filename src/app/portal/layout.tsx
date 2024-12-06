'use client';

import { AsideMenu } from '@/components/portal/asideMenu';
import { HeaderPortal } from '@/components/portal/headerPortal';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
})
 {
  return (
    <main className="bg-background">
      <AsideMenu />
      <div className='pt-[30px] pb-[50px] ml-[250px] flex flex-col'>
        <HeaderPortal/>
        {children}
        </div>
    </main>
  );
}
