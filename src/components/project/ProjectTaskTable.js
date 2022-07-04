import React from 'react';
import { Table, Descriptions, Badge, Space, Divider, Button } from 'antd';

const ProjectTaskTable = ({ dataSource }) => {
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
      title: '계획(일)',
      key: 'progress',
      dataIndex: 'progress',
    },
    {
      title: '작업(일)',
      key: 'revision',
      dataIndex: 'revision',
    },
    {
      title: '진행률',
      key: 'workingDay',
      dataIndex: 'workingDay',
    },
    {
      title: '진행률',
      key: 'workingDay',
      dataIndex: 'workingDay',
    },
    {
      title: 'update(f/l)',
      key: 'worker',
      dataIndex: 'worker',
    },
    {
      title: 'Rev',
      key: 'revision',
      dataIndex: 'revision',
    },
  ];

  return (
    <>
      <h3>task</h3>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default ProjectTaskTable;
