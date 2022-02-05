import React from 'react';
import {
  Form,
  Button,
  Input,
  Divider,
  Row,
  Col,
  Select,
  InputNumber,
  DatePicker,
} from 'antd';

const ProjectUpdateForm = ({ initialValues, code_statuses, onSubmit }) => {
  console.log('initialValues', initialValues);
  return (
    <>
      <Divider />
      <Form
        //columns -> 24, 기본 4, 14
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onSubmit}
        layout="horizontal"
        initialValues={initialValues}
        // onValuesChange={onFormLayoutChange}
      >
        <Row>
          <Col offset={2} span={6}>
            <Form.Item label="상태" name="status">
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
          </Col>
          <Col span={6}>
            <Form.Item label="계획시작" name="planStartDate">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="계획종료" name="planEndDate">
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={2} span={6}>
            <Form.Item label="시작일" name="startDate">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="종료일" name="endDate">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="수주금액" name="price">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Col span={12}>
          <Form.Item label="비고" name="description">
            <Input.TextArea size="small" id="description" />
          </Form.Item>
        </Col>
        <Col offset={4}>
          <Form.Item>
            <Button id="submit-button" size="large" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </>
  );
};

export default ProjectUpdateForm;
