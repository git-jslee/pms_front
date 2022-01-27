import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesId } from '../../modules/sales';
import SalesViewDetailTable from '../../components/sales/SalesViewDetailTable';

const SalesViewContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [tableData, setTableData] = useState();
  const { list, loading } = useSelector(({ sales, loading }) => ({
    list: sales.detail,
    loading: loading['sales/GET_SALESID'],
  }));

  console.log('salesid', list);

  useEffect(() => {
    dispatch(getSalesId(id));
  }, [dispatch]);

  useEffect(() => {
    console.log('---useEffect 실행---');

    if (!list) {
      console.log('리턴실행..');
      return;
    }
    const sales_profits = list.sales_profits;
    const salesProfitData = [];
    const summaryData = {};
    const data = sales_profits.map((list, index) => {
      // 매출, 매출이익, 마진 정보 가져오기, 가장 최근 입력 데이터 가져옴
      const array = {
        key: list.id,
        no: index + 1,
        probability: list.scode_probability,
        // type: list.type,
        confirmed: list.confirmed ? 'YES' : 'NO',
        sales: list.sales,
        profit: list.sales_profit,
        margin: list.profit_margin,
        sales_rec_date: list.sales_rec_date,
        payment_date: list.payment_date,
        description: list.description,
      };
      return array;
    });
    setTableData(data);
  }, [list]);

  return (
    <>
      {list ? (
        <SalesViewDetailTable list={list} tableData={tableData} />
      ) : (
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default SalesViewContainer;
