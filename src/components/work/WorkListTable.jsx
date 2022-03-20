import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';

const WorkListTable = ({ lists, code_tasks }) => {
  console.log('worklisttable', lists);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '고객사',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '프로젝트명',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '서비스',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'TASK',
      key: 'task',
      dataIndex: 'task',
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
      key: 'user',
      dataIndex: 'user',
    },
    {
      title: '작업일',
      key: 'workingDay',
      dataIndex: 'workingDay',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              // onClick(record.key);
            }}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  const tableData = [];
  console.log('1.code_tasks', code_tasks);
  console.log('1.lists', lists);
  const tableList = lists.map((list, index) => {
    const wlist = list.attributes;
    // console.log('2-1.list_name', list.project_task.code_task);
    // task ID 에서 code_tasks 활용하여 task name 추출
    // const taskName = code_tasks.filter(
    //   (code) => code.id === wlist.project_task.code_task,
    // );
    // console.log('taskName', taskName);

    const array = {
      key: list.id,
      id: list.id,
      customer: wlist.customer.data.attributes.name,
      projectName: wlist.project.data.attributes.name,
      // service: taskName[0].code_service.code,
      // task: taskName[0].name,
      progress: wlist.code_progress.data.code,
      user: wlist.users_permissions_user.data.attributes.username,
      workingDay: wlist.working_day,
      workingTime: wlist.working_time,
      action: 'View',
    };
    tableData.push(array);
  });

  return (
    <>
      <Table columns={columns} dataSource={tableData} />
    </>
  );
};

export default WorkListTable;
