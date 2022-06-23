import React, { useState } from 'react';
import moment from 'moment';
import {
  Button,
  Drawer,
  Row,
  Col,
  Form,
  Select,
  Input,
  DatePicker,
  Switch,
  Checkbox,
  Divider,
  Space,
  InputNumber,
  Empty,
} from 'antd';

const ProjectEditForm = ({
  visible,
  btnDisabled,
  record,
  code_status,
  onClose,
  onSubmit,
  handleCheck,
  checkbox,
}) => {
  const _status = checkbox['code_status'] === true ? true : false;
  const _plan_start = checkbox['plan_startdate'] === true ? true : false;
  const _plan_end = checkbox['plan_enddate'] === true ? true : false;
  const _startdate = checkbox['startdate'] === true ? true : false;
  const _enddate = checkbox['enddate'] === true ? true : false;
  const _contracted = checkbox['contracted'] === true ? true : false;
  const _price = checkbox['price'] === true ? true : false;
  const _description = checkbox['description'] === true ? true : false;

  const enddate = record.enddate ? moment(record.enddate) : '';
  const contracted = record.contracted === 'Yes' ? true : false;
  const initialValues = {
    id: record.id,
    code_status: record.code_status,
    plan_startdate: moment(record.plan_startdate),
    plan_enddate: moment(record.plan_enddate),
    startdate: moment(record.startdate),
    enddate: enddate,
    price: record.price,
  };

  return (
    <>
      <Drawer
        title={`(ID:${record.id})${record.customer}-${record.name}`}
        width={600}
        visible={visible}
        onClose={!btnDisabled ? () => onClose(true) : () => onClose(false)}
        extra={
          <Space>
            <Button
              onClick={
                !btnDisabled ? () => onClose(true) : () => onClose(false)
              }
            >
              Cancel
            </Button>
          </Space>
        }
      >
        <Form
          onFinish={onSubmit}
          layout="vertical"
          initialValues={initialValues}
          // onValuesChange={onFormLayoutChange}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Space>
                <Checkbox data-id="code_status" onChange={handleCheck} />
                <span>상태</span>
              </Space>
              <Form.Item
                // label="상태"
                name="code_status"
                rules={[{ required: _status }]}
              >
                <Select disabled={!_status}>
                  {code_status.map((status, index) => {
                    return (
                      <Select.Option key={status.id} value={status.id}>
                        {status.attributes.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6} offset={6}>
              <Form.Item label="ID" name="id">
                <Input disabled={true}>{}</Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Space>
                <Checkbox data-id="plan_startdate" onChange={handleCheck} />
                <span>계획시작</span>
              </Space>
              <Form.Item
                // label="계획시작"
                name="plan_startdate"
                rules={[{ required: true }]}
              >
                <DatePicker disabled={!_plan_start} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Space>
                <Checkbox data-id="plan_enddate" onChange={handleCheck} />
                <span>계획종료</span>
              </Space>
              <Form.Item
                // label="계획종료"
                name="plan_enddate"
                rules={[{ required: true }]}
              >
                <DatePicker disabled={!_plan_end} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Space>
                <Checkbox data-id="startdate" onChange={handleCheck} />
                <span>시작일</span>
              </Space>
              <Form.Item
                // label="시작일"
                name="startdate"
                rules={[{ required: true }]}
              >
                <DatePicker disabled={!_startdate} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Space>
                <Checkbox data-id="enddate" onChange={handleCheck} />
                <span>종료일</span>
              </Space>
              <Form.Item name="enddate" rules={[{ required: _enddate }]}>
                <DatePicker disabled={!_enddate} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Space>
                <Checkbox data-id="contracted" onChange={handleCheck} />
                <span>계약여부</span>
              </Space>
              <Form.Item
                // label="계약여부"
                name="contracted"
                valuePropName="ckecked"
              >
                <Switch defaultChecked={contracted} disabled={!_contracted} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Space>
                <Checkbox data-id="price" onChange={handleCheck} />
                <span>수주금액</span>
              </Space>
              <Form.Item name="price">
                <InputNumber
                  prefix="￦"
                  style={{
                    width: '100%',
                  }}
                  disabled={!_price}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Space>
                <Checkbox data-id="description" onChange={handleCheck} />
                <span>비고</span>
              </Space>
              <Form.Item name="description">
                <Input.TextArea id="description" disabled={!_description} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <Button
                id="submit-button"
                htmlType="submit"
                disabled={btnDisabled}
              >
                Update
              </Button>
            </Col>
            <Col>
              <Button htmlType="button">초기화</Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default ProjectEditForm;
