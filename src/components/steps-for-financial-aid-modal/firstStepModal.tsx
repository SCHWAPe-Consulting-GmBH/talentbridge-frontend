import { updateUserPayment } from '@/firebase/auth';
import { useAuth } from '@/firebase/context/authContext';
import { IPaymentData } from '@/types/steps';
import cn from 'classnames';
import { useState } from 'react';

interface Props {
  isFirstStepShown: boolean;
  onChangeFirstStepShown: (value: boolean) => void;
  onChangeReloadPayment: (value: string) => void;
}

export const FirstStepModal: React.FC<Props> = ({
  isFirstStepShown,
  onChangeFirstStepShown,
  onChangeReloadPayment
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const { currentUser } = useAuth();

  const initialData = {
    number: 1,
    question: 'What is your current situation?',
    answers: [
      'I am already receiving financial support',
      'I have applied for financial support but haven’t received a decision yet',
      'I have not applied for financial support yet',
    ],
    additionalInfo: '',
  };

  const secondForFirst = {
    number: 1.2,
    question: 'From which agency are you receiving financial support?',
    answers: [
      'Job Center (Büregergeld)',
      'Agentur für Arbeit (Arbeitsloseneld)',
    ],
    additionalInfo:
      'Thank you. We will collect additional details in the next step.',
  };

  const secondForSecond = {
    number: 1.2,
    question: 'Where did you apply for support?',
    answers: [
      'Job Center (Büregergeld)',
      'Agentur für Arbeit (Arbeitsloseneld)',
    ],
    additionalInfo:
      'Thank you. We will collect additional details in the next step.',
  };

  const secondForThird = {
    number: 1.2,
    question:
      'Have you worked at least 12 months in a social insurance-paying job within the last 30 months before losing your job?',
    answers: [
      'Yes -> You are likely eligible for Arbeitslosengeld. We recommend applying at the Agentur für Arbeit.',
      'No -> You may be eligible for Bürgergeld. We recommend contacting your local Job Center.',
    ],
    additionalInfo: 'We will guide you through the next steps to apply.',
  };

  const [data, setData] = useState(initialData);

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleMoveToNextQuestion = async () => {
    setAnswers((prev) => [...prev, selectedAnswer]);

    if (activeIndex === 1) {
      const paymentToUpdate = {
        step_1: 'completed',
        step_2: 'in progress',
      };
      await updateUserPayment(currentUser.uid, paymentToUpdate);
      
      onChangeReloadPayment('1');

      onChangeFirstStepShown(false);
      return;
    }

    setActiveIndex(1);

    if (selectedAnswer === data.answers[0]) {
      setData(secondForFirst);
      setSelectedAnswer('');
      return;
    }

    if (selectedAnswer === data.answers[1]) {
      setData(secondForSecond);
      setSelectedAnswer('');
      return;
    }

    if (selectedAnswer === data.answers[2]) {
      setData(secondForThird);
      setSelectedAnswer('');
      return;
    }
  };

  const handleMoveToBack = () => {
    setActiveIndex(0);
    setSelectedAnswer(answers[0]);
    setData(initialData);
    setAnswers([]);
  } 

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
          <p className="font-bold text-[20px] text-themetext mb-6">{`${data.number}. ${data.question}`}</p>
          {data.answers.map((answer) => {
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
          {data.additionalInfo && (
            <p className="mt-3 text-neutral2 ">{data.additionalInfo}</p>
          )}
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

          <div>
            {activeIndex === 1 && (
              <button
                onClick={() => handleMoveToBack()}
                className="font-semibold text-themetext box-border border border-themetext mr-8 rounded-lg py-[5px] px-[26px] btn_scale"
              >
                Back
              </button>
            )}

            <button
              disabled={!selectedAnswer}
              onClick={() => handleMoveToNextQuestion()}
              className={`py-[5px] px-[26px] text-white rounded-lg ${selectedAnswer ? 'bg-primary border border-primary btn_green_hover' : 'bg-neutral2 border border-neutral2'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
