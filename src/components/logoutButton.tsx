'use client';

import { useRouter } from 'next/navigation';
import { logOut } from '@/firebase/auth';
export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return <button onClick={handleLogout}>Log out</button>;
};
