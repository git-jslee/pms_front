import React from 'react';
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
  DatePicker,
  Radio,
  Divider,
} from 'antd';

const WorkDrawerForm = ({
  btnDisabled,
  visible,
  drawerOnClose,
  initialValues,
}) => {
  return (
    <>
      <Drawer
        title="작업정보"
        width={720}
        onClose={drawerOnClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button>수정</Button>
            <Button>삭제</Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          //   onFinish={onSubmit}
          initialValues={initialValues}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="type" label="구분">
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="customer" label="고객사">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="id" label="ID">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="title" label="건명">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="service_type"
                label="서비스/지원종류"
                rules={[
                  {
                    required: true,
                    message: '매출확률을 입력하세요',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="task" label="Task/내용">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8} offset={8}>
              <Form.Item
                name="user"
                label="작업자"
                rules={[
                  {
                    required: true,
                    message: '매출확률을 입력하세요',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="working_day" label="작업일">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="working_time" label="작업시간">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="confirmed" label="진행율">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item name="description" label="비 고">
                <Input.TextArea rows={4} placeholder="description" />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" disabled={btnDisabled}>
            Submit
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default WorkDrawerForm;
