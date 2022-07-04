import React from 'react';
import { Table, Descriptions, Badge, Space, Divider, Button } from 'antd';

const ProjectWorkListTable = ({ dataSource }) => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'TASK',
      key: 'task',
      dataIndex: 'task',
    },
    {
      title: '진행률',
      key: 'progress',
      dataIndex: 'progress',
    },
    {
      title: 'Rev',
      key: 'revision',
      dataIndex: 'revision',
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
      title: '작업자',
      key: 'worker',
      dataIndex: 'worker',
    },
    {
      title: '메 모',
      key: 'description',
      dataIndex: 'description',
    },
  ];

  return (
    <>
      <h3>work list</h3>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default ProjectWorkListTable;
