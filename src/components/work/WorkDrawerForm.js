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
  Descriptions,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const WorkDrawerForm = ({
  btnDisabled,
  visible,
  drawerOnClose,
  initialValues,
  editmode,
  editOnclick,
  editworkOnSubmit,
  deleteOnclick,
  progress,
  tasks,
}) => {
  console.log('***tasks***', tasks);
  console.log('***progress***', progress);
  return (
    <>
      <Drawer
        title="작업정보"
        width={720}
        onClose={
          !editmode ? () => drawerOnClose(true) : () => drawerOnClose(false)
        }
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button
              onClick={() => editOnclick(initialValues.type, initialValues.pid)}
            >
              수정
            </Button>
            <Button
              onClick={() =>
                deleteOnclick(initialValues.type, initialValues.id)
              }
            >
              삭제
            </Button>
          </Space>
        }
      >
        <Descriptions
          title={`${initialValues.title} - ID: ${initialValues.id}`}
          bordered
        >
          <Descriptions.Item label="구분" span={2}>
            {initialValues.type}
          </Descriptions.Item>
          <Descriptions.Item label="고객사" span={2}>
            {initialValues.customer}
          </Descriptions.Item>
          <Descriptions.Item label="건 명" span={4}>
            {initialValues.title}
          </Descriptions.Item>
          <Descriptions.Item label="서비스" span={2}>
            {/* 서비스/지원종류 */}
            {initialValues.service_type}
          </Descriptions.Item>
          <Descriptions.Item label="Task" span={2}>
            {/* Task/유지보수내용 */}
            {initialValues.task}
          </Descriptions.Item>
          <Descriptions.Item label="작업일" span={2}>
            {initialValues.working_day_str}
          </Descriptions.Item>
          <Descriptions.Item label="작업시간" span={2}>
            {initialValues.working_time}
          </Descriptions.Item>
          <Descriptions.Item label="작업자" span={2}>
            {initialValues.user}
          </Descriptions.Item>
          <Descriptions.Item label="진행률" span={2}>
            {initialValues.progress}
          </Descriptions.Item>
          {!editmode ? (
            <Descriptions.Item label="비 고" span={4}>
              {initialValues.description}
            </Descriptions.Item>
          ) : (
            ''
          )}
        </Descriptions>
        {editmode ? (
          <>
            <Divider />
            <h2>작업수정</h2>
            <Form
              layout="vertical"
              hideRequiredMark
              onFinish={editworkOnSubmit}
              initialValues={initialValues}
            >
              <Row gutter={16}>
                {/* onsubmit - work id, type(프로젝트/유지보수) data 전달용 */}
                <Col span={7}>
                  <Form.Item name="id">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item name="type">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name="title">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={7}>
                  <Form.Item
                    name="task"
                    label="Task"
                    rules={[{ required: true }]}
                  >
                    <Select disabled>
                      {tasks
                        ? tasks.map((list) => {
                            return (
                              <Select.Option key={list.id} value={list.id}>
                                {list.attributes.code_task.data.attributes.name}
                              </Select.Option>
                            );
                          })
                        : ''}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    name="working_day"
                    label="작업일"
                    rules={[{ required: true }]}
                  >
                    <DatePicker format={'YYYY-MM-DD'} />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    name="working_time"
                    label="작업시간"
                    rules={[{ required: true }]}
                  >
                    <InputNumber />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    name="code_progress"
                    label="진행률"
                    rules={[{ required: true }]}
                  >
                    <Select>
                      {progress.map((list) => {
                        return (
                          <Select.Option key={list.id} value={list.id}>
                            {list.attributes.code}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="description" label="비 고">
                    <Input.TextArea rows={3} placeholder="description" />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit" disabled={btnDisabled}>
                Submit
              </Button>
            </Form>
          </>
        ) : (
          ''
        )}
      </Drawer>
    </>
  );
};

export default WorkDrawerForm;
