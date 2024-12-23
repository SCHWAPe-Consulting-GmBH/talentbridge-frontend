'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import cn from 'classnames';
import questions from '@/dataJson/onboarding.json';
import arrowLeft from '@/assets/icons/arrow_left.svg';
import { QuestionInput } from '@/components/questionInput';
import { QuestionProgressBar } from '@/components/questionProgressBar';
import { Loader } from '@/components/loader';
import { useAuth } from '@/firebase/context/authContext';
import { getUserData, saveUserData } from '@/firebase/auth';

const Onboarding = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkUserData = async () => {
      if (currentUser) {
        const userData = await getUserData(currentUser.uid);
        if (userData && userData.completedOnboarding) {
          router.push('/course-matching');
        }
      }
    };

    checkUserData();
  }, [currentUser, router]);
  const currentQuestion = questions[questionNumber];
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

  const changeQuestionNext = async () => {
    if (questionNumber === questions.length - 1) {
      if (currentUser) {
        const userId = currentUser.uid;
        const userData = { answers, completedOnboarding: true };

        try {
          await saveUserData(userId, userData);
  
          router.push('/course-matching');
          return;
        } catch (error) {
          console.error('Error saving answers:', error);
        }
      } else {
        console.error('No user logged in');
        router.push('/login');
        return;
      }
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
      setQuestionNumber((prev) => prev + 1);
    }
  };

  const changeQuestionBack = () => {
    if (questionNumber === 0) {
      return;
    }
    setQuestionNumber((prev) => prev - 1);
  };

  return (
    <main className="px-[100px] pt-[100px] onboard1 background-style flex justify-start bg-background">
      {imageSrc ? (
        <div className="max-w-[1240px] mx-auto flex justify-between">
          <div className="max-w-[620px] justify-center">
            <QuestionProgressBar questionNumber={questionNumber} />

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
                    className="rounded-full btn_green_hover border border-primary w-[66px] h-[56px] flex justify-center items-center"
                    onClick={changeQuestionBack}
                  >
                    <Image
                      src={arrowLeft}
                      alt="arrow back"
                      width={14}
                      className='h-auto'
                    />
                  </button>
                )}
                <button
                  type="button"
                  className={cn('btn_green_hover bg-primary w-full h-[56px]', {
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

          <div className="relative ml-[50px] min-w-[735px] overflow-hidden ">
            <Image
              src={imageSrc}
              alt="abstraction"
              width={735}
              className="absolute object-cover h-auto"
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <Loader width={150} height={150} border={20} />
        </div>
      )}
    </main>
  );
};

export default Onboarding;
