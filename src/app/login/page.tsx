'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { firestore } from '@/firebase/config';
import imgGirl from '@/assets/images/imgGirl.png';
import apple from '@/assets/icons/apple.svg';
import facebook from '@/assets/icons/facebook.svg';
import google from '@/assets/icons/google.svg';
import { PasswordInput } from '@/components/passwordInput';
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
// import { accessTokenService } from '@/services/accessTokenService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mutationKeys } from '@/reaсtQuery/mutationKeys';
import { queryKeys } from '@/reaсtQuery/queryKeys';
import { addDoc, collection } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, , , emailError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, , , googleError] = useSignInWithGoogle(auth);
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutationSignIn = useMutation({
    mutationKey: [mutationKeys.login],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInWithEmailAndPassword(email, password),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getCurrentUserId] });
    },
  });
  const loginMutationGoogleSignIn = useMutation({
    mutationKey: [mutationKeys.login],
    mutationFn: () => signInWithGoogle(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getCurrentUserId] });
    },
  });

  const handleSignIn = async () => {
    try {
      await loginMutationSignIn.mutateAsync({ email, password });
      //temporary added code
      const docRef = await addDoc(collection(firestore, 'users'), {
        email: email,
        createdAt: new Date().toISOString(),
      });

      setEmail('');
      setPassword('');
      router.push('/onboarding');
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const resp = await loginMutationGoogleSignIn.mutateAsync();

      //temporary added code
      const docRef = await addDoc(collection(firestore, 'users'), {
        id: resp?.user.uid,
        email: resp?.user.email,
        createdAt: new Date().toISOString(),
      });

      sessionStorage.setItem('user', 'yes');
      router.push('/onboarding');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="bg-background-fourth">
      <div className="max-w-[1650px] flex mx-auto px-[105px] justify-start relative overflow-hidden h-screen">
        <div className="flex flex-col items-center max-w-[500px] mt-[200px]">
          <h1 className="font-extrabold text-[56px] leading-[76px] text-shadow-custom text-themetext">
            Welcome Back !
          </h1>
          <p className="text-[18px] text-center px-[50px] mb-[42px] text-themetext">
            Empowering You to Unlock the Full Potential of Learning and Coaching
          </p>

          <input
            placeholder="Email"
            className="input_text text-secondary mb-[32px] w-full bg-white border border-light-gray"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput password={password} onChangePassword={setPassword} />

          <p className="self-end text-themetext mb-[25px] cursor-pointer btn_scale">
            Forgot your password?
          </p>
          <button
            type="button"
            onClick={handleSignIn}
            className="bg-primary w-full py-[17px] font-semibold mb-[20px] rounded-lg btn_green_hover"
          >
            See All
          </button>

          <p className="ext-themetext mb-[14px] leading-[19px]">
            or continue with
          </p>

          <div className="flex space-x-[25px] mb-[138px]">
            <button onClick={handleGoogleSignIn} className="">
              <Image
                src={google}
                alt="login with google"
                width={60}
                height={60}
                className="bg-secondary rounded-full h-[60px] p-[13px] btn_shadow"
              />
            </button>

            <Image
              src={facebook}
              alt="login with facebook"
              width={60}
              height={60}
              className="bg-secondary rounded-full h-[60px] p-[13px] btn_shadow"
            />
            <Image
              src={apple}
              alt="login with apple"
              width={60}
              height={60}
              className="bg-secondary rounded-full h-[60px] p-[13px] btn_shadow"
            />
          </div>

          <div className="flex items-center">
            <p className="text-[18px] text-themetext mr-2">
              Don't have an account?
            </p>
            <Link href="/" className="text-primary font-bold btn_scale">
              Register now
            </Link>
          </div>
        </div>

        <div>
          <Image
            src={imgGirl}
            alt="Picture of the author"
            width={1024}
            className="absolute object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default Login;
