import React from 'react';
import { Table } from 'antd';
const { Column, ColumnGroup } = Table;

const SalesStatisticsTable = ({ summary }) => {
  const _100 = summary[5] || '';
  const _90 = summary[4] || '';
  const _70 = summary[3] || '';
  const _50 = summary[2] || '';
  const columns = [
    {
      title: '확률',
      width: 50,
      dataIndex: 'probibility',
      key: 'probibility',
      fixed: 'left',
    },
    {
      title: '예상매출액',
      width: 100,
      dataIndex: 'revenue_1',
      key: 'revenue_1',
      fixed: 'left',
    },
    {
      title: '예상매출이익',
      width: 100,
      dataIndex: 'profit_1',
      key: 'profit_1',
    },
    {
      title: '실제매출액',
      width: 100,
      dataIndex: 'actual_revenue_1',
      key: 'actual_revenue_1',
    },
    {
      title: '실제매출이액',
      width: 100,
      dataIndex: 'actual_profit_1',
      key: 'actual_profit_1',
    },
    {
      title: '',
      width: 50,
      dataIndex: '11',
      key: '11',
      fixed: '11',
    },
    {
      title: '예상매출액',
      width: 100,
      dataIndex: 'revenue_2',
      key: 'revenue_2',
      fixed: 'left',
    },
    {
      title: '예상매출이익',
      width: 100,
      dataIndex: 'profit_2',
      key: 'profit_2',
    },
    {
      title: '실제매출액',
      width: 100,
      dataIndex: 'actual_revenue_2',
      key: 'actual_revenue_2',
    },
    {
      title: '실제매출이액',
      width: 100,
      dataIndex: 'actual_profit_2',
      key: 'actual_profit_2',
    },
    {
      title: '',
      width: 50,
      dataIndex: '11',
      key: '11',
      fixed: '11',
    },
    {
      title: '예상매출액',
      width: 100,
      dataIndex: 'revenue_3',
      key: 'revenue_3',
      fixed: 'left',
    },
    {
      title: '예상매출이익',
      width: 100,
      dataIndex: 'profit_3',
      key: 'profit_3',
    },
    {
      title: '실제매출액',
      width: 100,
      dataIndex: 'actual_revenue_3',
      key: 'actual_revenue_3',
    },
    {
      title: '실제매출이액',
      width: 100,
      dataIndex: 'actual_profit_3',
      key: 'actual_profit_3',
    },
  ];

  const data = [
    // 1 -> 0%, 2 -> 50%, 3 -> 70%, 4 -> 90%, 5 -> 100%
    {
      key: '1',
      probibility: '100%',
      revenue_1: _100[0],
      profit_1: _100[1],
      actual_revenue_1: _100[0],
      actual_profit_1: _100[1],
    },
    {
      key: '2',
      probibility: '90%',
      revenue_1: _90[0],
      profit_1: _90[1],
    },
    {
      key: '3',
      probibility: '70%',
      revenue_1: _70[0],
      profit_1: _70[1],
    },
    {
      key: '4',
      probibility: '50%',
      revenue_1: _50[0],
      profit_1: _50[1],
    },
  ];

  return (
    <>
      <Table
        pagination={false}
        // columns={columns}
        dataSource={data}
        // scroll={{ x: 800 }}
        size="small"
      >
        <Column
          title="확률"
          width={100}
          dataIndex="probibility"
          key="probibility"
        />
        <ColumnGroup title="전월">
          <Column
            title="실제매출액"
            width={100}
            dataIndex="actual_revenue_0"
            key="actual_revenue_0"
          />
          <Column
            title="실제매출이익"
            width={100}
            dataIndex="actual_profit_0"
            key="actual_profit_0"
          />
        </ColumnGroup>
        <Column title="" width={50} dataIndex="temp" key="temp" />
        <ColumnGroup title="당월">
          <Column
            title="예상매출액"
            width={100}
            dataIndex="profit_1"
            key="profit_1"
          />
          <Column
            title="예상매출이익"
            width={100}
            dataIndex="revenue_1"
            key="revenue_1"
          />
          <Column
            title="실제매출액"
            width={100}
            dataIndex="actual_revenue_1"
            key="actual_revenue_1"
          />
          <Column
            title="실제매출이익"
            width={100}
            dataIndex="actual_profit_1"
            key="actual_profit_1"
          />
        </ColumnGroup>
        <Column title="" width={50} dataIndex="temp" key="temp" />
        <ColumnGroup title="익월">
          <Column
            title="예상매출액"
            width={100}
            dataIndex="profit_2"
            key="profit_2"
          />
          <Column
            title="예상매출이익"
            width={100}
            dataIndex="revenue_2"
            key="revenue_2"
          />
        </ColumnGroup>
        <Column title="" width={50} dataIndex="temp" key="temp" />
        <ColumnGroup title="익익월">
          <Column
            title="예상매출액"
            width={100}
            dataIndex="profit_3"
            key="profit_3"
          />
          <Column
            title="예상매출이익"
            width={100}
            dataIndex="revenue_3"
            key="revenue_3"
          />
        </ColumnGroup>
      </Table>
    </>
  );
};

export default SalesStatisticsTable;
