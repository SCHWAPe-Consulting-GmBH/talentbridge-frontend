'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import cn from 'classnames';
import questions from '@/onboarding.json';
import arrowLeft from '@/assets/icons/arrow_left.svg';
import { QuestionInput } from '@/components/questionInput';
import { QuestionProgressBar } from '@/components/questionProgressBar';

const Onboarding = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState('');
  console.log(questionNumber);

  const currentQuestion = questions[questionNumber];
  const hasOptions = currentQuestion.options;
  const currentAnswers = answers[currentQuestion.question];
  const isManyOptions =
    currentQuestion.options && currentQuestion.options.amount > 1;

  useEffect(() => {
    const loadImage = async () => {
      const imageModule = await import(
        '@/assets/images/' + currentQuestion.image
      );
      setImageSrc(imageModule.default);
    };

    loadImage();
  }, [currentQuestion]);

  const addAnswer = (answer: string) => {
    console.log('addAnswer called with:', answer);
    setAnswers((prev) => {
      const question = currentQuestion.question;
      const options = currentQuestion.options;
      const currAnswers = prev[question];

      if (!options || options.amount === 1) {
        return { ...prev, [question]: answer };
      }

      if (!currAnswers && options) {
        return { ...prev, [question]: [answer] };
      }

      if (Array.isArray(currAnswers)) {
        if (currAnswers.includes(answer)) {
          const arrayAnswers = currAnswers.filter((item) => item !== answer);
          return { ...prev, [question]: arrayAnswers };
        } else if (currAnswers.length < options.amount) { 
          currAnswers.push(answer);
          return { ...prev, [question]: currAnswers };
        }
      }

      return prev;
    });

    if (!isManyOptions) {
      changeQuestionNext();
    }

  };

  const changeQuestionNext = () => {
    if (questionNumber === questions.length - 1) {
      router.push('/course-matching');
      return;
    }

    if (currentQuestion.options && currentQuestion.options.amount === 1) {
      setQuestionNumber((prev) => prev + 1);
      return;
    }

    setQuestionNumber((prev) => prev + 1);
  };

  const changeQuestionNextArray = () => {
    if (
      currentQuestion.options &&
      Array.isArray(currentAnswers) &&
      (currentQuestion.options.amount <= currentAnswers.length ||
        currentQuestion.options.amount > 1)
    ) {
      console.log('question number', questionNumber);
      setQuestionNumber((prev) => prev + 1);
    }
  };

  const changeQuestionBack = () => {
    if (questionNumber === 0) {
      return;
    }
    setQuestionNumber((prev) => prev - 1);
  };

  console.log(questionNumber === 4);
  return (
    <main className="px-[100px] pt-[100px] onboard1 flex justify-center bg-background">
      {imageSrc ? (
        <>
        <div className="max-w-[620px] justify-center">
        <QuestionProgressBar questionNumber={questionNumber}/>

        <h1 className="font-extrabold text-[48px] leading-[65px] text-center mb-9 text-themetext">
          {currentQuestion.title}
        </h1>

        <div className="bg-background-second px-10 py-12 rounded-lg flex flex-col items-center ">
          <div className="mb-6 flex flex-col items-center">
            <h2 className="font-medium text-[24px] text-themetext">
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

              return (
                <QuestionInput
                  key={uuidv4()}
                  isChosen={isChosen}
                  hasOptions={!!currentQuestion.options}
                  answer={answer}
                  onChange={addAnswer}
                />
              );
            })}
          </div>

          <div className="w-full flex items-center justify-center mt-6">
            {isManyOptions && (
              <button
                className="rounded-full border border-primary w-[66px] h-[56px] flex justify-center items-center"
                onClick={changeQuestionBack}
              >
                <Image src={arrowLeft} alt="arrow back" width={14} />
              </button>
            )}
            <button
              type="button"
              className={cn('btn_hover bg-primary w-full h-[56px]', {
                'ml-4': isManyOptions,
              })}
              onClick={
                isManyOptions ? changeQuestionNextArray : changeQuestionBack
              }
            >
              {isManyOptions ? 'Next' : 'Back'}
            </button>
          </div>
        </div>
      </div>

      <div className="ml-[50px]">
        <Image
          src={imageSrc}
          alt="abstaction"
          width={735}
          className="object-cover"
        />
      </div>
      </>
      )
      :
      (
        <div className="max-w-[620px] justify-center items-center my-auto">
          <div className="w-[150px] h-[150px] mx-auto border-[20px] border-solid border-gray-300 border-l-primary rounded-full animate-spin"></div>
        </div>
      )
    }
    </main>
  );
};

export default Onboarding;
