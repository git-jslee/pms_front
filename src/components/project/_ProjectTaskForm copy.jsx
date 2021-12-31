import React from 'react';
import { Form, InputNumber } from 'antd';

const ProjectTaskForm = ({ tasks }) => {
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

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        // initialValues={  }
      >
        {workTimeForm}
      </Form>
    </>
  );
};

export default ProjectTaskForm;
