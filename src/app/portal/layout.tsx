'use client';

import { AsideMenu } from "@/components/portal/asideMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-background flex"> 
      <AsideMenu/>
        {children}
    </main>
  );
}
