import React from 'react';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';

const MaintenanceListForm = () => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
    },
    {
      title: '고객사',
      key: 'confirmed',
      dataIndex: 'confirmed',
      align: 'center',
    },
    {
      title: '품 목',
      dataIndex: 'probability',
      key: 'probability',
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'customer',
      key: 'custmer',
    },
    {
      title: '사업부',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '계약',
      key: 'item',
      dataIndex: 'item',
    },
    {
      title: '매입',
      key: 'team',
      dataIndex: 'team',
      align: 'center',
    },
    {
      title: '매출',
      key: 'team',
      dataIndex: 'team',
      align: 'center',
    },
    {
      title: '비고',
      key: 'sales',
      dataIndex: 'sales',
      align: 'right',
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
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        // dataSource={tableData}
        pagination={{ pageSize: 20 }}
      />
    </>
  );
};

export default MaintenanceListForm;
