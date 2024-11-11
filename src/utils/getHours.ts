import hours from '@/dataJson/hours.json';
import months from '@/dataJson/months.json';

export const getVisibleHours = (selectedMonth: string, day: number) => {
  const visibleHours = hours;

  if (day && selectedMonth) {
    const currentMonth = new Date().getMonth();
    const indexSelectedMonth = months.findIndex(
      (month) => month.value === selectedMonth
    );
    const today = new Date().getDate();

    if (currentMonth === indexSelectedMonth && today === day) {
      const currentHour = new Date().getHours();

      return visibleHours.slice(currentHour - 7);
    }
  }

  return visibleHours;
};
