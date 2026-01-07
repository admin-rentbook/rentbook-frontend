export type FormattedDate = {
  month: string;
  day: string;
  fullDate: string;
  dayOfWeek: string;
};

export const getFormattedDate = (selectedDate: string | null): FormattedDate => {
  if (!selectedDate) {
    return {
      month: 'Nov',
      day: '17',
      fullDate: '17 Nov',
      dayOfWeek: 'Monday',
    };
  }

  const date = new Date(selectedDate);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday',
  ];

  return {
    month: months[date.getMonth()],
    day: date.getDate().toString(),
    fullDate: `${date.getDate()} ${months[date.getMonth()]}`,
    dayOfWeek: daysOfWeek[date.getDay()],
  };
};
