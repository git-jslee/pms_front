import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';

const WorkListTable = ({ lists, code_tasks, drawerOnClick }) => {
  console.log('=====worklisttable======', lists);
  const columns = [
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
      title: '건 명',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '서비스/지원종류',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'TASK/내용',
      key: 'task',
      dataIndex: 'task',
    },
    {
      title: 'Rev',
      key: 'revision',
      dataIndex: 'revision',
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
      title: '작업시간',
      key: 'workingTime',
      dataIndex: 'workingTime',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              drawerOnClick(text);
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
  console.log('^^^^^^1.lists^^^^^^^', lists);
  const tableList = lists.map((list, index) => {
    const wlist = list.attributes;
    // console.log('2-1.list_name', list.project_task.code_task);
    // task ID 에서 code_tasks 활용하여 task name 추출
    // const taskName = code_tasks.filter(
    //   (code) => code.id === wlist.project_task.code_task,
    // );
    // console.log('====key 확인====', 'project' in wlist);
    if ('project' in wlist) {
      console.log('****실행 project *****', wlist.project_task);
      const array = {
        key: list.id,
        type: '프로젝트',
        customer: wlist.customer.data.attributes.name,
        title: wlist.project.data.attributes.name,
        service:
          wlist.project.data.attributes.code_service.data.attributes.name,
        task: wlist.project_task.data.attributes.code_task.data.attributes.name,
        progress: wlist.code_progress.data.code,
        revision: wlist.revision ? wlist.revision : 0,
        user: wlist.users_permissions_user.data.attributes.username,
        workingDay: wlist.working_day,
        workingTime: wlist.working_time,
        action: 'View',
      };
      tableData.push(array);
    } else if ('maintenance' in wlist) {
      // console.log('****실행 maintenance *****');
      const array = {
        key: list.id,
        type: '유지보수',
        customer: wlist.customer.data.attributes.name,
        title: wlist.maintenance.data.attributes.title,
        service: wlist.code_ma_support.data.attributes.name,
        task: wlist.title,
        user: wlist.users_permissions_user.data.attributes.username,
        workingDay: wlist.working_day,
        workingTime: wlist.working_time,
        action: 'View',
      };
      tableData.push(array);
    }
    // tableData 오름차순 정렬기능 추가..
    //
  });
  console.log('**** table data****', tableData);

  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 9 }}
      />
    </>
  );
};

export default WorkListTable;
