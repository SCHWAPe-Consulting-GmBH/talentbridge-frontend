'use client';

import { SupportForm } from "@/components/dashboard/supportForm";

const PortalSupport = () => {
  return <div className="mb-30px">
    <SupportForm isPortal={true}/>
  </div>;
};

export default PortalSupport;
