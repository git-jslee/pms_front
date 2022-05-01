import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SalesStatisticsTable from '../../components/sales/SalesStatisticsTable';
import * as api from '../../lib/api/api';
import sumSalesValueByMonth from '../../modules/sales/sumSalesValueByMonth';
import moment from 'moment';
import startEndDay from '../../modules/common/startEndDay';
import { setStartEndOfMonth, setParams } from '../../modules/common';
import { getSalesQuery, getSalesList } from '../../modules/sales';
import {
  qs_salesByDate,
  qs_salesStatistics,
  qs_salesAdvanced,
} from '../../lib/api/query';

const SalesStatisticsContainer = () => {
  const dispatch = useDispatch();
  // sales summary 정보 가져오기
  const { summary } = useSelector(({ sales }) => ({
    summary: sales.summary,
  }));
  // console.log('summary', summary);
  const [sumValue, setSumValue] = useState({});
  const [totalMonth, setTotalMonth] = useState([]);

  const get4MonthSalesList = async () => {
    const obj = {};
    const total4Month = [];
    try {
      for (let i = -1; i < 3; i++) {
        const month = moment().add(i, 'months').format('YYYY-MM');
        // 해당 시작일 종료일 계산하기, 시작월/종료월 인자로 전달
        const startEndOfDay = startEndDay(month, month);
        total4Month.push(startEndOfDay);
        // const response = await api.getSalesStartEndDay(startEndOfDay);
        // const queryString = `sales_rec_date_gte=${startEndOfDay[0]}&sales_rec_date_lte=${startEndOfDay[1]}&deleted=false`;
        const query = qs_salesStatistics(startEndOfDay[0], startEndOfDay[1]);
        // console.log('--1.queryString--', query);
        const query1 = 'populate=%2A';
        const response = await api.getQueryString('api/sales-statuses', query);
        // console.log(`**2.response[${i}]`, response.data.data);
        const sum = sumSalesValueByMonth(response.data.data);
        // console.log(`***sum..[${i}]****`, sum);
        obj[i] = sum;
      }
    } catch (error) {
      console.log('error', error);
    }
    console.log('obj', obj);
    setSumValue(obj);
    setTotalMonth(total4Month);
  };

  useEffect(() => {
    get4MonthSalesList();
  }, []);

  const onClick = (record) => {
    console.log('eeee', record);
    if (!record.month) return;

    let arg = {};
    if (record.key === '99') {
      const _confirmed = true;
      arg = [
        {
          deleted: {
            $eq: false,
          },
        },
        {
          sales_recdate: {
            $gte: record.month[0],
          },
        },
        {
          sales_recdate: {
            $lte: record.month[1],
          },
        },
        {
          confirmed: {
            $eq: _confirmed,
          },
        },
      ];
    } else {
      const _confirmed = false;
      arg = [
        {
          deleted: {
            $eq: false,
          },
        },
        {
          sales_recdate: {
            $gte: record.month[0],
          },
        },
        {
          sales_recdate: {
            $lte: record.month[1],
          },
        },
        {
          confirmed: {
            $eq: _confirmed,
          },
        },
        {
          scode_probability: {
            id: {
              $eq: record.key,
            },
          },
        },
      ];
    }

    const query = qs_salesAdvanced(arg);
    dispatch(getSalesList(query));

    // let queryString = '';
    // const queryDate = `**sales_rec_date_gte=${record.month[0]}&sales_rec_date_lte=${record.month[1]}&deleted=false`;
    // if (record.key === '99') {
    //   queryString = queryDate + `&confirmed=true`;
    // } else {
    //   queryString =
    //     queryDate + `&confirmed=false&scode_probability.id=${record.key}`;
    // }
    // const queryString1 = 'populate=%2A';
    // dispatch(getSalesQuery(queryString1));
    // dispatch(setStartEndOfMonth(record.month));
    // dispatch(setParams({ type: 'scode_probability', key: record.key }));
  };
  console.log('***sum value***', sumValue);

  return (
    <>
      {sumValue[2] && totalMonth.length !== 0 ? (
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
