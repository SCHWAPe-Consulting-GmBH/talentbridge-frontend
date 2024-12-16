import { ProgressBar } from '../progressBar';

export const CoachingProgress = () => {
  return (
    <div className="mt-[108px] flex flex-col items-center">
      <div className="flex flex-col items-center mb-[30px]">
        <p className="mb-[10px] font-bold text-[24px] text-themetext">
          Your Journey
        </p>
        <p className="max-w-[465px] text-center font-bold text-[14px] text-themetext">
          Every journey begins with a single step. Track your milestones,
          reflect on progress, and stay focused as you move toward success.
        </p>
      </div>
      <ProgressBar />
    </div>
  );
};
