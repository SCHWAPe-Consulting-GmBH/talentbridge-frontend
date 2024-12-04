'use client'

import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';

export const LogoutButton = () => {
  return (
    <button
    onClick={() => {signOut(auth)}}
  >
    Log out
  </button>
  )
}