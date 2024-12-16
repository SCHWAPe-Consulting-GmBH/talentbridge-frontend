'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mutationKeys } from '@/reaсtQuery/mutationKeys';
import { queryKeys } from '@/reaсtQuery/queryKeys';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '@/firebase/context/authContext';
import toast from 'react-hot-toast';
import { registerStudent } from '@/api/auth';

const Login = () => {
  const { currentUser, paymentData } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, , , emailError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, , , googleError] = useSignInWithGoogle(auth);
  const router = useRouter();
  const queryClient = useQueryClient();

  if (currentUser) {
    try {
      const customAttributes = currentUser.reloadUserInfo?.customAttributes;

      if (customAttributes) {
        const attributes = JSON.parse(customAttributes);

        if (attributes.role === 'moderator' || attributes.role === 'coach') {
          router.push('/portal');
        } else if (
          attributes.role === 'student' &&
          (typeof paymentData === 'undefined' || paymentData.done)
        ) {
          router.push('/dashboard');
        } else if (
          attributes.role === 'student' &&
          paymentData &&
          !paymentData.done
        ) {
          router.push('/dashboard/financial-aid');
        } else {
          router.push('/onboarding');
        }
      } else {
        router.push('/onboarding');
      }
    } catch (error) {
      // console.error('Error parsing customAttributes:', error);
      router.push('/onboarding');
    }
  }

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

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const resp = await loginMutationSignIn.mutateAsync({ email, password });

      if (resp) {
        setEmail('');
        setPassword('');
        toast.success('Login successfully.');
      } else {
        toast.error('Incorrect login or password.Try again.');
      }
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const customAttributes = user.reloadUserInfo?.customAttributes;

            if (customAttributes) {
              const attributes = JSON.parse(customAttributes);

              if (
                attributes.role === 'moderator' ||
                attributes.role === 'coach'
              ) {
                router.push('/portal');
              } else if (attributes.role === 'student') {
                router.push('/dashboard');
              } else {
                router.push('/onboarding');
              }
            } else {
              router.push('/onboarding');
            }
          } catch (error) {
            console.error('Error parsing customAttributes:', error);
            router.push('/onboarding');
          }
        } else {
          router.push('/login');
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  // console.log(currentUser.reloadUserInfo.customAttributes);
  const handleGoogleSignIn = async () => {
    try {
      const resp = await loginMutationGoogleSignIn.mutateAsync();
      if (resp) {
        toast.success('Login successfully.');
      }

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const customAttributes = user.reloadUserInfo?.customAttributes;

            if (customAttributes) {
              const attributes = JSON.parse(customAttributes);
              console.log('Custom attributes:', attributes);
              if (
                attributes.role === 'coach' ||
                attributes.role === 'moderator'
              ) {
                router.push('/portal');
              } else if (attributes.role === 'student') {
                router.push('/dashboard');
              } else {
                router.push('/onboarding');
              }
            } else {
              router.push('/onboarding');
            }
          } catch (error) {
            console.error('Error parsing customAttributes:', error);
            router.push('/onboarding');
          }
        } else {
          router.push('/login');
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handleRegister = async () => {
    const loginObj = {
      username: email,
      email: email,
      password: password,
    };
    try {
      const data = await registerStudent(loginObj);

      if (data) {
        try {
          const resp = await loginMutationSignIn.mutateAsync({
            email,
            password,
          });

          if (resp) {
            setEmail('');
            setPassword('');
            toast.success('Register successfully.');
          }
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              try {
                const customAttributes = user.reloadUserInfo?.customAttributes;

                if (customAttributes) {
                  const attributes = JSON.parse(customAttributes);

                  if (
                    attributes.role === 'moderator' ||
                    attributes.role === 'coach'
                  ) {
                    router.push('/portal');
                  } else if (attributes.role === 'student') {
                    router.push('/dashboard');
                  } else {
                    router.push('/onboarding');
                  }
                } else {
                  router.push('/onboarding');
                }
              } catch (error) {
                console.error('Error parsing customAttributes:', error);
                router.push('/onboarding');
              }
            } else {
              router.push('/login');
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.error('Registration or login failed:', error);
    }
  };

  return (
    <main className="bg-background-fourth bg-login">
      <div className="max-w-[1650px] flex mx-auto px-[105px] justify-start relative overflow-auto h-screen">
        <div className="flex flex-col items-center max-w-[500px] mt-[150px]">
          <h1 className="font-extrabold text-[56px] leading-[76px] text-shadow-custom text-themetext">
            Welcome Back !
          </h1>
          <p className="text-[18px] text-center px-[50px] mb-[42px] text-themetext">
            Empowering You to Unlock the Full Potential of Learning and Coaching
          </p>
          <form
            onSubmit={(e) => handleSignIn(e)}
            className="w-full flex flex-col"
          >
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
              type="submit"
              className="bg-primary w-full py-[17px] font-semibold mb-[20px] rounded-lg btn_green_hover"
            >
              See All
            </button>
          </form>

          <p className="ext-themetext mb-[14px] leading-[19px]">
            or continue with
          </p>

          <div className="flex space-x-[25px] mb-[80px]">
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
            <button
              onClick={handleRegister}
              className="text-primary font-bold btn_scale"
            >
              Register now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
