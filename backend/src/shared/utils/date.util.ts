import { format, startOfToday } from 'date-fns';

export const getSeparatedDate = (isStartOfToday: boolean = false) => {
  const todayDate = isStartOfToday ? startOfToday() : new Date();
  const year = format(todayDate, 'yyyy');
  const month = format(todayDate, 'M');
  const day = format(todayDate, 'd');
  const hour = format(todayDate, 'hh');
  const minute = format(todayDate, 'mm');
  const second = format(todayDate, 'ss');

  return { year, month, day, hour, minute, second };
};

export const getFormattedDate = () => {
  return format(new Date(), 'yyyy-mm-dd, hh:mm:s a');
};
