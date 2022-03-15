import moment from 'moment';

export const weekOfMonth = (date) => {
  const nowDate = moment(date);
  const m = nowDate;
  const weekof = m.week() - moment(m).startOf('month').week() + 1;
  // console.log(nowDate.format('YYYY년 MM월 ') + result + '주차');
  // 2022-03-4
  const result = moment(date).format('YY-MM-') + weekof;
  return result;
};
