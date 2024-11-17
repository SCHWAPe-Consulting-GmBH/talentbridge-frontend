'use client';

import { useState } from 'react';
import Image from 'next/image';
import imgGirl from '@/assets/images/img.png';
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
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, , , emailError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, , , googleError] = useSignInWithGoogle(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', 'yes');
      setEmail('');
      setPassword('');
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      console.log({ res });
      sessionStorage.setItem('user', 'yes');
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className=" bg-background-fourth">
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

          <p className="self-end text-themetext mb-[25px]">
            Forgot your password?
          </p>
          <button
            type="button"
            onClick={handleSignIn}
            className="bg-primary w-full h-[56px] font-semibold mb-[20px] rounded-lg btn_green_hover"
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

          <div className='flex items-center'>
            <p className="text-[18px] text-themetext mr-2">
              Don't have an account?
            </p>
            <Link href="/" className="text-primary font-bold">Register now</Link>
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
