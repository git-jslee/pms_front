import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag, Space, Button } from 'antd';

const SalesListTable = ({ tableData }) => {
  const navigate = useNavigate();
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
      title: '매출처',
      dataIndex: 'customer',
      key: 'custmer',
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
          <Button
            onClick={() => {
              actionOnClick(record.key);
            }}
          >
            View
          </Button>
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
      <Table columns={columns} dataSource={tableData} />
    </>
  );
};

export default SalesListTable;
