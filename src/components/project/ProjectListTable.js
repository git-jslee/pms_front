import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Space, Spin } from 'antd';

const ProjectListTable = ({ tableData, loading }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: '계약',
      dataIndex: 'contracted',
      key: 'contracted',
    },
    {
      title: '고객사',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '프로젝트명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '서비스',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: '사업부',
      key: 'team',
      dataIndex: 'team',
      align: 'center',
    },
    {
      title: '상태',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: '시작일',
      key: 'startdate',
      dataIndex: 'startdate',
      align: 'right',
    },
    {
      title: '경과일',
      key: 'elapsed',
      dataIndex: 'elapsed',
      align: 'right',
      sorter: (a, b) => a.elapsed - b.elapsed,
    },
    {
      title: '최근작업일',
      key: 'lastUpdate',
      dataIndex: 'lastUpdate',
      align: 'center',
    },
    {
      title: '경과일',
      key: 'elapsed_last',
      dataIndex: 'elapsed_last',
      align: 'right',
      sorter: (a, b) => a.elapsed_last - b.elapsed_last,
    },
    {
      title: '투입일',
      key: 'totalday',
      dataIndex: 'totalday',
      align: 'center',
      sorter: (a, b) => a.totalday - b.totalday,
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   align: 'center',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button
    //         onClick={() => {
    //           onClick(record.key);
    //         }}
    //       >
    //         View
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  const onClick = (id) => {
    console.log('키..', id);
    // project..view..코드 작성
    navigate(`/project/${id}`);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 20 }}
      />
      {loading ? <Spin tip="Loading..." /> : ''}
    </>
  );
};

export default ProjectListTable;
