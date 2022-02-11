import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SalesStatisticsTable from '../../components/sales/SalesStatisticsTable';
import * as api from '../../lib/api/api';
import sumSalesValueByMonth from '../../modules/sales/sumSalesValueByMonth';
import moment from 'moment';
import startEndDay from '../../modules/common/startEndDay';

const SalesStatisticsContainer = () => {
  // sales summary 정보 가져오기
  const { summary } = useSelector(({ sales }) => ({
    summary: sales.summary,
  }));
  console.log('summary', summary);
  const [sumValue, setSumValue] = useState({});
  const [totalMonth, setTotalMonth] = useState([]);

  const get4MonthSalesList = async () => {
    const obj = {};
    const total4Month = [];
    try {
      for (let i = -1; i < 3; i++) {
        const month = moment().add(i, 'months').format('YYYY-MM');
        // 해당 시작일 종료일 계산하기, 시작월/종료월 인자로 전달
        const startEndofDay = startEndDay(month, month);
        total4Month.push(startEndofDay);
        const response = await api.getSalesStartEndDay(startEndofDay);
        // console.log(`response[${i}]`, response.data);
        const sum = sumSalesValueByMonth(response.data);
        // console.log(`***sum..[${i}]****`, sum);
        obj[i] = sum;
      }
    } catch (error) {
      console.log('error', error);
    }
    // console.log('obj', obj);
    setSumValue(obj);
    setTotalMonth(total4Month);
  };

  useEffect(() => {
    get4MonthSalesList();
  }, []);

  const onClick = (record) => {
    console.log('eeee', record);
  };

  return (
    <>
      {sumValue[2] ? (
        <SalesStatisticsTable
          sumValue={sumValue}
          totalMonth={totalMonth}
          onClick={onClick}
        />
      ) : (
        // <h1>테스트</h1>
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default SalesStatisticsContainer;
