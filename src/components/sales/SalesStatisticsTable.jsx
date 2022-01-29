import React from 'react';
import { Table } from 'antd';
const { Column, ColumnGroup } = Table;

const SalesStatisticsTable = ({ sumValue }) => {
  // 1 -> 0%, 2 -> 50%, 3 -> 70%, 4 -> 90%, 5 -> 100%, 99 -> 확정
  // 전월
  const _999_0 = sumValue[-1][99] || '';
  // 당월
  const _50_1 = sumValue[0][2] || '';
  const _70_1 = sumValue[0][3] || '';
  const _90_1 = sumValue[0][4] || '';
  const _100_1 = sumValue[0][5] || '';
  const _999_1 = sumValue[0][99] || '';
  // 익월
  const _50_2 = sumValue[1][2] || '';
  const _70_2 = sumValue[1][3] || '';
  const _90_2 = sumValue[1][4] || '';
  const _100_2 = sumValue[1][5] || '';
  const _999_2 = sumValue[1][99] || '';
  // 익익월
  const _50_3 = sumValue[2][2] || '';
  const _70_3 = sumValue[2][3] || '';
  const _90_3 = sumValue[2][4] || '';
  const _100_3 = sumValue[2][5] || '';
  const _999_3 = sumValue[2][99] || '';

  const data = [
    // 1 -> 0%, 2 -> 50%, 3 -> 70%, 4 -> 90%, 5 -> 100%
    {
      key: '1',
      probibility: '100%',
      actual_revenue_0: _999_0[0].toLocaleString('ko-KR'),
      actual_profit_0: _999_0[1].toLocaleString('ko-KR'),
      revenue_1: _100_1[0].toLocaleString('ko-KR'),
      profit_1: _100_1[1].toLocaleString('ko-KR'),
      actual_revenue_1: _999_1[0].toLocaleString('ko-KR'),
      actual_profit_1: _999_1[1].toLocaleString('ko-KR'),
      revenue_2: (_100_2[0] + _999_2[0]).toLocaleString('ko-KR'),
      profit_2: (_100_2[1] + _999_2[1]).toLocaleString('ko-KR'),
      revenue_3: (_100_3[0] + _999_3[0]).toLocaleString('ko-KR'),
      profit_3: (_100_3[1] + _999_3[1]).toLocaleString('ko-KR'),
    },
    {
      key: '2',
      probibility: '90%',
      revenue_1: _90_1[0].toLocaleString('ko-KR'),
      profit_1: _90_1[1].toLocaleString('ko-KR'),
      revenue_2: _90_2[0].toLocaleString('ko-KR'),
      profit_2: _90_2[1].toLocaleString('ko-KR'),
      revenue_3: _90_3[0].toLocaleString('ko-KR'),
      profit_3: _90_3[1].toLocaleString('ko-KR'),
    },
    {
      key: '3',
      probibility: '70%',
      revenue_1: _70_1[0].toLocaleString('ko-KR'),
      profit_1: _70_1[1].toLocaleString('ko-KR'),
      revenue_2: _70_2[0].toLocaleString('ko-KR'),
      profit_2: _70_2[1].toLocaleString('ko-KR'),
      revenue_3: _70_3[0].toLocaleString('ko-KR'),
      profit_3: _70_3[1].toLocaleString('ko-KR'),
    },
    {
      key: '4',
      probibility: '50%',
      revenue_1: _50_1[0].toLocaleString('ko-KR'),
      profit_1: _50_1[1].toLocaleString('ko-KR'),
      revenue_2: _50_2[0].toLocaleString('ko-KR'),
      profit_2: _50_2[1].toLocaleString('ko-KR'),
      revenue_3: _50_3[0].toLocaleString('ko-KR'),
      profit_3: _50_3[1].toLocaleString('ko-KR'),
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
          width={60}
          dataIndex="probibility"
          key="probibility"
          align="right"
        />
        <ColumnGroup title="전월">
          <Column
            title="실제매출액"
            width={100}
            dataIndex="actual_revenue_0"
            key="actual_revenue_0"
            align="right"
          />
          <Column
            title="실제매출이익"
            width={100}
            dataIndex="actual_profit_0"
            key="actual_profit_0"
            align="right"
          />
        </ColumnGroup>
        <Column title="" width={50} dataIndex="temp" key="temp" />
        <ColumnGroup title="당월">
          <Column
            title="예상매출액"
            width={100}
            dataIndex="revenue_1"
            key="revenue_1"
            align="right"
          />
          <Column
            title="예상매출이익"
            width={100}
            dataIndex="profit_1"
            key="profit_1"
            align="right"
          />
          <Column
            title="실제매출액"
            width={100}
            dataIndex="actual_revenue_1"
            key="actual_revenue_1"
            align="right"
          />
          <Column
            title="실제매출이익"
            width={100}
            dataIndex="actual_profit_1"
            key="actual_profit_1"
            align="right"
          />
        </ColumnGroup>
        <Column title="" width={50} dataIndex="temp" key="temp" />
        <ColumnGroup title="익월">
          <Column
            title="예상매출액"
            width={100}
            dataIndex="revenue_2"
            key="revenue_2"
            align="right"
          />
          <Column
            title="예상매출이익"
            width={100}
            dataIndex="profit_2"
            key="profit_2"
            align="right"
          />
        </ColumnGroup>
        <Column title="" width={50} dataIndex="temp" key="temp" />
        <ColumnGroup title="익익월">
          <Column
            title="예상매출액"
            width={100}
            dataIndex="revenue_3"
            key="revenue_3"
            align="right"
          />
          <Column
            title="예상매출이익"
            width={100}
            dataIndex="profit_3"
            key="profit_3"
            align="right"
          />
        </ColumnGroup>
      </Table>
    </>
  );
};

export default SalesStatisticsTable;
