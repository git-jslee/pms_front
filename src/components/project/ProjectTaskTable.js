import React from 'react';
import { Table, Descriptions, Badge, Space, Divider, Button } from 'antd';

const ProjectTaskTable = ({ tasks }) => {
  console.log('>>>>>>>tasks', tasks);
  const dataSource = tasks
    ? tasks.map((task, index) => {
        return {
          key: task.id,
          no: index + 1,
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
          progress: task.attributes.code_progress.data
            ? task.attributes.code_progress.data.attributes.code
            : '..',
          last_workupdate: task.attributes.last_workupdate,
          revision: task.attributes.revision ? task.attributes.revision : 0,
          plan_startdate: task.attributes.plan_startdate,
          startdate: task.attributes.startdate,
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
      title: '계획_시작일',
      key: 'plan_startdate',
      dataIndex: 'plan_startdate',
    },
    {
      title: 'start date',
      key: 'startdate',
      dataIndex: 'startdate',
    },
    {
      title: 'update',
      key: 'last_workupdate',
      dataIndex: 'last_workupdate',
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
      title: '실행',
      key: 'total_day',
      dataIndex: 'total_day',
    },
    // 2가지 type. 계획대비 작업..work progress
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
  ];

  return (
    <>
      <h3>task</h3>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default ProjectTaskTable;
