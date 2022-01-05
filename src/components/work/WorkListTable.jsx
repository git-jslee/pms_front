import React, { useState } from 'react';
import {
  Form,
  Input,
  Table,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Divider,
  message,
  Space,
} from 'antd';

const WorkListTable = ({ lists }) => {
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
      title: '계획시간',
      key: 'planTime',
      dataIndex: 'planTime',
    },
    {
      title: '누적시간',
      key: 'cumulativeTime',
      dataIndex: 'cumulativeTime',
    },
    {
      title: '작업시간',
      key: 'workingTime',
      dataIndex: 'workingTime',
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
  const tableList = lists.map((list, index) => {
    const array = {
      key: list.id,
      id: list.id,
      customer: list.customer.name,
      projectName: list.project.name,
      service: '',
      task: '',
      user: list.user_info.name,
      workingDay: list.workingDay,
      workingTime: lists.workingTime,
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
