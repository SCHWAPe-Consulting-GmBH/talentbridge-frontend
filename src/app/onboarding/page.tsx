'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import questions from '@/onboarding.json';
import Image from 'next/image';
import arrow from '@/assets/icons/question_arrow.svg';
import cn from 'classnames';

const Onboarding = () => {

  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const router = useRouter();

  const currentQuestion = questions[questionNumber];
  const hasOptions = currentQuestion.options;

  const currentAnswers = answers[currentQuestion.question];

  const addAnswer = (event, answer: string) => {
    event.preventDefault(); 
    event.stopPropagation();
    console.log('addAnswer called with:', answer);
    setAnswers((prev) => {
      console.log('wtf??????');
      const question = currentQuestion.question;
      const options = currentQuestion.options;
      const currAnswers = prev[question];

      if (!options || options.amount === 1) {
        console.log('fvrjtoivr egvtgt');
        return { ...prev, [question]: answer };
      }

      if (!currAnswers && options) {
        console.log('djkfkfkf');
        return { ...prev, [question]: [answer] };
      }

      console.log('answer');
      if (Array.isArray(currAnswers)) {
        console.log('answer1', answer);
        if (currAnswers.includes(answer)) {
          const arrayAnswers = currAnswers.filter((item) => item !== answer);
          console.log('answer2 remove', answer);
          return { ...prev, [question]: arrayAnswers };
        } else {
          currAnswers.push(answer);
          console.log('answer3 add', answer);
          return { ...prev, [question]: currAnswers };
        }
      }
      console.log('nothing');
      return prev;
    });
    changeQuestionNext();
  };

  const changeQuestionNext = () => {
    if (currentQuestion.options) {
      if (currentQuestion.options.amount === 1) {
        setQuestionNumber((prev) => prev + 1);
      }

      if (
        Array.isArray(currentAnswers) &&
        currentQuestion.options.amount === currentAnswers.length
      ) {
        setQuestionNumber((prev) => prev + 1);
        return;
      }
      console.log('hello');
      return;
    }

    if (questionNumber === questions.length - 1) {
      // router.push('/course-matching');
    }
    setQuestionNumber((prev) => prev + 1);
  };

  const changeQuestionBack = () => {
    if (questionNumber === 0) {
      return;
    }
    setQuestionNumber((prev) => prev - 1);
  };

  return (
    <main className="px-[100px] pt-[100px] onboard1">

      <div className="max-w-[620px] justify-center">
        <div className="flex space-x-2 mb-[60px]">
          <div className="h-2 w-[149px] bg-white rounded-lg"></div>
          <div className="h-2 w-[149px] bg-white rounded-lg"></div>
          <div className="h-2 w-[149px] bg-white rounded-lg"></div>
          <div className="h-2 w-[149px] bg-white rounded-lg"></div>
        </div>

        <h1 className="font-extrabold text-[48px] leading-[65px] text-center mb-9">
          {currentQuestion.title}
        </h1>

        <div className="bg-white px-10 py-12 rounded-lg flex flex-col items-center">
          <div className="mb-6 flex flex-col items-center">
            <h2 className="font-medium text-[24px]">
              {currentQuestion.question}
            </h2>

            {currentQuestion.options && (
              <p className="text-neutral2 mt-4">
                {currentQuestion.options.title}
              </p>
            )}
          </div>

          <div
            className={
              currentQuestion.options
                ? 'flex flex-wrap justify-center'
                : 'flex flex-col w-full'
            }
          >
            {currentQuestion.answers.map((answer: string) => {
              const isChosen =
                currentAnswers === answer ||
                (Array.isArray(currentAnswers) &&
                  currentAnswers.includes(answer));
              console.log(currentAnswers === answer);
              return (
                <p key={uuidv4()}>{answer}</p>
                // <input
                //   key={uuidv4()}
                //   type="button"
                //   value={answer}
                //   onClick={changeQuestionBack}
                //   className={cn(
                //     'input_text border border-neutral2 items-center mb-4 ',
                //     {
                //       'bg-primary text-white': isChosen,
                //       'bg-white text-neutral2': !isChosen,
                //       'inline-flex mr-4': hasOptions,
                //       'relative flex justify-start w-full': !hasOptions,
                //     }
                //   )}
                // />

              );
            })}
          </div>
          {/* <button
            type="button"
            onClick={changeQuestionBack}
            className="mt-6 btn_hover bg-primary w-full h-[56px]"
          >
            Back
          </button> */}
        </div>
      </div>
    </main>
  );
};

export default Onboarding;
