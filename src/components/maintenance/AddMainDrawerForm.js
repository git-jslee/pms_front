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
  DatePicker,
  Radio,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AutoComplete from '../common/AutoComplete';

const ButtonBlock = styled.div`
  //
`;
const DrawerBlock = styled.div`
  //
`;

const { RangePicker } = DatePicker;

const AddMainDrawerForm = ({
  onSubmit,
  visible,
  formReset,
  onClose,
  btnDisabled,
  customer,
  filterCustomer,
  filterMain,
  item,
  team,
  provider,
  term,
  filterMaItem,
  onChangeAddContract,
  onChangeCustomer,
  onClickIncome,
  OnChangeProvider,
  btnService,
  btnIncome,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    console.log('***formReset Count***', formReset);
  }, [formReset]);

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({ workingDay: moment() });
  }, [form]);

  //점검용
  console.log('***fimaitem***', filterMaItem);
  //점검용

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
              <Button onClick={onChangeAddContract}>서비스 추가</Button>
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
            {btnService ? (
              <>
                <Row>
                  <Col span={12}>
                    {/* <Form.Item name="scode_type" label="수입/지출"> */}
                    <Radio.Group
                      defaultValue="income"
                      onChange={onClickIncome}
                      buttonStyle="solid"
                    >
                      <Radio.Button value="income">매출</Radio.Button>
                      <Radio.Button value="expenditure">매입</Radio.Button>
                    </Radio.Group>
                    {/* </Form.Item> */}
                  </Col>
                </Row>
                <br />
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="customer"
                      label="고객명"
                      rules={[{ required: true, message: '고객을 선택하세요' }]}
                    >
                      <Select onChange={onChangeCustomer}>
                        {filterCustomer
                          ? filterCustomer.map((list, index) => {
                              return (
                                <Select.Option key={list.id} value={list.id}>
                                  {list.name}
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
                        {
                          required: true,
                          message: '유지보수 품목을 선택하세요',
                        },
                      ]}
                    >
                      <Select>
                        {filterMain
                          ? filterMain.map((list) => {
                              return (
                                <Select.Option key={list.id} value={list.id}>
                                  {list.attributes.title}
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
                    <Form.Item name="code_ma_provider" label="서비스 제공자">
                      <Select onChange={OnChangeProvider} disabled={btnIncome}>
                        {provider.map((list, index) => {
                          return (
                            <Select.Option key={index} value={list.id}>
                              {list.attributes.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="code_ma_item"
                      label="서비스"
                      rules={[
                        {
                          required: true,
                          message: '서비스를 선택하세요',
                        },
                      ]}
                    >
                      <Select>
                        {filterMaItem
                          ? filterMaItem.map((list) => {
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
                      name="code_ma_term"
                      label="term"
                      rules={[
                        {
                          required: true,
                          message: '기간을 선택하세요',
                        },
                      ]}
                    >
                      <Select>
                        {term
                          ? term.map((list) => {
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
                  <Col span={12}>
                    <Form.Item
                      name="payment_date"
                      label="결제일"
                      rules={[{ required: true }]}
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="service_date"
                      label="서비스 기간"
                      rules={[{ required: true }]}
                    >
                      <RangePicker />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="cost"
                      label="금액"
                      rules={[
                        {
                          required: true,
                          message: '유지보수 금액을 입력하세요',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="memo" label="메 모">
                      <Input.TextArea rows={4} placeholder="memo" />
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
                        {
                          required: true,
                          message: '유지보수 품목을 선택하세요',
                        },
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
                      rules={[
                        { required: true, message: '사업부를 선택하세요' },
                      ]}
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
                <Divider />
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
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="description" label="비 고">
                      <Input.TextArea rows={4} placeholder="description" />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
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
