'use client'

import { DevelopSkillsHub } from '@/components/learning-hub-components.tsx/developSkillsHub';
import { HotCategoriesHub } from '@/components/learning-hub-components.tsx/hotCategoriesHub';
import { MustKnowHub } from '@/components/learning-hub-components.tsx/mustKnowHub';
import { RecommendationsHub } from '@/components/learning-hub-components.tsx/recommendationsHub';
import { useRouter } from 'next/navigation';

const LearningHub = () => {
  const router = useRouter();

  return (
    <div className="mt-[195px]">
      <div className="bg-background-second flex rounded-full gap-3 max-w-[410px] w-full mx-auto mb-[40px]">
        <button
          onClick={() => router.push('/dashboard/financial-aid')}
          className="py-2 w-[199px] font-semibold border rounded-full border-transparent text-neutral2"
        >
          Steps to Success
        </button>
        <button className="py-2 w-[199px] font-semibold border rounded-full bg-opacity-primary border-primary text-themetext">
          Learning Hub
        </button>
      </div>

      <RecommendationsHub />
      <MustKnowHub />
      <HotCategoriesHub />
      <DevelopSkillsHub/>
    </div>
  );
};

export default LearningHub;
