'use client';

import Image from 'next/image';
import imgGirl from '../../assets/images/img.png';
import apple from '../../assets/icons/apple.svg';
import facebook from '../../assets/icons/facebook.svg';
import google from '../../assets/icons/google.svg';
import { PasswordInput } from '@/components/passwordInput';

const Login = () => {
  
  return (
    <div className="flex max-w-[1440px] mx-auto justify-center">
      <div className="flex flex-col items-center max-w-[500px] mt-[220px]">
        <h1 className="font-extrabold text-[56px] leading-[76px] text-shadow-custom text-themetext">
          Welcome Back !
        </h1>
        <p className="text-[18px] text-center px-[50px] mb-[42px] text-themetext">
          Empowering You to Unlock the Full Potential of Learning and Coaching
        </p>

        <input placeholder="Email" className="input_text mb-[32px] w-full" />

        <PasswordInput />

        <p className="self-end text-themetext mb-[25px]">
          Forgot your password?
        </p>
        <button 
          type="button" 
          className='bg-primary w-full h-[56px] text-secondary font-semibold mb-[20px] rounded-lg btn_hover'
        >
          See All
        </button>

        <p className='ext-themetext mb-[14px] leading-[19px]'>or continue with</p>

        <div className="flex space-x-[25px] mb-[178px]">
          <Image
            src={google}
            alt="login with google"
            width={60}
            height={60}
            className="bg-secondary rounded-full h-[60px] p-[13px]"
          />
          <Image
            src={facebook}
            alt="login with facebook"
            width={60}
            height={60}
            className="bg-secondary rounded-full h-[60px] p-[13px]"
          />
          <Image
            src={apple}
            alt="login with apple"
            width={60}
            height={60}
            className="bg-secondary rounded-full h-[60px] p-[13px]"
          />
        </div>

        <p className='text-[18px] text-themetext'>Don't have an account? <span className='text-primary font-bold'>Register now</span> </p>
      </div>

      <div>
        <Image
          src={imgGirl}
          alt="Picture of the author"
          // layout="responsive"
          width={1024}
        />
      </div>
    </div>
  );
};

export default Login;
