import cn from 'classnames';

interface Props {
  isFourthStepShown: boolean;
  onChangeFourthStepShown: (value: boolean) => void;
}

export const FourthStepModal: React.FC<Props> = ({
  isFourthStepShown,
  onChangeFourthStepShown,
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 bg-opacity-modal flex justify-center items-center z-40',
        {
          hidden: !isFourthStepShown,
        }
      )}
    >
      <div className="bg-background bg6 rounded-lg shadow-xl relative px-[50px] pt-[126px] flex flex-col max-w-[1340px]">
        <button
          onClick={() => onChangeFourthStepShown(false)}
          className="absolute top-4 right-8 text-5xl text-gray-500 hover:text-gray-800 btn_scale"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
