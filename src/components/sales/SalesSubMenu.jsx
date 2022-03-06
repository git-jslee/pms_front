import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
// import Button from '../common/Button';
import { Button, Space, DatePicker } from 'antd';
import moment from 'moment';
// import { setStartEndOfMonth } from '../../modules/sales';
import { setStartEndOfMonth, setParams } from '../../modules/common';
import startEndDay from '../../modules/common/startEndDay';
import AutoComplete from '../common/AutoComplete';
import { getSalesQuery, getSalesList } from '../../modules/sales';
import { RedoOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const SubMenuBlock = styled.div`
  /* position: relative; */
  display: inline;
  /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  margin-top: 10px;
  padding: 2rem;
  width: 1400px;
  height: 100%;
  background: white;
  border-radius: 2px; */
  h1 {
    /* position: relative; */
  }
  .search {
    margin-left: 20px;
    display: inline;
  }
`;

const SalesSubMenu = ({
  startMonth,
  endMonth,
  searchOnClick,
  advancedSearch,
  buttonName,
  addSalesOnClick,
}) => {
  const dispatch = useDispatch();
  // 검색조건 당월
  // const startMonth = moment().add(0, 'months').format('YYYY-MM');
  // const startMonth = moment().format('YYYY-MM');
  // const endMonth = moment().format('YYYY-MM');
  const dateFormat = 'YYYY-MM';
  // const month = moment().format('MM');

  // useEffect(() => {
  //   const startEndOfDay = startEndDay(startMonth, endMonth);
  //   dispatch(setStartEndOfMonth(startEndOfDay));
  // }, [dispatch]);

  // 컴포넌트 언마운트시
  // useEffect(() => {
  //   return () => {
  //     dispatch(setParams(null));
  //   };
  // }, []);

  const onChange = (value) => {
    console.log('onchange', value);
    if (value !== null) {
      dispatch(getSalesList(value[0], value[1]));
    }
  };

  const buttonOnClick = () => {
    // console.log('조회 buttononclick');
    // const startEndOfDay = startEndDay(
    //   moment().format('YYYY-MM'),
    //   moment().format('YYYY-MM'),
    // );
    // const queryString = `sales_rec_date_gte=${startEndOfDay[0]}&sales_rec_date_lte=${startEndOfDay[1]}&deleted=false`;
    // dispatch(setStartEndOfMonth(startEndOfDay));
    // dispatch(setParams(null));
    // dispatch(getSalesQuery(queryString));
    dispatch(
      getSalesList(moment().format('YYYY-MM'), moment().format('YYYY-MM')),
    );
  };

  return (
    <>
      <SubMenuBlock>
        <Link to="/addsales">
          <Button>등록</Button>
        </Link>
        {/* <Button onClick={addSalesOnClick}>매출등록</Button> */}
        {/* <Button onClick={searchOnClick}>상세검색1</Button> */}
        <Button onClick={advancedSearch}>{buttonName}</Button>
        <div className="search">
          {/* <span>기준일자</span>
          <Space direction="vertical" size={12}>
            <RangePicker
              picker="month"
              defaultValue={[
                moment(startMonth, dateFormat),
                moment(endMonth, dateFormat),
              ]}
              onChange={onChange}
            />
          </Space> */}
          {/* <Button onClick={buttonOnClick}>{month}월 조회</Button> */}
          <RedoOutlined
            onClick={buttonOnClick}
            style={{ fontSize: '24px', color: '#08c', marginLeft: '10px' }}
          />
        </div>
      </SubMenuBlock>
    </>
  );
};

export default SalesSubMenu;
