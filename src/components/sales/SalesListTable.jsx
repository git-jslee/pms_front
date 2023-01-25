import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';
import {
  InfoCircleOutlined,
  CopyOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const Base = styled.div`
  width: 100%;
`;

const SalesListTable = ({ tableData, addSalesOnClick, infoSalesOnClick }) => {
  const navigate = useNavigate();
  console.log('>>>>>>>table..data>>>>>>', tableData)

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
    },
    {
      title: '확정여부',
      key: 'confirmed',
      dataIndex: 'confirmed',
      align: 'center',
    },
    {
      title: '매출확률',
      dataIndex: 'probability',
      key: 'probability',
      align: 'center',
    },
    {
      title: '고객사',
      dataIndex: 'customer',
      key: 'custmer',
    },
    {
      title: '매출처',
      dataIndex: 'sales_customer',
      key: 'sales_custmer',
    },
    {
      title: '건명',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '매출구분',
      key: 'division',
      dataIndex: 'division',
    },
    {
      title: '매출품목',
      key: 'item',
      dataIndex: 'item',
    },
    {
      title: '사업부',
      key: 'team',
      dataIndex: 'team',
      align: 'center',
    },
    {
      title: '매출',
      key: 'sales',
      dataIndex: 'sales',
      align: 'right',
    },
    {
      title: '매출이익',
      key: 'profit',
      dataIndex: 'profit',
      align: 'right',
    },
    // {
    //   title: '마진',
    //   key: 'margin',
    //   dataIndex: 'margin',
    //   align: 'right',
    // },
    {
      title: '매출인식일',
      key: 'sales_rec_date',
      dataIndex: 'sales_rec_date',
    },
    {
      title: 'ACTION',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          {/* <InfoCircleOutlined
            onClick={() => {
              actionOnClick(record.key);
            }}
            style={{ fontSize: '20px' }}
          /> */}
          <MenuFoldOutlined
            onClick={() => {
              infoSalesOnClick(record.key);
            }}
            style={{ fontSize: '20px' }}
          />
          <Popconfirm
            title="매출항목 복사"
            onConfirm={() => {
              addSalesOnClick(text.key);
            }}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <CopyOutlined style={{ fontSize: '20px' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const actionOnClick = (id) => {
    console.log('키..', id);
    // project..view..코드 작성
    navigate(`/sales/${id}`);
  };

  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  // ];

  return (
    <>
      <Base>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 20 }}
        />
      </Base>
    </>
  );
};

export default SalesListTable;
