import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Layout, Form, Button, Col, Row, DatePicker, Space } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Header, Footer, Sider, Content } = Layout;

const FormBlock = styled.div`
  /* position: relative; */
  /* display: inline; */
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

const SubWorkStatistics = ({
  worktime,
  subWorkStatisticsOnSubmit,
  start,
  end,
}) => {
  const [form] = Form.useForm();
  // 임시추가
  // const start = moment().subtract(7, 'days').format('YYYY-MM-DD');
  // const end = moment().format('YYYY-MM-DD');

  const onReset = () => {
    form.resetFields();
  };

  return (
    <FormBlock>
      {/* <Layout>
        <Content> */}
      <div>
        통계기준일자 : {start} ~ {end}
      </div>
      <ul>
        {worktime.map((list, index) => {
          return (
            <li key={index}>
              {list.name} : {list.worktime}시간 / {list.worktime / 8}일
            </li>
          );
        })}
      </ul>
      {/* </Content>
      </Layout> */}
    </FormBlock>
  );
};

export default SubWorkStatistics;
