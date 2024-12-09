import ClickOutside from '@/hooks/clickOutside';
import { IOptions } from '@/types/multiSelectTypes';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  options: IOptions[];
  placeholder: string;
  selected: IOptions[];
  searchQuery: string;
  onSearch: (value: string) => void;
  onChangeSelected: (selectedUser: IOptions) => void;
}

export const MultiSelection: React.FC<Props> = ({
  options,
  placeholder,
  selected,
  searchQuery,
  onChangeSelected,
  onSearch,
}) => {
  const [isListShown, setIsListShown] = useState(true);
  const selectedLabels = selected.map((user) => user.label);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log('selected', selected);
  console.log('options', options);
  // let rect: DOMRect | null = null;
  const [rect, setRect] = useState< DOMRect | null>(null)
  const onClose = () => {
    setIsListShown(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setRect(inputRef.current.getBoundingClientRect());
    }
  }, []);
  console.log('rect3', rect)
  return (
    <div className="">
      <input
        type="text"
        value={searchQuery}
        ref={inputRef}
        className="input_text border-light-gray h-[42px]"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        onClick={() => setIsListShown((prev) => !prev)}
      />

      <ClickOutside onClick={onClose} exceptionRef={inputRef} top={rect ? rect?.top - 30 : 200}>
        <div
          className={cn(
            'p-[10px] bg-background-second rounded-2xl border border-shadow-revert ',
            {
              hidden: !isListShown,
            }
          )}
        >
          <div className="max-h-[400px] overflow-auto custom-scrollbar ">
            <div className="truncate flex flex-col items-start">
              {options.map((option) => {
                return (
                  <button
                    key={uuidv4()}
                    className={` min-h-[35px] ${selectedLabels.includes(option.label) ? 'bg-opacity-info' : ''} hover:bg-light-gray p-1 rounded-lg truncate w-[200px] border-box`}
                    onClick={() => onChangeSelected(option)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </ClickOutside>
    </div>
  );
};
