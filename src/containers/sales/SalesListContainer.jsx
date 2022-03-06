import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesList, getSalesParams } from '../../modules/sales';
import SalesListTable from '../../components/sales/SalesListTable';
import moment from 'moment';
import AddSalesDrawerContainer from './AddSalesDrawerContainer';
import InfoSalesDrawerForm from '../../components/sales/InfoSalesDrawerForm';
import InfoSalesDrawerContainer from './InfoSalesDrawerContainer';
import * as api from '../../lib/api/api';
import { message, Button, Space } from 'antd';

const SalesListContainer = () => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState();
  const [addSalesVisible, setAddSalesVisible] = useState(false);
  const [infoSalesVisible, setInfoSalesVisible] = useState(false);
  const [salesId, setSalesId] = useState(null);
  const [initialValues, setInitialValues] = useState();
  const [salesConfirmed, setSalesConfirmed] = useState(false);
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

  // 삭제 예정 쿼리 방식 변경..
  // useEffect(() => {
  //   if (!params) {
  //     // dispatch(getSalesList(startMonth, endMonth));
  //   } else {
  //     console.log('파라미터', params);
  //     //scode_probability.id
  //     if (params.key === '99') {
  //       const parameter = `&confirmed=true`;
  //       dispatch(getSalesParams(startMonth, endMonth, parameter));
  //     } else {
  //       const parameter = `&confirmed=false&scode_probability.id=${params.key}`;
  //       dispatch(getSalesParams(startMonth, endMonth, parameter));
  //     }
  //   }
  // }, [dispatch, startMonth, endMonth, params]);

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

    setTableData(data);
  }, [lists]);

  // 매출리스트 복사 기능
  const addSalesOnClick = async (id) => {
    console.log('항목복사', id);
    try {
      const response = await api.getSalesId(id);
      console.log('--response--', response.data);
      const sales_profits = response.data.sales_profits;
      const sales_profit = sales_profits[sales_profits.length - 1];
      const initValues = {
        customer: response.data.customer.id,
        sales_name: response.data.name,
        probability: response.data.scode_probability.id,
        division: response.data.scode_division.id,
        item: response.data.scode_item.id,
        team: response.data.scode_team.id,
        // sales_profit:
        sales: sales_profit.sales,
        sales_profit: sales_profit.sales_profit,
      };
      if (response.data.confirmed) {
        console.log('********');
        setSalesConfirmed(true);
      }
      setInitialValues(initValues);
      setAddSalesVisible(true);
    } catch (error) {
      console.error('에러', error);
      message.error('매출항목 가져오기 오류 발생');
    }
  };

  const addSalesOnClose = () => {
    setSalesConfirmed(false);
    setAddSalesVisible(false);
  };
  console.log('--1.salesConfirmed--', salesConfirmed);

  const infoSalesOnClick = (id) => {
    console.log('info on click');
    setInfoSalesVisible(true);
    setSalesId(id);
  };

  const infoSalesOnClose = () => {
    setInfoSalesVisible(false);
  };
  console.log('1.infoSalesVisible', infoSalesVisible);

  return (
    <>
      {loading === false ? (
        <SalesListTable
          tableData={tableData}
          addSalesOnClick={addSalesOnClick}
          infoSalesOnClick={infoSalesOnClick}
        />
      ) : (
        <div>로딩중</div>
      )}
      {addSalesVisible ? (
        <AddSalesDrawerContainer
          addSalesVisible={addSalesVisible}
          setAddSalesVisible={setAddSalesVisible}
          addSalesOnClose={addSalesOnClose}
          initialValues={initialValues}
          salesConfirmed={salesConfirmed}
        />
      ) : (
        ''
      )}
      {infoSalesVisible ? (
        <InfoSalesDrawerContainer
          infoSalesVisible={infoSalesVisible}
          infoSalesOnClose={infoSalesOnClose}
          salesId={salesId}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default SalesListContainer;
