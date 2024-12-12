import cn from 'classnames';
import Image from 'next/image';
import doc from '@/assets/icons/doc_step4.svg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { updateUserPayment } from '@/firebase/auth';
import { useAuth } from '@/firebase/context/authContext';

interface Props {
  isFourthStepShown: boolean;
  onChangeFourthStepShown: (value: boolean) => void;
  onChangeReloadPayment: (value: string) => void;
}

export const FourthStepModal: React.FC<Props> = ({
  isFourthStepShown,
  onChangeFourthStepShown,
  onChangeReloadPayment,
}) => {
  const [selectedFirstFile, setSelectedFirstFile] = useState<null | File>(null);
  const [selectedSecondFile, setSelectedSecondFile] = useState<null | File>(
    null
  );
  const [firstFileInfo, setFirstFileInfo] = useState('');
  const [secondFileInfo, setSecondFileInfo] = useState('');
  const [firstFileSizeError, setFirstFileSizeError] = useState('');
  const [secondFileSizeError, setSecondFileSizeError] = useState('');
  const firstFileInputRef = useRef<HTMLInputElement>(null);
  const secondFileInputRef = useRef<HTMLInputElement>(null);

  const { currentUser } = useAuth();

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = event.target?.files?.[0];
    if (file) {
      if (file.size > 10000000) {
        if (field === 'first') {
          setFirstFileSizeError('File should be smaller than 10mb');
        } else {
          setSecondFileSizeError('File should be smaller than 10mb');
        }
        return;
      }

      if (field === 'first') {
        setSelectedFirstFile(file);
        setFirstFileInfo(
          `File name: ${file.name}, type: ${file.type}, size: ${file.size} bytes`
        );
      } else {
        setSelectedSecondFile(file);
        setSecondFileInfo(
          `File name: ${file.name}, type: ${file.type}, size: ${file.size} bytes`
        );
      }
    }
  };

  const handleFirstFileClick = () => {
    firstFileInputRef.current!.click();
  };
  const handleSecondFileClick = () => {
    secondFileInputRef.current!.click();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (firstFileSizeError) {
      timer = setTimeout(() => {
        setFirstFileSizeError('');
      }, 2000);
    }

    if (secondFileSizeError) {
      timer2 = setTimeout(() => {
        setSecondFileSizeError('');
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [firstFileSizeError, secondFileSizeError]);

  const handleSend = async () => {
    const paymentToUpdate = {
      step_4: 'completed',
      step_5: 'in progress',
    };
    await updateUserPayment(currentUser.uid, paymentToUpdate);

    onChangeReloadPayment('1234');
    onChangeFourthStepShown(false);
    return;
  };

  return (
    <div
      className={cn(
        'fixed inset-0 bg-opacity-modal flex justify-center items-center z-40',
        {
          hidden: !isFourthStepShown,
        }
      )}
    >
      <div className="bg-background-second rounded-xl shadow-xl relative p-[48px] flex flex-col w-[1082px]">
        <button
          onClick={() => onChangeFourthStepShown(false)}
          className="absolute top-4 right-8 text-5xl text-gray-500 hover:text-gray-800 btn_scale"
        >
          &times;
        </button>
        <h2 className="font-bold text-[24px] text-themetext leading-5 mb-[28px]">
          Bring Documents to Appointment
        </h2>
        <p className="font-semibold text-[20px] text-themetext mb-6">
          View and download documents. This will help you in the future.
        </p>
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <div className="bg-neutral3 relative rounded-lg w-[485px] h-[339px] flex flex-col items-center justify-center">
              {selectedFirstFile ? (
                <>
                  <p className="text-themetext text-sm mr-14 ml-10">
                    {firstFileInfo}
                  </p>
                  <button
                    onClick={() => setSelectedFirstFile(null)}
                    className="absolute rounded-full bg-red-600 px-2 py-1 right-6"
                  >
                    &times;
                  </button>
                </>
              ) : (
                <>
                  <Image src={doc} alt="" width={36} className="mb-9" />
                  <p className="font-bold text-[24px] text-themetext mb-[15px]">
                    Course Offer
                  </p>
                  <p className="text-[12px] text-themetext max-w-[293px] text-center">
                    Lorem ipsum dolor sit amet consectetur. Elementum dolor
                    tempus pulvinar vitae morbi lorem posuere. Leo placerat
                    convallis pellentesque et. Interdum fermen.
                  </p>
                </>
              )}
              {firstFileSizeError && (
                <p className="absolute text-error font-semibold text-[14px]">
                  {firstFileSizeError}
                </p>
              )}

              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'first')}
                ref={firstFileInputRef}
                style={{ display: 'none' }}
              />
            </div>

            <button
              onClick={handleFirstFileClick}
              disabled={!!selectedFirstFile}
              className={` py-[11px] ${!selectedFirstFile ? 'btn_green_hover bg-primary' : 'bg-neutral2 rounded-lg'}`}
            >
              Download
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="bg-neutral3 relative rounded-lg w-[485px] h-[339px] flex flex-col items-center justify-center">
              {selectedSecondFile ? (
                <>
                  <p className="text-themetext text-sm mr-14 ml-10">
                    {secondFileInfo}
                  </p>
                  <button
                    onClick={() => setSelectedSecondFile(null)}
                    className="absolute rounded-full bg-red-600 px-2 py-1 right-6"
                  >
                    &times;
                  </button>
                </>
              ) : (
                <>
                  <Image src={doc} alt="" width={36} className="mb-9" />
                  <p className="font-bold text-[24px] text-themetext mb-[15px]">
                    TalentBridge Report
                  </p>
                  <p className="text-[12px] text-themetext max-w-[293px] text-center">
                    Lorem ipsum dolor sit amet consectetur. Elementum dolor
                    tempus pulvinar vitae morbi lorem posuere. Leo placerat
                    convallis pellentesque et. Interdum fermen.
                  </p>
                </>
              )}
              {secondFileSizeError && (
                <p className="absolute text-error font-semibold text-[14px]">
                  {secondFileSizeError}
                </p>
              )}

              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'second')}
                ref={secondFileInputRef}
                style={{ display: 'none' }}
              />
            </div>

            <button
              onClick={handleSecondFileClick}
              disabled={!!selectedSecondFile}
              className={` py-[11px] ${!selectedSecondFile ? 'btn_green_hover bg-primary' : 'bg-neutral2 rounded-lg'}`}
            >
              Download
            </button>
          </div>
        </div>
        {selectedFirstFile && selectedSecondFile && (
          <button
            onClick={() => handleSend()}
            className="btn_green_hover w-full bg-primary p-[10px] mt-8"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};
