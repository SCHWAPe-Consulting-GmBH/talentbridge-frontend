'use client';
import { useRouter } from 'next/navigation';

const PaymentOptions = () => {
  const router = useRouter();

  return (
    <div className="mt-[56px] flex flex-col items-center">
      <h2 className="text-themetext font-extrabold text-[48px] mb-4">
        Payment Options
      </h2>
      <p className="font-medium text-[24px] text-neutral2 text-center max-w-[968px] mb-8">
        Choose your payment option to proceed
      </p>
      <div className="flex space-x-6">
        <div className="bg-background-second rounded-2xl p-6 border border-primary max-w-[357px]">
          <h3 className="mb-4 font-extrabold text-[24px] text-themetext">
            Start Your Program Now with a Subscription
          </h3>
          <p className="text-neutral2 text-[16px] font-medium mb-2">
            Sign up now to start your course immediately and access all
            materials.
          </p>
          <ol className="list-disc list-inside text-neutral2 text-[16px] font-medium mb-5">
            <li>Access to all courses within your subscription</li>
            <li>Receive updates and new courses at no additional charge</li>
            <li>24/7 support via chat or email</li>
          </ol>
          <p className="text-success font-extrabold text-[32px] mb-5">
            $199/mo
          </p>
          <button className="bg-primary w-full btn_hover rounded-lg py-[11px] box-border font-semibold text-[16px]">
            Register to course
          </button>
        </div>
        <div className="bg-background-second rounded-2xl p-6 max-w-[357px]">
          <h3 className="mb-2 font-extrabold text-[24px] text-themetext">
            Learn How to Get Your Program Completely Free
          </h3>
          <p className="text-neutral2 text-[16px] font-medium mb-2">
            This option allows you to learn about opportunities to receive the
            program for free through scholarships or financial aid. We offer
            various options that may cover your training costs.
          </p>
          <p className="text-neutral2 text-[16px] font-medium mb-12">
            By selecting this option, you will proceed to a form where you can
            apply for a scholarship or learn more about financial aid programs.
          </p>
          <button
            onClick={() => router.push('/dashboard/get-free-program')}
            className="border-[1px] border-themetext text-themetext w-full py-[11px] rounded-lg font-semibold text-[16px] btn_hover"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
