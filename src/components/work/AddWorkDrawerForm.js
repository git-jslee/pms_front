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
  Divider,
  Radio,
} from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// const ButtonBlock = styled.div`
//   //
// `;
const DrawerBlock = styled.div`
  //
`;

const AddWorkDrawerForm = ({
  dropdownLists,
  addMode,
  btnDisabled,
  customerOnChange,
  customerId,
  projectOnChange,
  formDisabled,
  taskOnChange,
  onSubmit,
  onClose,
  onClickAddMode,
  // onClickAddWork,
  visible,
  resetfields,
  setResetfields,
}) => {
  const [form] = Form.useForm();

  if (resetfields) {
    form.resetFields();
    if (customerId !== null) {
      form.setFieldsValue({
        customer: customerId,
        workingDay: moment(),
      });
      console.log('***cusID***', customerId);
    }
    form.setFieldsValue({ workingDay: moment() });
    setResetfields(false);
  }

  const onReset = () => {
    form.resetFields();
    form.setFieldsValue({ workingDay: moment() });
  };

  useEffect(() => {
    form.setFieldsValue({ workingDay: moment() });
  }, []);

  console.log('***drwpdownlist***', dropdownLists);

  return (
    <>
      {/* <ButtonBlock>
        <Button onClick={showDrawer} icon={<PlusOutlined />}>
          작업등록
        </Button>
      </ButtonBlock> */}
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
            <Row>
              <Col span={12}>
                <Radio.Group
                  defaultValue="project"
                  onChange={onClickAddMode}
                  buttonStyle="solid"
                >
                  <Radio.Button value="project">프로젝트</Radio.Button>
                  <Radio.Button value="maintenance">유지보수</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
            <Divider />
            {addMode === 'project' ? (
              <>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="customer"
                      label="고객명"
                      rules={[{ required: true, message: '고객을 선택하세요' }]}
                    >
                      <Select onChange={customerOnChange}>
                        {dropdownLists.customers
                          ? dropdownLists.customers.map((customer, index) => {
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
                      rules={[
                        { required: true, message: '프로젝트를 선택하세요' },
                      ]}
                    >
                      <Select onChange={projectOnChange}>
                        {dropdownLists.items1
                          ? dropdownLists.items1.map((list) => {
                              return (
                                <Select.Option key={list.id} value={list.id}>
                                  {list.attributes.name}
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
                        {dropdownLists.items2
                          ? dropdownLists.items2.map((list) => {
                              return (
                                <Select.Option key={list.id} value={list.id}>
                                  {
                                    list.attributes.code_task.data.attributes
                                      .name
                                  }
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
                      rules={[{ required: true }]}
                    >
                      <Select>
                        {dropdownLists.items3
                          ? dropdownLists.items3.map((list) => {
                              return (
                                <Select.Option key={list.id} value={list.id}>
                                  {list.attributes.code}
                                </Select.Option>
                              );
                            })
                          : []}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="customer"
                      label="고객명"
                      rules={[{ required: true, message: '고객을 선택하세요' }]}
                    >
                      <Select onChange={customerOnChange}>
                        {dropdownLists.customers
                          ? dropdownLists.customers.map((customer, index) => {
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
                      name="maintenance"
                      label="유지보수"
                      rules={[
                        { required: true, message: '유지보수명을 선택하세요' },
                      ]}
                    >
                      <Select onChange={projectOnChange}>
                        {dropdownLists.items1
                          ? dropdownLists.items1.map((list) => {
                              return (
                                <Select.Option key={list.id} value={list.id}>
                                  {list.attributes.title}
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
                      label="내용"
                      name="title"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="지원종류"
                      name="code_ma_support"
                      rules={[{ required: true }]}
                    >
                      <Select>
                        {dropdownLists.suLists
                          ? dropdownLists.suLists.map((list) => {
                              return (
                                <Select.Option key={list.id} value={list.id}>
                                  {list.attributes.name}
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
                      label="작업일"
                      name="workingDay"
                      rules={[{ required: true }]}
                    >
                      <DatePicker format={'YYYY-MM-DD'} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="작업시간"
                      name="workingTime"
                      rules={[{ required: true }]}
                    >
                      <InputNumber />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="description" label="메 모">
                  <Input.TextArea rows={4} placeholder="description" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col>
                <Button type="primary" htmlType="submit" disabled={btnDisabled}>
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
