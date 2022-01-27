import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SalesStatisticsTable from '../../components/sales/SalesStatisticsTable';

const SalesStatisticsContainer = () => {
  // sales summary 정보 가져오기
  const { summary } = useSelector(({ sales }) => ({
    summary: sales.summary,
  }));
  console.log('summary', summary);

  return (
    <>
      {summary ? <SalesStatisticsTable summary={summary} /> : <h1>로딩중</h1>}
    </>
  );
};

export default SalesStatisticsContainer;
