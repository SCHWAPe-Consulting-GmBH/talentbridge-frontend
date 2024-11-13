'use client';

const PaymentOptions = () => {
  
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
          <h3 className=" font-extrabold text-[24px] text-themetext">Start Your Program Now with a Subscription</h3>
          <p className="text-neutral2 text-[16px] font-medium"></p>
        </div>
        <div className="bg-background-second rounded-2xl p-6 max-w-[357px]">
          <h3 className="mb-2 font-extrabold text-[24px] text-themetext">Learn How to Get Your Program Completely Free</h3>
          <p className="text-neutral2 text-[16px] font-medium">This option allows you to learn about opportunities to receive the program for free through scholarships or financial aid. We offer various options that may cover your training costs.</p>
          <p className="text-neutral2 text-[16px] font-medium">By selecting this option, you will proceed to a form where you can apply for a scholarship or learn more about financial aid programs.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
