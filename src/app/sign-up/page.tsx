'use client';
import { useEffect, useState } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, , , googleError] = useSignInWithGoogle(auth);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      sessionStorage.setItem('user', 'yes');
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const res = await signInWithGoogle();
      sessionStorage.setItem('user', 'yes');
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  // useEffect(() => {
  //   const userSession = sessionStorage.getItem('user');
  // }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500 mb-2"
        >
          Sign Up with Email
        </button>
        <button
          onClick={handleGoogleSignUp}
          className="w-full p-3 bg-red-600 rounded text-white hover:bg-red-500"
        >
          Sign Up with Google
        </button>
        {googleError && (
          <p className="text-red-500 text-xs mt-2">{googleError.message}</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
