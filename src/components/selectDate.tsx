import { Select } from "antd";
import { IconArrowForSelect } from '@/components/iconArrowForSelect';
import { IDateSelect } from "@/types/dateSelect";
import months from '@/dataJson/months.json';
import { getVisibleDays } from '@/utils/getDays';
import { getVisibleHours } from '@/utils/getHours';

interface Props {
  scheduledDate: IDateSelect,
  onChangeSheduledDate: (value: string | number, field: string) => void,
  width: number
}

export const SelectDate: React.FC<Props> = ({ scheduledDate, width, onChangeSheduledDate }) => {
  const visibleDays = getVisibleDays(scheduledDate.month);
  const visibleHours = getVisibleHours(scheduledDate.month, scheduledDate.day);

  return (
    <div className="flex items-center justify-center">
      <Select
        style={{ width: width, height: 56 }}
        placeholder="Month"
        suffixIcon={<IconArrowForSelect />}
        onChange={(e) => onChangeSheduledDate(e, 'month')}
        options={months}
      />

      <div className="w-3 h-1 bg-neutral2 mx-2"></div>

      <Select
        style={{ width: width, height: 56 }}
        placeholder="Day"
        suffixIcon={<IconArrowForSelect />}
        onChange={(e) => onChangeSheduledDate(e, 'day')}
        options={visibleDays}
      />

      <div className="w-3 h-1 bg-neutral2 mx-2"></div>

      <Select
        style={{ width: width, height: 56 }}
        placeholder="Hours"
        suffixIcon={<IconArrowForSelect />}
        onChange={(e) => onChangeSheduledDate(e, 'hours')}
        options={visibleHours}
      />
    </div>
  );
};
