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

const SalesSummaryTable = ({ summary }) => {
  const _100 = summary[5] || '';
  const _90 = summary[4] || '';
  const _70 = summary[3] || '';
  const _50 = summary[2] || '';
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
    {
      title: '실제매출이액',
      width: 200,
      dataIndex: 'actual_profit',
      key: 'actual_profit',
    },
    { title: '', dataIndex: 'address', key: '9999' },
  ];

  const data = [
    // 1 -> 0%, 2 -> 50%, 3 -> 70%, 4 -> 90%, 5 -> 100%
    {
      key: '2',
      probibility: '90%',
      revenue: _90[0],
      profit: _90[1],
      actual_revenue: _100[0],
      actual_profit: _100[1],
    },
    {
      key: '3',
      probibility: '70%',
      revenue: _70[0],
      profit: _70[1],
      actual_revenue: '',
    },
    {
      key: '4',
      probibility: '50%',
      revenue: _50[0],
      profit: _50[1],
      actual_revenue: '',
    },
  ];

  return (
    <>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        // scroll={{ x: 800 }}
        size="small"
      />
    </>
  );
};

export default SalesSummaryTable;
