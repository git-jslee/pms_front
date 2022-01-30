import React from 'react';
import { Table, Descriptions, Badge, Space, Divider, Button } from 'antd';
// import Button from '../common/Button';

const SalesViewDetailTable = ({
  list,
  tableData,
  buttonOnClick,
  updateForm,
  mode,
}) => {
  const sales_profits = list.sales_profits;
  const sales_profit = sales_profits[sales_profits.length - 1];
  const modename = mode === 'VIEW' ? 'EDIT' : 'VIEW';
  console.log('sales_pofir_length', sales_profit);
  console.log('tabledata', tableData);
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: '확률',
      key: 'probability',
      dataIndex: 'probability',
    },
    {
      title: '확정여부',
      key: 'confirmed',
      dataIndex: 'confirmed',
    },
    {
      title: '매출',
      key: 'sales',
      dataIndex: 'sales',
    },
    {
      title: '매출이익',
      key: 'profit',
      dataIndex: 'profit',
    },
    {
      title: '마진',
      key: 'margin',
      dataIndex: 'margin',
    },
    {
      title: '매출인식일',
      key: 'sales_rec_date',
      dataIndex: 'sales_rec_date',
    },
    {
      title: '결제일자',
      key: 'payment_date',
      dataIndex: 'payment_date',
    },
    {
      title: '메모',
      key: 'description',
      dataIndex: 'description',
    },
  ];
  console.log('******', list.name);

  return (
    <>
      <Button onClick={buttonOnClick}>{modename}</Button>
      <Descriptions title="Sales View" bordered>
        <Descriptions.Item label="매출확률">
          {sales_profit.scode_probability}
        </Descriptions.Item>
        <Descriptions.Item label="매출처">{list.name}</Descriptions.Item>
        <Descriptions.Item label="매출확정여부">
          {sales_profit.confirmed ? 'Yes' : 'No'}
        </Descriptions.Item>
        <Descriptions.Item label="건 명" span={2}>
          {list.name}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="매출구분">
          {list.scode_division.name}
        </Descriptions.Item>
        <Descriptions.Item label="매풀품목">
          {list.scode_item.name}
        </Descriptions.Item>
        <Descriptions.Item label="사업부">
          {list.scode_division.name}
        </Descriptions.Item>
        <Descriptions.Item label="매 출">
          {sales_profit.sales}
        </Descriptions.Item>
        <Descriptions.Item label="매출이익">
          {sales_profit.sales_profit}
        </Descriptions.Item>
        <Descriptions.Item label="마 진">
          {sales_profit.profit_margin}
        </Descriptions.Item>
        {/* edit 모드일때 discription 안보이게 */}
        {mode === 'VIEW' ? (
          <Descriptions.Item label="비 고">
            {list.description}
          </Descriptions.Item>
        ) : (
          ''
        )}
      </Descriptions>
      {updateForm}
      <Divider />
      <Table columns={columns} dataSource={tableData} />
    </>
  );
};

export default SalesViewDetailTable;
