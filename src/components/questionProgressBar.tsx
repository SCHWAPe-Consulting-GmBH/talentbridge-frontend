import React from 'react';
import cn from 'classnames';

interface Props {
  questionNumber: number;
}

export const QuestionProgressBar: React.FC<Props> = ({ questionNumber }) => {
  return (
  <div className="flex space-x-2 mb-[60px]">
    <div className="h-2 w-[149px] bg-white rounded-lg p-[2px]">
      <div
        className={cn('h-1 bg-primary rounded-lg', {
          'w-[36px]': questionNumber === 0,
          'w-[72px]': questionNumber === 1,
          'w-[108px]': questionNumber === 2,
          'w-full': questionNumber > 3,
        })}
      />
    </div>
    <div className="h-2 w-[149px] bg-white rounded-lg p-[2px]">
      <div
        className={cn('h-1 bg-primary rounded-lg', {
          'w-0': questionNumber < 4,
          'w-[72px]': questionNumber === 4,
          'w-full': questionNumber > 4,
        })}
      />
    </div>
    <div className="h-2 w-[149px] bg-white rounded-lg p-[2px]">
      <div
        className={cn('h-1 bg-primary rounded-lg', {
          'w-0': questionNumber < 6,
          'w-full': questionNumber >= 6,
        })}
      />
    </div>
    <div className="h-2 w-[149px] bg-white rounded-lg p-[2px]">
      <div
        className={cn('h-1 bg-primary rounded-lg', {
          'w-0': questionNumber < 7,
          'w-[72px]': questionNumber === 7,
          'w-full': questionNumber > 7,
        })}
      />
    </div>
  </div>
)};
