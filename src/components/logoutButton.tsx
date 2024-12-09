'use client';

import { auth } from '@/firebase/config';
import { useAuth } from '@/firebase/context/authContext';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
export const LogoutButton = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  if (!currentUser) router.push('/login');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return <button onClick={handleLogout}>Log out</button>;
};
