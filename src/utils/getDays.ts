import days from '@/dataJson/days.json';
import months from '@/dataJson/months.json';

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month + 1, 0);

  return date.getDate();
}

export const getVisibleDays = (selectedMonth: string) => {
  const visibleDays = days;

  if (selectedMonth) {
    const currentMonth = new Date().getMonth();
    const indexSelectedMonth = months.findIndex(month => month.value === selectedMonth);
    const year = indexSelectedMonth >= currentMonth ? 2024 : 2025;
    const daysInMonth = getDaysInMonth(indexSelectedMonth, year);

    if (indexSelectedMonth === currentMonth) {
      const today = new Date().getDate();
      return visibleDays.slice(today - 1, daysInMonth);
    }

    return visibleDays.slice(0,daysInMonth);
  }

  return visibleDays;
}