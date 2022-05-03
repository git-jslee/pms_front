import React from 'react';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';

const MaintenanceListForm = ({
  list,
  loading,
  tableData,
  tblOnClick,
  totalCost,
}) => {
  const ict_in = totalCost['ict'][0];
  const ict_ex = totalCost['ict'][1];
  const con_in = totalCost['con'][0];
  const con_ex = totalCost['con'][1];
  const total_in = ict_in + con_in;
  const total_ex = ict_ex + con_ex;
  console.log('**1111**', totalCost);
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
      key: 'expense',
      dataIndex: 'expense',
      align: 'right',
    },
    {
      title: '매출',
      key: 'income',
      dataIndex: 'income',
      align: 'right',
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
        <>
          <div>
            <h1>{`매출: ${total_in.toLocaleString(
              'ko-KR',
            )} | 매입:${total_ex.toLocaleString('ko-KR')} `}</h1>
            <h2>{`ICT매출: ${ict_in.toLocaleString(
              'ko-KR',
            )} - ICT매입:${ict_ex.toLocaleString('ko-KR')} | 
            콘텐츠매출: ${con_in.toLocaleString(
              'ko-KR',
            )} - 콘텐츠매입:${con_ex.toLocaleString('ko-KR')} `}</h2>
          </div>
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
        </>
      )}
    </>
  );
};

export default MaintenanceListForm;
