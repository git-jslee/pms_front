import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Space } from 'antd';

const ProjectListTable = ({ lists, loading }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: '구분',
      dataIndex: 'type',
      key: 'type',
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
      title: '상태',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: '시작일',
      key: 'startdate',
      dataIndex: 'startdate',
    },
    {
      title: 'Update',
      key: 'update',
      dataIndex: 'update',
    },
    {
      title: 'time/w',
      key: 'count',
      dataIndex: 'count',
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
        </Space>
      ),
    },
  ];

  const tableData = [];
  if (!lists) {
    return <Table columns={columns} />;
  }
  const tableList = lists.map((list, index) => {
    const array = {
      key: list.id,
      no: index + 1,
      type: list.code_type.name,
      customer: list.customer.name,
      name: list.name,
      service: list.code_service.name,
      status: list.code_status.name,
      startdate: list.startDate,
      action: 'View',
    };
    tableData.push(array);
  });

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
        pagination={{ pageSize: 30 }}
      />
    </>
  );
};

export default ProjectListTable;
