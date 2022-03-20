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
  console.log('code-status', code_statuses);
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
          </Col>
          <Col span={6}>
            <Form.Item
              label="계획시작"
              name="planStartDate"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="계획종료"
              name="planEndDate"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={2} span={6}>
            <Form.Item
              label="시작일"
              name="startDate"
              rules={[{ required: true }]}
            >
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
