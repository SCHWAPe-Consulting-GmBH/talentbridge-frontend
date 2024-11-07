import Image from "next/image";
import { useEffect, useState } from "react";
import close from '@/assets/icons/Close_white.svg';

export const RegistrationNotification = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
    {isVisible && (
      <div className="max-w-[940px] bg-background-second rounded-lg py-[32px] 
        mt-[50px] absolute top-[30px] left-[15%]">
        <div className="flex flex-col items-center relative px-[170px]">
        <button 
          className="rounded-full bg-background-revert w-[38px] h-[38px] flex justify-center items-center absolute top-[-6px] right-[20px]"
          onClick={handleClose}
        >
          <Image
            src={close}
            width={20}
            alt="close"
          />
        </button>
        <p className="text-themetext font-bold text-[24px]">Congratulations! 🎉</p>
        <p className="text-themetext max-w-[560px] text-center text-[24px]">You have successfully submitted your application for the "Graphic Design" course.</p>
        </div>
        
      </div>
    )}
  </>
  )
}