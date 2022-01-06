import React, { useState, useEffect } from 'react';
import moment from 'moment';
import dayjs from 'dayjs';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Divider,
  message,
} from 'antd';
import projectlist from '../../modules/projectList';

const AddWorkForm = ({
  customers,
  userinfo,
  projectList,
  tasklist,
  code_progress,
  customerOnChange,
  projectOnChange,
  taskOnChange,
  formDisabled,
  tasks,
  progress,
  onSubmit,
}) => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const today = new Date();
  const [form] = Form.useForm();

  // 고객사 선택시 프로젝트명 초기화 및 axios 로 받아온 정보(project Id) 입력
  useEffect(() => {
    if (projectList === '' || projectList === undefined) {
      form.setFieldsValue({
        project: '',
      });
    } else {
      if (projectList.length === 0) {
        form.setFieldsValue({
          project: '',
        });
      } else {
        form.setFieldsValue({
          project: projectList[0].id,
        });
        projectOnChange(projectList[0].id);
      }
    }
  }, [projectList]);

  // 프로젝트 선택시 Task 초기화
  useEffect(() => {
    if (tasks === '' || tasks === undefined) {
      form.setFieldsValue({
        code_task: '',
      });
    } else {
      form.setFieldsValue({
        code_task: '',
      });
    }
  }, [tasks]);

  //setFieldsValue 기능 이용하여 현재 시간 정보 받아와 금일 날짜 자동입력 기능 구현필요
  // 작업자 정보 자동 입력
  // dayjs 로 구현시..에러 발생 변경 필요 moment -> dayjs
  useEffect(() => {
    form.setFieldsValue({ workingDay: moment(today), user_info: userinfo.id });
  }, [form]);

  console.log(']]]]]]', userinfo);

  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        onFinish={onSubmit}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
          // ...workInitValues,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="고객명" name="customer">
          <Select onChange={customerOnChange}>
            {customers.map((customer, index) => {
              return (
                <Select.Option key={index} value={customer.id}>
                  {customer.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="프로젝트명" name="project">
          <Select disabled={formDisabled.project} onChange={projectOnChange}>
            {projectList
              ? projectList.map((list) => {
                  return (
                    <Select.Option key={list.id} value={list.id}>
                      {list.name}
                    </Select.Option>
                  );
                })
              : []}
          </Select>
        </Form.Item>
        <Form.Item label="작업명" name="project_task">
          <Select disabled={formDisabled.task} onChange={taskOnChange}>
            {tasks
              ? tasks.map((list) => {
                  return (
                    <Select.Option key={list.id} value={list.id}>
                      {list.code_task.name}
                    </Select.Option>
                  );
                })
              : []}
          </Select>
        </Form.Item>
        <Form.Item label="작업일" name="workingDay">
          <DatePicker format={'YYYY-MM-DD'} />
        </Form.Item>
        <Form.Item label="작업시간" name="workingTime">
          <InputNumber />
        </Form.Item>
        <Form.Item label="진행상태" name="code_progress">
          <Select disabled={formDisabled.progress}>
            {progress
              ? progress.map((list) => {
                  return (
                    <Select.Option key={list.id} value={list.id}>
                      {list.code}
                    </Select.Option>
                  );
                })
              : []}
          </Select>
        </Form.Item>
        <Form.Item label="작업자" name="user_info">
          <Select disabled={true}>
            {userinfo ? (
              <Select.Option value={userinfo.id}>{userinfo.name}</Select.Option>
            ) : (
              <Select.Option>...</Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item label="비고" name="description">
          <Input.TextArea size="large" id="description" />
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddWorkForm;