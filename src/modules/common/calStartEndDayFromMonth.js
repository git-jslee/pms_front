import moment from 'moment';

const calStartEndDayFromMonth = (startMonth, endMonth) => {
  const startOfDay = moment(startMonth).startOf('month').format('YYYY-MM-DD');
  const endOfDay = moment(endMonth).endOf('month').format('YYYY-MM-DD');
  console.log('**start of day & end of day**', startOfDay, endOfDay);
  return [startOfDay, endOfDay];
};

export default calStartEndDayFromMonth;
