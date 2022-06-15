import React from 'react';
import {
  Button,
  Drawer,
  Row,
  Col,
  Form,
  Select,
  Input,
  //   DatePicker,
  Divider,
  Space,
  InputNumber,
  Empty,
} from 'antd';
// import DatePicker from '../DatePicker';
// import format from 'dayjs';

const ProjectEditForm = ({ visible, record }) => {
  const initialValues = {
    status: record.status,
    plan_startdate: '2022-06-15',
    plan_enddate: record.plan_enddate,
    startdate: record.startdate,
    enddate: record.enddate,
  };

  return (
    <>
      <Drawer title={`${record.name}`} width={600} visible={visible}>
        <Form
          // onFinish={onSubmit}
          layout="vertical"
          initialValues={initialValues}
          // onValuesChange={onFormLayoutChange}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="상태"
                name="status"
                rules={[{ required: true }]}
              >
                <Select>
                  {/* {code_statuses.map((status, index) => {
                  return (
                    <Select.Option key={status.id} value={status.id}>
                      {status.attributes.name}
                    </Select.Option>
                  );
                })} */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="계획시작"
                name="plan_startdate"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="계획종료"
                name="plan_enddate"
                rules={[{ required: true }]}
              >
                {/* <DatePicker /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="시작일"
                name="startdate"
                rules={[{ required: true }]}
              >
                {/* <DatePicker /> */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="종료일" name="enddate">
                {/* <DatePicker /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="계약여부" name="contracted">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="수주금액" name="price">
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="비고" name="description">
                <Input.TextArea id="description" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <Button
                id="submit-button"
                htmlType="submit"
                //   disabled={btnDisabled}
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
