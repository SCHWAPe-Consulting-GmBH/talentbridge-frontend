import ClickOutside from '@/hooks/clickOutside';
import { IOptions } from '@/types/multiSelectTypes';
import cn from 'classnames';
import { useRef, useState } from 'react';
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
  const [isListShown, setIsListShown] = useState(false);
  const selectedLabels = selected.map((user) => user.label);
  const inputRef = useRef(null);
  console.log('selected', selected)
  const onClose = () => {
    setIsListShown(false);
  }

  return (
    <div className='relative'>
      <input
        type="text"
        value={searchQuery}
        ref={inputRef}
        className="input_text border-light-gray h-[42px]"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        onClick={() => setIsListShown((prev) => !prev)}
      />

      <ClickOutside onClick={onClose} exceptionRef={inputRef} top={50}>
        <div
          className={cn(
            'p-[10px] bg-background-second rounded-2xl border border-shadow-revert',
            {
              hidden: !isListShown,
            }
          )}
        >
          <div className="top-[100px] max-h-[432px] overflow-auto flex flex-col custom-scrollbar items-start truncate">
            {options.map((option) => {
              return (
                <button
                  key={uuidv4()}
                  className={`${selectedLabels.includes(option.label) ? 'bg-opacity-info' : ''} hover:bg-light-gray p-1 rounded-lg truncate w-[224px] border-box`}
                  onClick={() => onChangeSelected(option)}
                >
                {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </ClickOutside>
    </div>
  );
};
