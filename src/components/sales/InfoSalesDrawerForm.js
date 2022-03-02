import React, { useState } from 'react';
import {
  Table,
  Descriptions,
  Badge,
  Space,
  Divider,
  Button,
  Col,
  Row,
  Radio,
  Popconfirm,
  Drawer,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

// import Button from '../common/Button';

const InfoSalesDrawerForm = ({
  list,
  tableData,
  editButtonOnClick,
  editRadioOnChange,
  editRadioValue,
  updateForm,
  editmode,
  onClickBack,
  showDeleteConfirm,
  infoSalesVisible,
  infoSalesOnClose,
}) => {
  const [toggle, setToggle] = useState(true);
  const [value, setValue] = useState(1);
  const sales_profits = list.sales_profits;
  const sales_profit = sales_profits[sales_profits.length - 1];
  console.log('sales_pofir_length', sales_profit);
  console.log('3.infoSalesVisible', infoSalesVisible);

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
      title: '마진(%)',
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

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <Drawer
        title="매출 항목 상세 보기"
        width={1100}
        onClose={infoSalesOnClose}
        visible={infoSalesVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClose={infoSalesOnClose}>Cancel</Button>
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
          </Space>
        }
      >
        <Row>
          <Col>
            {/* <Button onClick={editButtonOnClick}>{modename}</Button> */}
            <Button
              // type="primary"
              type={editmode ? 'primary' : ''}
              onClick={editButtonOnClick}
              // style={{ marginTop: 16 }}
            >
              EDIT
            </Button>
          </Col>
          <Col offset={1}>
            <Button onClick={showDeleteConfirm} type="dashed">
              Delete
            </Button>
          </Col>
        </Row>
        <Row>
          <Radio.Group onChange={editRadioOnChange} value={editRadioValue}>
            <Radio value={1} defaultChecked={true} disabled={!editmode}>
              매출 수정
            </Radio>
            <Radio value={2} disabled={!editmode}>
              기본정보 수정
            </Radio>
          </Radio.Group>
        </Row>
        <Descriptions title="." bordered>
          <Descriptions.Item label="매출확률">
            {sales_profit.scode_probability}
          </Descriptions.Item>
          <Descriptions.Item label="매출처">
            {list.customer.name}
          </Descriptions.Item>
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
          <Descriptions.Item label="매출품목">
            {list.scode_item.name}
          </Descriptions.Item>
          <Descriptions.Item label="사업부">
            {list.scode_team.name}
          </Descriptions.Item>
          <Descriptions.Item label="매 출">
            {sales_profit.sales.toLocaleString('ko-KR')}
          </Descriptions.Item>
          <Descriptions.Item label="매출이익">
            {sales_profit.sales_profit.toLocaleString('ko-KR')}
          </Descriptions.Item>
          <Descriptions.Item label="마진(%)">
            {sales_profit.profit_margin}
          </Descriptions.Item>
          {/* edit 모드일때 discription 안보이게 */}
          {!editmode ? (
            <Descriptions.Item label="비 고">
              {list.description}
            </Descriptions.Item>
          ) : (
            ''
          )}
        </Descriptions>
        {editmode ? (
          updateForm
        ) : (
          <>
            <Divider />
            <Table columns={columns} dataSource={tableData} />
          </>
        )}
      </Drawer>
    </>
  );
};

export default InfoSalesDrawerForm;
