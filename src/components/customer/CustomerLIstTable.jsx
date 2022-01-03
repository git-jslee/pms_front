import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Space } from 'antd';

const CustomerLIstTable = ({ lists }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '고객사ID',
      dataIndex: 'name_eng',
      key: 'name_eng',
    },
    {
      title: '고객명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              onClick(record.key);
            }}
          >
            View
          </Button>
          <Button
            onClick={() => {
              onClick(record.key);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const onClick = (id) => {
    console.log('키..', id);
    // project..view..코드 작성
    navigate(`/customers/${id}`);
  };

  const tableData = [];
  const tableList = lists.map((list) => {
    const array = {
      key: list.id,
      id: list.id,
      name_eng: list.name_eng,
      name: list.name,
      action: 'View',
    };
    tableData.push(array);
  });
  return (
    <>
      <Table columns={columns} dataSource={tableData} />
    </>
  );
};

export default CustomerLIstTable;
