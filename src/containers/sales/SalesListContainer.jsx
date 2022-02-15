import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesList, getSalesParams } from '../../modules/sales';
import SalesListTable from '../../components/sales/SalesListTable';
import moment from 'moment';
// import { setSummary } from '../../modules/sales';
// import sumSalesValueByMonth from '../../modules/sales/sumSalesValueByMonth';

const SalesListContainer = () => {
  const dispatch = useDispatch();
  // const [salesSummary, setSalesSummary] = useState({});
  const [tableData, setTableData] = useState();
  const { startMonth, endMonth, lists, loading, params } = useSelector(
    ({ common, sales, loading }) => ({
      startMonth: common.month[0],
      endMonth: common.month[1],
      params: common.params,
      lists: sales.data,
      loading: loading['sales/GET_SALESLIST'],
    }),
  );

  console.log('saleslist', lists);

  useEffect(() => {
    // const startMonth = moment().add(0, 'months').format('YYYY-MM');
    // const endMonth = moment().add(0, 'months').format('YYYY-MM');
    // const startOfMonth = moment(startMonth)
    //   .startOf('month')
    //   .format('YYYY-MM-DD');
    // const endOfMonth = moment(endMonth).endOf('month').format('YYYY-MM-DD');
    // console.log('month', startOfMonth, endOfMonth);
    if (!params) {
      dispatch(getSalesList(startMonth, endMonth));
    } else {
      console.log('파라미터', params);
      //scode_probability.id
      if (params.key === '99') {
        const parameter = `confirmed=true`;
        dispatch(getSalesParams(startMonth, endMonth, parameter));
      } else {
        const parameter = `confirmed=false&scode_probability.id=${params.key}`;
        dispatch(getSalesParams(startMonth, endMonth, parameter));
      }
    }
  }, [dispatch, startMonth, endMonth, params]);

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
      // 매출확률 %로 변환
      const probability = ['0%', '50%', '70%', '90%', '100%'];
      const scode_probability = parseInt(sales_profit.scode_probability);
      const array = {
        key: list.id,
        no: index + 1,
        // probability: sales_profit.scode_probability,
        probability: probability[scode_probability - 1],
        customer: list.customer.name,
        name: list.name,
        division: list.scode_division.name,
        item: list.scode_item.name,
        team: list.scode_team.name,
        confirmed: sales_profit.confirmed ? 'Yes' : 'No',
        sales: sales_profit.sales.toLocaleString('ko-KR'),
        profit: sales_profit.sales_profit.toLocaleString('ko-KR'),
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
