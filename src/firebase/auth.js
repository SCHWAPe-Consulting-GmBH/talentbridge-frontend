import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';

export const logOut = async () => {
  await signOut(auth);
};
