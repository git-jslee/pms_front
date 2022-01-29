import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SalesStatisticsTable from '../../components/sales/SalesStatisticsTable';
import * as api from '../../lib/api/api';
import sumSalesValueByMonth from '../../modules/sales/sumSalesValueByMonth';
import moment from 'moment';

const SalesStatisticsContainer = () => {
  // sales summary 정보 가져오기
  const { summary } = useSelector(({ sales }) => ({
    summary: sales.summary,
  }));
  console.log('summary', summary);
  const [sumValue, setSumValue] = useState({});

  const get4MonthSalesList = async () => {
    const obj = {};
    try {
      for (let i = -1; i < 3; i++) {
        const thisMonth = moment().add(i, 'months').format('YYYY-MM');
        const startOfMonth = moment(thisMonth)
          .startOf('month')
          .format('YYYY-MM-DD');
        const endOfMonth = moment(thisMonth)
          .endOf('month')
          .format('YYYY-MM-DD');
        console.log('month', startOfMonth, endOfMonth);
        const response = await api.getSalesFiltered(startOfMonth, endOfMonth);
        console.log(`response[${i}]`, response.data);
        const sum = sumSalesValueByMonth(response.data);
        obj[i] = sum;
      }

      // console.log('response1', response1);
      // const cal1 = sumSalesValueByMonth(response1.data);
      // console.log('cal1', cal1);
      // setSum1(cal1);
    } catch (error) {
      console.log('error', error);
    }
    console.log('obj', obj);
    setSumValue(obj);
  };

  useEffect(() => {
    get4MonthSalesList();
  }, []);

  return (
    <>
      {sumValue[2] ? (
        <SalesStatisticsTable sumValue={sumValue} />
      ) : (
        // <h1>테스트</h1>
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default SalesStatisticsContainer;
