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
  Divider,
  Switch,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AutoComplete from '../common/AutoComplete';

const ButtonBlock = styled.div`
  //
`;
const DrawerBlock = styled.div`
  //
`;

const AddMainDrawerForm = ({
  onSubmit,
  visible,
  resetfields,
  onClose,
  btnDisabled,
  customer,
  item,
  team,
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
      <DrawerBlock>
        <Drawer
          title="유지보수 등록"
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
          <AutoComplete lists={customer} />
          <Divider />
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
                  <Select
                  // onChange={customerOnChange}
                  >
                    {customer
                      ? customer.map((list, index) => {
                          return (
                            <Select.Option key={index} value={list.id}>
                              {list.attributes.name}
                            </Select.Option>
                          );
                        })
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="scode_item"
                  label="품목"
                  rules={[
                    { required: true, message: '유지보수 품목을 선택하세요' },
                  ]}
                >
                  <Select>
                    {item
                      ? item.map((list) => {
                          return (
                            <Select.Option key={list.id} value={list.id}>
                              {list.attributes.name}
                            </Select.Option>
                          );
                        })
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="title"
                  name="title"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="scode_team"
                  label="사업부"
                  rules={[{ required: true, message: '사업부를 선택하세요' }]}
                >
                  <Select>
                    {team
                      ? team.map((list) => {
                          return (
                            <Select.Option key={list.id} value={list.id}>
                              {list.attributes.name}
                            </Select.Option>
                          );
                        })
                      : ''}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="계약여부" name="contracted">
                  <Switch
                  // onChange={onChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />

            <Divider />
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="description" label="비 고">
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

export default AddMainDrawerForm;
