import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesList } from '../../modules/sales';
import SalesListTable from '../../components/sales/SalesListTable';
// import { setSummary } from '../../modules/sales';
// import sumSalesValueByMonth from '../../modules/sales/sumSalesValueByMonth';

const SalesListContainer = () => {
  const dispatch = useDispatch();
  // const [salesSummary, setSalesSummary] = useState({});
  const [tableData, setTableData] = useState();
  const { lists, loading } = useSelector(({ sales, loading }) => ({
    lists: sales.data,
    loading: loading['sales/GET_SALESLIST'],
  }));

  console.log('saleslist', lists);

  useEffect(() => {
    dispatch(getSalesList());
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
    // const summaryData = {};
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
        confirmed: sales_profit.confirmed ? 'Yes' : 'No',
        sales: sales_profit.sales,
        profit: sales_profit.sales_profit,
        margin: sales_profit.profit_margin,
        sales_rec_date: sales_profit.sales_rec_date,
      };
      return array;
    });

    // 예상매출, 예상매출이익, 실제매출액, 실제매출이익 합계산
    // SalesStatisticsConatainer 로 이동..
    // const summaryData = sumSalesValueByMonth(salesProfitData);
    // console.log('sumSalesByMonth', summaryData);
    // setSalesSummary(summaryData);
    setTableData(data);
  }, [lists]);

  // 예상매출, 예상매출이익, 실제매출액, 실제매출이익 합계산
  // SalesStatisticsConatainer 로 이동..
  // useEffect(() => {
  //   dispatch(setSummary(salesSummary));
  // }, [salesSummary]);

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
