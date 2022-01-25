import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesList } from '../../modules/sales';
import SalesListTable from '../../components/sales/SalesListTable';
import { setSummary } from '../../modules/sales';

const SalesListContainer = () => {
  const dispatch = useDispatch();
  const [salesSummary, setSalesSummary] = useState({});
  const [tableData, setTableData] = useState();
  const { lists, loading } = useSelector(({ sales, loading }) => ({
    lists: sales.data,
    loading: loading['sales/GET_SALESLIST'],
  }));

  console.log('saleslist', lists);

  useEffect(() => {
    dispatch(getSalesList());
    // getProjectList();
  }, [dispatch]);

  // table data
  console.log('lists', lists);

  useEffect(() => {
    console.log('---useEffect 실행---');
    if (!lists) {
      console.log('리턴실행..');
      return;
    }
    const salesProfitData = [];
    const summaryData = {};
    const data = lists.map((list, index) => {
      // 매출, 매출이익, 마진 정보 가져오기, 가장 최근 입력 데이터 가져옴
      const sales_profit = list.sales_profits[list.sales_profits.length - 1];
      salesProfitData.push(sales_profit);
      const array = {
        key: list.id,
        no: index + 1,
        probability: sales_profit.scode_probability,
        customer: list.customer.name,
        name: list.name,
        division: list.scode_division.name,
        item: list.scode_item.name,
        team: list.scode_team.name,
        type: sales_profit.type,
        sales: sales_profit.sales,
        profit: sales_profit.sales_profit,
        margin: sales_profit.profit_margin,
      };
      return array;
    });

    const arrData = salesProfitData.map((value) => {
      console.log('summaryDataValue', summaryData[value.scode_probability]);
      // 값이 없을경우 생성
      if (summaryData[value.scode_probability] === undefined) {
        summaryData[value.scode_probability] = [
          value.sales,
          value.sales_profit,
        ];
      } else {
        // 값이 있을경우 기존 값에 추가
        console.log(
          '%%계산',
          summaryData[value.scode_probability][1],
          value.sales_profit,
        );
        summaryData[value.scode_probability] = [
          summaryData[value.scode_probability][0] + value.sales,
          summaryData[value.scode_probability][1] + value.sales_profit,
        ];
      }
    });

    setSalesSummary(summaryData);
    setTableData(data);
  }, [lists]);

  useEffect(() => {
    dispatch(setSummary(salesSummary));
  }, [salesSummary]);

  console.log('salesSummary', salesSummary);
  return (
    <>
      {loading === false ? (
        <SalesListTable tableData={tableData} />
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
};

export default SalesListContainer;
