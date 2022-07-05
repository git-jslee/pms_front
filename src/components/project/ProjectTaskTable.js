import React from 'react';
import { Table, Descriptions, Badge, Space, Divider, Button } from 'antd';

const ProjectTaskTable = ({ tasks }) => {
  console.log('>>>>>>>tasks', tasks);
  const dataSource = tasks
    ? tasks.map((task, index) => {
        return {
          key: task.id,
          no: index + 1,
          task: task.attributes.code_task.cus_task
            ? task.attributes.code_task.cus_task
            : task.attributes.code_task.data.attributes.name,
          plan_day: task.attributes.plan_day,
          total_day: task.attributes.total_time
            ? (task.attributes.total_time / 8).toFixed(1)
            : 0,
          progress: task.attributes.code_progress.data
            ? task.attributes.code_progress.data.attributes.code
            : '..',
          last_workupdate: task.attributes.last_workupdate,
          revision: task.attributes.revision ? task.attributes.revision : 0,
        };
      })
    : '';
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
      key: 'plan_day',
      dataIndex: 'plan_day',
    },
    {
      title: '작업(일)',
      key: 'total_day',
      dataIndex: 'total_day',
    },
    {
      title: '진행률',
      key: 'progress',
      dataIndex: 'progress',
    },
    {
      title: '진행률',
      key: 'progress',
      dataIndex: 'progress',
    },
    {
      title: 'update(f/l)',
      key: 'last_workupdate',
      dataIndex: 'last_workupdate',
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
