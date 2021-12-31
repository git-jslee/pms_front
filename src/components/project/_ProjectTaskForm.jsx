import React from 'react';
import { Form, InputNumber } from 'antd';

const ProjectTaskForm = ({ tasks }) => {
  console.log('>>>tasks>>', tasks);
  if (!tasks) {
    return <h1>로딩중</h1>;
  }
  const workTimeForm = tasks.map((list, index) => {
    return (
      <Form.Item label={list.name} key={index}>
        <Form.Item
          name={list.code}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="11"
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <InputNumber />
        </Form.Item>
      </Form.Item>
    );
  });

  return <>{workTimeForm}</>;
};

export default ProjectTaskForm;
