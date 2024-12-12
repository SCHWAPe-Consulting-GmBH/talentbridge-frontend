import { useAuth } from '@/firebase/context/authContext';
import cn from 'classnames';
import Image from 'next/image';
import upload from '@/assets/icons/upload_documents.svg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Loader } from '../loader';
import doc from '@/assets/icons/doc_step4.svg';
import { updateUserPayment } from '@/firebase/auth';

interface Props {
  isFifthStepShown: boolean;
  onChangeFifthStepShown: (value: boolean) => void;
  onChangeReloadPayment: (value: string) => void;
}

export const FifthStepModal: React.FC<Props> = ({
  isFifthStepShown,
  onChangeFifthStepShown,
  onChangeReloadPayment,
}) => {
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [fileInfo, setFileInfo] = useState('');
  const [fileSizeError, setFileSizeError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedSecondFile, setSelectedSecondFile] = useState<null | File>(
    null
  );
  const [secondFileInfo, setSecondFileInfo] = useState('');
  const [secondFileSizeError, setSecondFileSizeError] = useState('');
  const secondFileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState(0);
  const { currentUser } = useAuth();

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = event.target?.files?.[0];
    if (file) {
      if (file.size > 10000000) {
        if (field === 'second') {
          setSecondFileSizeError('File should be smaller than 10mb');
        } else {
          setFileSizeError('File should be smaller than 10mb');
        }
        return;
      }

      if (field === 'second') {
        setSelectedSecondFile(file);
        setSecondFileInfo(
          `File name: ${file.name}, type: ${file.type}, size: ${file.size} bytes`
        );
      } else {
        setSelectedFile(file);
        setFileInfo(
          `File name: ${file.name}, type: ${file.type}, size: ${file.size} bytes`
        );
      }
    }
  };

  const handleFileClick = () => {
    fileInputRef.current!.click();
  };

  const handleSecondFileClick = () => {
    secondFileInputRef.current!.click();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (fileSizeError) {
      timer = setTimeout(() => {
        setFileSizeError('');
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
  }, [fileSizeError, secondFileSizeError]);

  const handleCloseButton = async() => {
    if (activeTab === 2) {
      const paymentToUpdate = {
        step_5: 'completed',
      };
      await updateUserPayment(currentUser.uid, paymentToUpdate);
  
      onChangeReloadPayment('1234');
      onChangeFifthStepShown(false);
      return;
    }

    onChangeFifthStepShown(false);
  }

  return (
    <div
      className={cn(
        'fixed inset-0 bg-opacity-modal flex justify-center items-center z-40',
        {
          hidden: !isFifthStepShown,
        }
      )}
    >
      <div className="bg-background-second rounded-xl shadow-xl relative p-[48px] flex flex-col w-[1082px]">
        <button
          onClick={() => handleCloseButton()}
          className="absolute top-4 right-8 text-5xl text-gray-500 hover:text-gray-800 btn_scale"
        >
          &times;
        </button>

        {activeTab === 0 && (
          <div className="flex flex-col">
            <h2 className="font-bold text-[24px] text-themetext leading-5 mb-[28px]">
              Upload AVGS
            </h2>
            <p className="font-semibold text-[20px] text-themetext mb-6">
              Please wait until our team processes your request. <br />
              Once you receive your AVGS voucher, upload it using the form
              below.
            </p>

            <div className="p-6 rounded-xl shadow-md mb-6">
              <div
                className={cn(
                  'border rounded-md w-full h-[290px] flex flex-col items-center justify-center relative',
                  {
                    'border-primary': !fileSizeError,
                    'border-error': fileSizeError,
                  }
                )}
              >
                {selectedFile ? (
                  <>
                    <p className="text-themetext text-sm mr-14 ml-10">
                      {fileInfo}
                    </p>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="absolute rounded-full bg-red-600 p-2 right-6"
                    >
                      {/* <Image src={closeIcon} alt="close" width={20} /> */}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleFileClick}
                    className="w-full flex flex-col items-center justify-center"
                  >
                    <Image
                      src={upload}
                      alt="upload image"
                      width={35}
                      className="mb-8"
                    />
                    Upload a file less than 10MB
                  </button>
                )}
              </div>
              {fileSizeError && (
                <p className="absolute text-error font-semibold text-[14px]">
                  {fileSizeError}
                </p>
              )}

              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'first')}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
            </div>

            <button
              onClick={() => setActiveTab(1)}
              className="bg-primary btn_green_hover py-[11px] px-[105px] max-w-[356px] self-center"
            >
              Send AVGS voucher
            </button>
          </div>
        )}

        {activeTab === 1 && (
          <div className="flex flex-col mt-[96px] items-center">
            <h2 className="font-bold text-[24px] text-themetext leading-5 mb-[24px]">
              Confirmation
            </h2>

            <Loader width={72} height={72} border={6} />

            <p className="mt-6 text-neutral2 max-w-[890px] text-center text-[20px]">
              Our Talent Bridge team is now reviewing it to confirm your
              eligibility for free program access. This may take a short while.
              You’ll receive a notification once verification is complete, and
              then you’ll be able to start your course.
            </p>

            <button
              onClick={() => setActiveTab(2)}
              className="mt-[56px] bg-primary btn_green_hover py-[11px] max-w-[356px] w-full"
            >
              Already have the confirmation?
            </button>
          </div>
        )}

        {activeTab === 2 && (
          <div className="flex flex-col">
            <h2 className="font-bold text-[24px] text-themetext leading-5 mb-[24px]">
              Give Filled Out AVGS to CaseWorker
            </h2>

            <div className="self-center">
              <p className="font-semibold text-[20px]">
                Please download and complete this document.
              </p>
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

            <p className='font-semibold text-[20px] mt-6'>After completing this document, you can either hand it over to the CaseWorker in person or send it to our email address at <span className='text-primary'>test@gmail.com</span>.</p>
          </div>
        )}
      </div>
    </div>
  );
};
