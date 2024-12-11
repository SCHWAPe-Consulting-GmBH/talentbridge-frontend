import cn from 'classnames';
import { useState } from 'react';

interface Props {
  isFirstStepShown: boolean;
  onChangeFirstStepShown: (value: boolean) => void;
}

export const FirstStepModal: React.FC<Props> = ({
  isFirstStepShown,
  onChangeFirstStepShown,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const data = [
    {
      question: 'What is your current situation?',
      answers: [
        'I am already receiving financial support',
        'I have applied for financial support but haven’t received a decision yet',
        'I have not applied for financial support yet',
      ],
    },
  ];

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  return (
    <div
      className={cn(
        'fixed inset-0 bg-opacity-modal flex justify-center items-center z-40',
        {
          hidden: !isFirstStepShown,
        }
      )}
    >
      <div className="bg-background rounded-xl shadow-xl relative p-[48px] flex flex-col max-w-[1340px]">
        <button
          onClick={() => onChangeFirstStepShown(false)}
          className="absolute top-4 right-8 text-5xl text-gray-500 hover:text-gray-800 btn_scale"
        >
          &times;
        </button>

        <h2 className="font-bold text-[24px] text-themetext leading-5 mb-5">
          Job Center or Agentur Für Arbeit
        </h2>
        <p className="font-semibold text-[20px] text-themetext mb-8">
          Answer the questions.
        </p>

        <div className="p-4 rounded-xl shadow-md mb-8">
          <p className="font-bold text-[20px] text-themetext mb-6">{`${activeIndex + 1}. ${data[activeIndex].question}`}</p>
          {data[activeIndex].answers.map((answer) => {
            return (
              <div className="ml-4 flex gap-2 mb-3 items-center">
                <input
                  type="radio"
                  checked={selectedAnswer === answer}
                  onChange={() => handleSelectAnswer(answer)}
                  className="w-5 h-5 rounded-xl border outline-none border-light-gray hover:border-primary"
                />
                <p className="text-[16px]">{answer}</p>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="h-2 w-[113px] bg-white rounded-lg p-[2px]">
              <div
                className={cn('h-1 bg-primary rounded-lg', {
                  'w-[56px]': activeIndex === 0 && !selectedAnswer,
                  'w-full': selectedAnswer && activeIndex === 0,
                })}
              />
            </div>

            <div className="h-2 w-[113px] bg-white rounded-lg p-[2px]">
              <div
                className={cn('h-1 bg-primary rounded-lg', {
                  'w-0': activeIndex === 0,
                  'w-[56px]': activeIndex === 1,
                  'w-full': !!selectedAnswer && activeIndex === 1,
                })}
              />
            </div>
          </div>

          <button
            disabled={!selectedAnswer}
            className={` py-[5px] px-[26px] text-white rounded-lg ${selectedAnswer ? 'bg-primary btn_green_hover' : 'bg-neutral2' }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
