'use client';
import { useAuth } from '@/firebase/context/authContext';
import { Loader } from '../loader';

export const SupportForm = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader width={20} height={20} border={3} />;
      </div>
    );
  }
  const { email, displayName, photoURL } = currentUser;
  return (
    <section>
      <p className="text-themetext font-bold text-[24px] mb-2 leading-[20px] mt-[90px]">
        Support
      </p>
      <p className="text-themetext font-bold text-[14px] mb-[15px]">
        Hi {displayName ? displayName : email.split('@')[0]}! How can we help
        you today?
      </p>
      <form className="p-[15px] rounded-2xl bg-background-second flex flex-col">
        <div className="grid grid-cols-2 gap-[40px]">
          <div>
            <p className="mb-2">Name</p>
            <input
              type="text"
              placeholder="Name"
              className="input_text border border-light-gray mb-2 w-full"
            />
            <p className="mb-2">Email</p>
            <input
              type="text"
              placeholder="Email"
              className="input_text border border-light-gray w-full"
            />
          </div>
          <div>
            <p className="mb-2">Description of the request</p>
            <textarea
              placeholder="Description of the request.."
              className="input_text border border-light-gray w-full h-[147px] resize-none "
            />
          </div>
        </div>
        <div className="self-end">
          <button className="py-[11px] px-[30px] bg-dark-gray text-white rounded-lg btn_scale">
            Send
          </button>
        </div>
      </form>
    </section>
  );
};
