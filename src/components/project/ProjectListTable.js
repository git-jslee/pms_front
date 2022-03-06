import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Space, Spin } from 'antd';

const ProjectListTable = ({ tableData, loading }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    // {
    //   title: '구분',
    //   dataIndex: 'type',
    //   key: 'type',
    // },
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
      key: 'duration',
      dataIndex: 'duration',
      align: 'right',
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: 'date',
      key: 'update',
      dataIndex: 'update',
    },
    {
      title: '작업시간/주간',
      key: 'count',
      dataIndex: 'count',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              onClick(record.key);
            }}
          >
            View
          </Button>
        </Space>
      ),
    },
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
