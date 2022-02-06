import React, { Link, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from './Button';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { setStartEndOfMonth } from '../../modules/common';

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

const MonthlySearch = ({ name, defaultValue, onChange }) => {
  // useEffect(() => {
  //   dispatch(setStartEndOfMonth(thisMonth));
  // }, [dispatch]);

  // const onChange = (value) => {
  //   console.log('onchange', value);
  //   if (value !== null) {
  //     const month = [
  //       moment(value[0]).format('YYYY-MM'),
  //       moment(value[1]).format('YYYY-MM'),
  //     ];
  //     dispatch(setStartEndOfMonth(month));
  //   }
  // };
  return (
    <>
      <SubMenuBlock>
        <h1>{name}</h1>
        <Button to="/addproject">등록</Button>
        <div className="search">
          <span>조회</span>
          <Space direction="vertical" size={12}>
            <RangePicker
              picker="month"
              defaultValue={defaultValue}
              onChange={onChange}
            />
          </Space>
        </div>
      </SubMenuBlock>
    </>
  );
};

export default MonthlySearch;
