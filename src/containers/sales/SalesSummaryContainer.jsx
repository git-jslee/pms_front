import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SalesSummaryTable from '../../components/sales/SalesSummaryTable';

const SalesSummaryContainer = () => {
  // sales summary 정보 가져오기
  const { summary } = useSelector(({ sales }) => ({
    summary: sales.summary,
  }));
  console.log('summary', summary);

  return (
    <>{summary ? <SalesSummaryTable summary={summary} /> : <h1>로딩중</h1>}</>
  );
};

export default SalesSummaryContainer;
