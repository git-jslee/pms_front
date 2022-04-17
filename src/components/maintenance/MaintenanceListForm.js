import React from 'react';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';

const MaintenanceListForm = ({ list, loading, tableData, tblOnClick }) => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
    },
    {
      title: '계약',
      key: 'contracted',
      dataIndex: 'contracted',
      align: 'center',
    },
    {
      title: '고객사',
      key: 'customer',
      dataIndex: 'customer',
      align: 'center',
    },
    {
      title: '품 목',
      dataIndex: 'scode_item',
      key: 'scode_item',
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '사업부',
      key: 'scode_team',
      dataIndex: 'scode_team',
      align: 'center',
    },
    {
      title: '매입',
      key: 'cost',
      dataIndex: 'cost',
      align: 'center',
    },
    {
      title: '매출',
      key: 'cost',
      dataIndex: 'cost',
      align: 'center',
    },
    {
      title: '비고',
      key: 'description',
      dataIndex: 'description',
      align: 'right',
    },
    // {
    //   title: 'ACTION',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Space size="small">
    //       <InfoCircleOutlined
    //         onClick={() => {
    //           actionOnClick(record.key);
    //         }}
    //         style={{ fontSize: '20px' }}
    //       />
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      {loading ? (
        <>
          <Table columns={columns} pagination={{ pageSize: 20 }} />
          <h1>로딩중</h1>
        </>
      ) : (
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{ pageSize: 20 }}
          // table OnClick 이벤트 처리
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                tblOnClick(record);
              },
            };
          }}
        />
      )}
    </>
  );
};

export default MaintenanceListForm;
