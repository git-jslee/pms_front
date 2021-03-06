import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Divider,
  Row,
  Col,
  Empty,
  Space,
} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

const FormBox = styled.div`
  position: relative;
  /* border: 2px solid gray;
  background-color: ${palette.gray[1]}; */
  /* display: flex; */
  justify-content: center;
  align-items: center;
  .taskbox-level > div {
    /* width: 250px; */
  }
  .taxkbox-wrappe {
    /* width: 150px; */
  }
`;

const ProjectFormView = ({
  code_types,
  // code_tasks,
  code_services,
  code_statuses,
  tasks,
  customers,
  onChange,
  onSubmit,
  btnDisabled,
}) => {
  const [componentSize, setComponentSize] = useState('default');
  const [service, setService] = useState();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  console.log('code_types', code_types);
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
        //columns -> 24, 기본 4, 14
        labelCol={{
          span: 6,
        }}
        onFinish={onSubmit}
        wrapperCol={{
          span: 15,
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
                <Select.Option key={type.id} value={type.id}>
                  {type.attributes.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="고객사" name="customer" rules={[{ required: true }]}>
          <Select>
            {customers.map((customer, index) => {
              return (
                <Select.Option key={customer.id} value={customer.id}>
                  {customer.attributes.name}
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
                <Select.Option key={service.id} value={service.id}>
                  {service.attributes.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="상태" name="status" rules={[{ required: true }]}>
          <Select>
            {code_statuses.map((status, index) => {
              return (
                <Select.Option key={status.id} value={status.id}>
                  {status.attributes.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="계획일" name="planDate" rules={[{ required: true }]}>
          <RangePicker />
        </Form.Item>
        <Form.Item label="시작일" name="startDate" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="종료일" name="endDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="수주금액" name="price" rules={[{ required: true }]}>
          <InputNumber addonBefore="+" addonAfter="￦" />
        </Form.Item>
        {/* {ProjectTaskForm 추가..}} */}
        <Divider />
        <Row style={{ width: '100%' }}>
          {tasks ? (
            tasks.map((list, index) => {
              return (
                <Col key={list.id} span={12} style={{ padding: '5px 10px' }}>
                  <Form.Item
                    name={list.attributes.code}
                    label={list.attributes.name}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    // noStyle
                  >
                    <InputNumber addonAfter="일" />
                  </Form.Item>
                </Col>
              );
            })
          ) : (
            <Empty />
          )}
        </Row>
        <Divider />
        <Form.Item label="비고" name="description">
          <Input.TextArea size="large" id="description" />
        </Form.Item>
        <Form.Item>
          <Button
            id="submit-button"
            size="large"
            htmlType="submit"
            disabled={btnDisabled}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProjectFormView;
