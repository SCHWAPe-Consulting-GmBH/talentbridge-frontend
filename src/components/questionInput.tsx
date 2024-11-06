import Image from 'next/image';
import React, { useCallback } from 'react';
import arrow from '@/assets/icons/question_arrow.svg';
import cn from 'classnames';

interface Props {
  isChosen: boolean;
  hasOptions: boolean;
  answer: string;
  onChange: (answer: string) => void;
}

export const QuestionInput: React.FC<Props> = ({
  answer,
  onChange,
  isChosen,
  hasOptions,
}) => {
  const handleChoice = () => {
    onChange(answer);
  };

  return (
    <button
      className={cn('input_text border border-neutral2 items-center mb-4 ', {
        'bg-primary text-white': isChosen,
        'bg-white text-neutral2': !isChosen,
        'inline-flex mr-4': hasOptions,
        'relative flex justify-start w-full': !hasOptions,
      })}
      onClick={handleChoice}
    >
      {answer}
      {!hasOptions && (
        <Image
          src={arrow}
          alt="arrow back"
          width={6}
          className="absolute top-[20px] right-[16px]"
        />
      )}
    </button>
  );
};
