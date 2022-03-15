import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Space,
  DatePicker,
  InputNumber,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ButtonBlock = styled.div`
  //
`;
const DrawerBlock = styled.div`
  //
`;

const AddWorkDrawerForm = ({
  customers,
  progress,
  customerOnChange,
  projectList,
  projectOnChange,
  formDisabled,
  tasks,
  taskOnChange,
  onSubmit,
  onClose,
  showDrawer,
  visible,
  resetfields,
}) => {
  const [form] = Form.useForm();

  if (resetfields) {
    form.resetFields();
    form.setFieldsValue({ workingDay: moment() });
  }

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({ workingDay: moment() });
  }, [form]);

  return (
    <>
      <ButtonBlock>
        <Button onClick={showDrawer} icon={<PlusOutlined />}>
          작업등록
        </Button>
      </ButtonBlock>
      <DrawerBlock>
        <Drawer
          title="작업 등록"
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
          <Form
            form={form}
            layout="vertical"
            hideRequiredMark
            onFinish={onSubmit}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="customer"
                  label="고객명"
                  rules={[{ required: true, message: '고객을 선택하세요' }]}
                >
                  <Select onChange={customerOnChange}>
                    {customers
                      ? customers.map((customer, index) => {
                          return (
                            <Select.Option
                              key={customer.id}
                              value={customer.id}
                            >
                              {customer.name}
                            </Select.Option>
                          );
                        })
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="project"
                  label="프로젝트명"
                  rules={[{ required: true, message: '프로젝트를 선택하세요' }]}
                >
                  <Select onChange={projectOnChange}>
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
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="작업명"
                  name="project_task"
                  rules={[{ required: true }]}
                >
                  <Select onChange={taskOnChange}>
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
              </Col>
              <Col span={12}>
                <Form.Item
                  label="작업일"
                  name="workingDay"
                  rules={[{ required: true }]}
                >
                  <DatePicker format={'YYYY-MM-DD'} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="작업시간"
                  name="workingTime"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="code_progress"
                  label="진행상태"
                  ules={[{ required: true }]}
                >
                  <Select>
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
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="description" label="메 모">
                  <Input.TextArea rows={4} placeholder="description" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Col>
              <Col>
                <Button htmlType="button" onClick={onReset}>
                  초기화
                </Button>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </DrawerBlock>
    </>
  );
};

export default AddWorkDrawerForm;
