import React from 'react';
import { Table, Descriptions, Badge, Space, Divider, Button } from 'antd';

const ProjectTaskTableEdit = ({ tasks }) => {
  console.log('>>>>>>>tasks', tasks);
  const dataSource = tasks
    ? tasks.map((task, index) => {
        return {
          key: task.id,
          task: task.attributes.cus_task
            ? task.attributes.cus_task
            : task.attributes.code_task.data.attributes.name,
          manpower: task.attributes.manpower,
          plan_day: task.attributes.plan_day,
          man_plan: (
            task.attributes.manpower * task.attributes.plan_day
          ).toFixed(1),
          total_day: task.attributes.total_time
            ? (
                (task.attributes.total_time + task.attributes.other_totaltime) /
                8
              ).toFixed(1)
            : 0,
          last_workupdate: task.attributes.last_workupdate,
          plan_startdate: task.attributes.plan_startdate,
          startdate: task.attributes.startdate,
        };
      })
    : '';
  const columns = [
    {
      title: '',
      dataIndex: 'no',
      key: 'no',
      render:(taxt) => <a>edit</a>
    },
    {
      title: 'TASK',
      key: 'task',
      dataIndex: 'task',
    },
    {
      title: '계획_시작일',
      key: 'plan_startdate',
      dataIndex: 'plan_startdate',
    },
    {
      title: '인원',
      key: 'manpower',
      dataIndex: 'manpower',
    },
    {
      title: '계획',
      key: 'plan_day',
      dataIndex: 'plan_day',
    },
    {
      title: 'total',
      key: 'man_plan',
      dataIndex: 'man_plan',
    },
    {
      title: 'sort',
      key: 'sort',
      dataIndex: 'sort',
    },

  ];

  return (
    <>
      <Button>추가</Button>
      <Table columns={columns} dataSource={dataSource} size='small' />
    </>
  );
};

export default ProjectTaskTableEdit;
