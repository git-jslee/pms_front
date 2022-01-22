import React from 'react';
import styled from 'styled-components';
import {
  Form,
  Table,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Divider,
  Row,
  Col,
  Radio,
} from 'antd';

const SalesSummaryTable = () => {
  const columns = [
    {
      title: '확률',
      width: 100,
      dataIndex: 'probibility',
      key: 'probibility',
      fixed: 'left',
    },
    {
      title: '예상매출액',
      width: 200,
      dataIndex: 'revenue',
      key: 'revenue',
      fixed: 'left',
    },
    { title: '예상매출이익', width: 200, dataIndex: 'profit', key: 'profit' },
    {
      title: '실제매출액',
      width: 200,
      dataIndex: 'actual_revenue',
      key: 'actual_revenue',
    },
    { title: '', dataIndex: 'address', key: '9999' },
  ];

  const data = [
    {
      key: '1',
      probibility: '100%',
      revenue: 10000000,
      profit: 20000000,
      actual_revenue: 30000000,
    },
    {
      key: '2',
      probibility: '90%',
      revenue: 10000000,
      profit: 20000000,
      actual_revenue: '',
    },
    {
      key: '3',
      probibility: '70%',
      revenue: 10000000,
      profit: 20000000,
      actual_revenue: '',
    },
    {
      key: '4',
      probibility: '50%',
      revenue: 10000000,
      profit: 20000000,
      actual_revenue: '',
    },
  ];

  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        scroll={{ x: 800 }}
      />
    </>
  );
};

export default SalesSummaryTable;
