import React from 'react';
import { Table, Descriptions, Badge, Space, Divider, Button } from 'antd';

const ProjectWorkListTable = ({ tableData }) => {
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'TASK',
      key: 'task',
      dataIndex: 'task',
    },
    {
      title: '작업일',
      key: 'workingDay',
      dataIndex: 'workingDay',
    },
    {
      title: '작업시간',
      key: 'workingTime',
      dataIndex: 'workingTime',
    },
    {
      title: '진행률',
      key: 'progress',
      dataIndex: 'progress',
    },
    {
      title: '작업자',
      key: 'worker',
      dataIndex: 'worker',
    },
    {
      title: '메모',
      key: 'description',
      dataIndex: 'description',
    },
  ];

  return (
    <>
      <h3>work list</h3>
      <Table columns={columns} dataSource={tableData} />
    </>
  );
};

export default ProjectWorkListTable;
