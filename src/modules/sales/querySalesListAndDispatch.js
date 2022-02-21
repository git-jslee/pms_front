import React from 'react';
import { useDispatch } from 'react-redux';
import calStartEndDayFromMonth from '../common/calStartEndDayFromMonth';
import moment from 'moment';
import { getSalesQuery } from '../sales';

const querySalesListAndDispatch = (start, end, arg) => {
  //   const dispatch = useDispatch();
  // 검색 시작월, 검색 종료월 기준..월별 시작일, 마지막 날짜 구하기
  const _start = moment(start).format('YYYY-MM');
  const _end = moment(end).format('YYYY-MM');
  const startEnd = calStartEndDayFromMonth(_start, _end);
  const queayDefault = `sales_rec_date_gte=${startEnd[0]}&sales_rec_date_lte=${startEnd[1]}&deleted=false`;

  //   dispatch(getSalesQuery(queayDefault));

  console.log('**querySalesListAndDispatch**');

  return <div></div>;
};

export default querySalesListAndDispatch;
