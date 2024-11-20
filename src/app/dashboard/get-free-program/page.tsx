'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import cn from 'classnames';
import closeIcon from '@/assets/icons/close_white.svg';
import upload from '@/assets/icons/upload_documents.svg';
import { Loader } from '@/components/loader';

const GetFreeProgram = () => {
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [fileInfo, setFileInfo] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);
  const [fileSizeError, setFileSizeError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      if (file.size > 10000000) {
        setFileSizeError('File should be smaller than 10mb');
        return;
      }
      setIsModalShown(true);
      setSelectedFile(file);
      setFileInfo(
        `File name: ${file.name}, type: ${file.type}, size: ${file.size} bytes`
      );
    }
  };

  const handleFileClick = () => {
    fileInputRef.current!.click();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (selectedFile) {
      timer2 = setTimeout(() => {}, 5000);
    }

    if (fileSizeError) {
      timer = setTimeout(() => {
        setFileSizeError('');
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [fileSizeError, selectedFile]);

  return (
    <div className="mt-[56px] flex flex-col items-center">
      <h2 className="text-themetext font-extrabold text-[48px] mb-8">
        Get the Program Free
      </h2>

      <div className="flex space-x-6 justify-center">
        <div className="bg-background-second rounded-2xl p-6 w-full shadow-lg max-w-[602px]">
          <p className="font-extrabold text-themetext text-[24px] mb-4">
            Steps to Get the Program for Free
          </p>
          <ol className="list-decimal list-inside text-themetext text-[16px] font-semibold">
            <li className="mb-2">
              Select the "Get Program Free"
              <p className="text-neutral2 font-medium">
                Option: Choose the free program option at checkout to begin the
                verification process.
              </p>
            </li>
            <li className="mb-2">
              Upload Required Document:
              <p className="text-neutral2 font-medium">
                Provide the necessary document to confirm your eligibility for
                the free program. This could include proof of income, ID, or
                other supporting information.
              </p>
            </li>
            <li className="mb-2">
              Verification Process:
              <p className="text-neutral2 font-medium">
                Our Talent Bridge team will review your document. During this
                time, your application will be pending.
              </p>
            </li>
            <li className="mb-2">
              Get Access to Your Course:
              <p className="text-neutral2 font-medium">
                Once your document is verified, you’ll receive confirmation and
                full access to your chosen course—at no cost.
              </p>
            </li>
          </ol>
        </div>

        <div className="bg-background-second rounded-2xl p-6 w-full shadow-lg max-w-[602px]">
          <p className="font-extrabold text-themetext text-[24px] mb-4">
            Upload file. (Document that we need for giving the program for free)
          </p>
          <div
            className={cn(
              'border  rounded-md w-full h-[75%] flex flex-col items-center justify-center relative',
              {
                'border-primary': !fileSizeError,
                'border-error': fileSizeError,
              }
            )}
          >
            {selectedFile ? (
              <>
                <p className="text-themetext text-sm mr-14 ml-10">{fileInfo}</p>
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
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 bg-gray-800 bg-opacity-30 flex justify-center items-center',
          {
            hidden: !isModalShown,
          }
        )}
      >
        <div className="bg-background-second rounded-lg shadow-xl relative p-[32px] flex flex-col items-center">
          <button
            onClick={() => setIsModalShown(false)}
            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
          <p className="text-[24px] font-bold text-themetext mb-8">
            Thank you for submitting your document!
          </p>
          <Loader width={72} height={72} border={8} />

          <p className="text-neutral2 text-[20px] text-center mt-6 max-w-[475px]">
            Our Talent Bridge team is now reviewing it to confirm your
            eligibility for free program access. This may take a short while.
            You’ll receive a notification once verification is complete, and
            then you’ll be able to start your course.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetFreeProgram;
