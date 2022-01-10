import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Divider,
  message,
} from 'antd';

const ProjectFormView = ({
  code_types,
  // code_tasks,
  code_services,
  code_statuses,
  tasks,
  customers,
  onChange,
  onSubmit,
}) => {
  const [componentSize, setComponentSize] = useState('default');
  const [service, setService] = useState();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const { RangePicker } = DatePicker;

  //   const onChange = (item) => {
  //     const getTasks = code_tasks.filter((v) => v.code_service.id === item);
  //     setService(getTasks);
  //   };

  // 서비스 선택시 task 정보 생성
  if (tasks) {
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
  }

  return (
    <>
      <Form
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
        <Form.Item label="구분" name="type" rules={[{ required: true }]}>
          <Select>
            {code_types.map((type, index) => {
              return (
                <Select.Option key={index} value={type.id}>
                  {type.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="고객사" name="customer" rules={[{ required: true }]}>
          <Select>
            {customers.map((customer, index) => {
              return (
                <Select.Option key={index} value={customer.id}>
                  {customer.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label={<div className="form-lavel">프로젝트명</div>}
          name="project"
          rules={[{ required: true, message: '프로젝트명을 입력해 주세요.' }]}
        >
          <Input
            className="project-name"
            size="large"
            placeholder="프로젝트명을 입력해 주세요!!"
          />
        </Form.Item>
        <Form.Item label="서비스" name="service" rules={[{ required: true }]}>
          {/* 서비스 선택시..reduce update 적용 필요 */}
          <Select onChange={onChange}>
            {code_services.map((service, index) => {
              return (
                <Select.Option key={index} value={service.id}>
                  {service.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="상태" name="status" rules={[{ required: true }]}>
          <Select>
            {code_statuses.map((status, index) => {
              return (
                <Select.Option key={index} value={status.id}>
                  {status.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="계획일" name="planDate" rules={[{ required: true }]}>
          <RangePicker />
        </Form.Item>
        <Form.Item label="시작일" name="startDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="종료일" name="endDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="수주금액" name="price">
          <InputNumber />
        </Form.Item>

        {/* {ProjectTaskForm 추가..}} */}
        <Divider />
        {tasks ? (
          tasks.map((list, index) => {
            return (
              <div style={{ display: 'inline-block', width: '300px' }}>
                <Form.Item
                  key={list.code}
                  label={list.name}
                  name={list.code}
                  // style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                  style={{ width: '500%' }}
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
            );
          })
        ) : (
          <h1>Task 작업 시간</h1>
        )}
        <Divider />
        <Form.Item label="비고" name="description">
          <Input.TextArea size="large" id="description" />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProjectFormView;
