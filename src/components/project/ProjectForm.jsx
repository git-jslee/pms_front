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
import ProjectTaskForm from './ProjectTaskForm';

const ProjectForm = ({
  code_types,
  code_tasks,
  code_services,
  code_statuses,
  // tasks,
  // onChange,
  // onSubmit,
  projectInfo,
  pidTaskList,
  formInitValues,
  editdisabled,
  calPidWorktimeAndProgress,
}) => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const customers = [
    { id: 1, name: 'crea' },
    { id: 2, name: 'cwcc' },
  ];
  if (projectInfo === undefined) return <h1>로딩중</h1>;
  const projectTask = projectInfo.project_tasks;
  console.log('>>>calPidWorktimeAndProgress>>>>', calPidWorktimeAndProgress);
  const { RangePicker } = DatePicker;

  //   const onChange = (item) => {
  //     const getTasks = code_tasks.filter((v) => v.code_service.id === item);
  //     setService(getTasks);
  //   };

  // 서비스 선택시 task 정보 생성
  // if (tasks) {
  //   const workTimeForm = tasks.map((list, index) => {
  //     return (
  //       <Form.Item label={list.name} key={index}>
  //         <Form.Item
  //           name={list.code}
  //           style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
  //         >
  //           <InputNumber />
  //         </Form.Item>
  //         <Form.Item
  //           name="11"
  //           style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
  //         >
  //           <InputNumber />
  //         </Form.Item>
  //       </Form.Item>
  //     );
  //   });
  // }

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        // onFinish={onSubmit}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        // initialValues={{
        //   size: componentSize,
        //   type: projectInfo.code_type.id,
        //   customer: projectInfo.customer.id,
        //   project: projectInfo.name,
        //   service: projectInfo.code_service.id,
        //   status: projectInfo.code_status.id,
        // }}
        initialValues={formInitValues}
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
        <Form.Item label="구분" name="type">
          <Select disabled={editdisabled}>
            {code_types.map((type, index) => {
              return (
                <Select.Option key={index} value={type.id}>
                  {type.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="고객사" name="customer">
          <Select disabled={editdisabled}>
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
            disabled={editdisabled}
            className="project-name"
            size="large"
            placeholder="프로젝트명을 입력해 주세요!!"
          />
        </Form.Item>
        <Form.Item label="서비스" name="service">
          {/* 서비스 선택시..reduce update 적용 필요 */}
          <Select disabled={editdisabled}>
            {code_services.map((service, index) => {
              return (
                <Select.Option key={index} value={service.id}>
                  {service.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="상태" name="status">
          <Select disabled={editdisabled}>
            {code_statuses.map((status, index) => {
              return (
                <Select.Option key={index} value={status.id}>
                  {status.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="계획일" name="planDate">
          <RangePicker disabled={editdisabled} />
        </Form.Item>
        <Form.Item label="시작일" name="startDate">
          <DatePicker disabled={editdisabled} />
        </Form.Item>
        <Form.Item label="종료일" name="endDate">
          <DatePicker disabled={editdisabled} />
        </Form.Item>
        <Form.Item label="수주금액" name="price">
          <InputNumber disabled={editdisabled} />
        </Form.Item>
        <Divider />
        {/* {ProjectTaskForm 추가..}} */}
        {/* 22/01/17 프로젝트 테스크폼 상단으로 변경..projectviewdetail */}
        {/* {pidTaskList ? (
          <ProjectTaskForm
            code_tasks={code_tasks}
            service_id={projectInfo.code_service.id}
            projectTask={projectTask}
            pidTaskList={pidTaskList}
            editdisabled={editdisabled}
            calPidWorktimeAndProgress={calPidWorktimeAndProgress}
          />
        ) : (
          <h1>로딩중</h1>
        )} */}
        <Divider />
        {/* <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
        <Form.Item label="비고" name="description">
          <Input.TextArea
            size="large"
            id="description"
            disabled={editdisabled}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default ProjectForm;
