import React, { MutableRefObject, useRef } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import xlsx from '@/assets/icons/xlsx_file.svg';
import docx from '@/assets/icons/docx_file.svg';
import zip from '@/assets/icons/zip_file.svg';
import pdf from '@/assets/icons/pdf_file.svg';
import jpg from '@/assets/icons/jpg_file.svg';
import exe from '@/assets/icons/exe_file.svg';
import psd from '@/assets/icons/psd_file.svg';
import pptx from '@/assets/icons/pptx_file.svg';
import ClickOutside from '@/hooks/clickOutside';

interface Props {
  isDocumentModalShown: boolean;
  onClose: () => void;
  buttonRef: MutableRefObject<null | HTMLButtonElement>;

}

export const DocumentsModal: React.FC<Props> = ({
  isDocumentModalShown,
  onClose,
  buttonRef
}) => {
  const documentPics = [xlsx, docx, zip, pdf, jpg, exe, psd, pptx];

  return (
    <ClickOutside onClick={onClose} exceptionRef={buttonRef} top={70}>
      <div
        className={cn({
          hidden: !isDocumentModalShown,
        })}
      >
        <div className="top-[70px] bg-background-second rounded-lg border border-shadow-revert w-full p-[25px] grid grid-cols-2 gap-[15px] pointer-events-auto">
          {documentPics.map((pic) => {
            return (
              <div
                key={uuidv4()}
                className="bg-background-second border border-shadow-revert rounded-lg py-[13px] px-[15px] flex space-x-3 cursor-pointer"
              >
                <Image src={pic} alt="document icon" width={41.55} className='h-auto'/>

                <div>
                  <p className="text-themetext font-bold text-[14px]">
                    Document Name
                  </p>
                  <p className="text-themetext text-[12px]">02.03.2024</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ClickOutside>
  );
};
