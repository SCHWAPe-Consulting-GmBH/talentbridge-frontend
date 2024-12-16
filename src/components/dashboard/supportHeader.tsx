import Image from 'next/image';
import { useAuth } from '@/firebase/context/authContext';
import faq from '@/assets/images/faq.png';

interface Props {
  isPortal: boolean;
}

export const SupportHeader: React.FC<Props> = ({ isPortal }) => {
  const { currentUser } = useAuth();
  const { email, displayName } = currentUser;

  return (
    <div
      className={`${isPortal ? 'flex justify-between w-full mb-2 mt-[15px]' : 'mb-[15px] mt-[90px]'}`}
    >
      <div>
        <p className="text-themetext font-bold text-[24px] mb-2 leading-[20px] ">
          Support
        </p>
        <p className="text-themetext font-bold text-[14px] ">
          Hi {displayName ? displayName : email.split('@')[0]}! How can we help
          you today?
        </p>
      </div>

      {isPortal && (
        <button className="bg-primary rounded-lg px-[10px] py-[5px] flex gap-[6px] items-center max-h-[30px]">
          <Image src={faq} alt="faq" width={14} />
          FAQ
        </button>
      )}
    </div>
  );
};
