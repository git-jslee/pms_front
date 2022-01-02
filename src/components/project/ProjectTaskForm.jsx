import React from 'react';
import { Form, InputNumber } from 'antd';

const ProjectTaskForm = ({
  code_tasks,
  service_id,
  projectTaskInfo,
  editdisabled,
}) => {
  // const taskMap = code_tasks.filter((v) => v.code_service.id === service_id);
  // console.log('>>>service_id>>', service_id);

  const workTimeForm = projectTaskInfo.map((list, index) => {
    return (
      <Form.Item label={list.code_task.name} key={list.id}>
        <Form.Item
          name={list.code_task.code}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <InputNumber disabled={editdisabled} />
        </Form.Item>
        <Form.Item
          name="11"
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <InputNumber disabled={editdisabled} />
        </Form.Item>
      </Form.Item>
    );
  });

  return <>{workTimeForm}</>;
};

export default ProjectTaskForm;
