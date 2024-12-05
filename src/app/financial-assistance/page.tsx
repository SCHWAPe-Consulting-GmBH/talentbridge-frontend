import { FinancialChoices } from '@/components/financial-components/financialChoices';

const FinancialAssistance = () => {
  return (
    <div className="max-w-[1034px] mx-auto pt-[150px] flex flex-col items-center">
      <h1 className="font-extrabold text-[48px] mb-4 leading-[65px] text-themetext text-center">
        Do You Need Financial Assistance to
        <br />
        Achieve Your Career Goals?
      </h1>
      <p className="font-medium text-[24px] text-neutral2 text-center mb-8">
        We can guide you through available financial support options, including
        government programs. For personalized help, we also offer 1:1 sessions
        to assist you step-by-step
      </p>
      <FinancialChoices />
      <p className="text-neutral2 leading-[19px] text-[14px]">
        If you choose <span className="text-primary font-bold">‘Yes,’</span> you
        can access free resources and guidance.
        <br />
        Additionally, for personalized, hands-on help with navigating government
        programs, you can book a 1:1 session with our experts at an affordable
        price
      </p>
    </div>
  );
};

export default FinancialAssistance;
