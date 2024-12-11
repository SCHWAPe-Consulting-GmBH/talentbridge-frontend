'use client';

import { updateUserPayment } from '@/firebase/auth';
import { useAuth } from '@/firebase/context/authContext';
import { useEffect, useRef, useState } from 'react';
import { servers } from '@/utils/servers';
import { createCallWithLink, getUserCalls } from '@/firebase/chat';
import { useRouter } from 'next/navigation';

const Portal = () => {


  return (
    <div className="mb-30px">
      <p>hello</p>
      
    </div>
  );
};

export default Portal;
