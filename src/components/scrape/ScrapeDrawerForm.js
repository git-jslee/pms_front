import React from 'react';
import {
  Form,
  Input,
  Select,
  Space,
  Divider,
  Button,
  Col,
  Row,
  Drawer,
} from 'antd';

const ScrapeDrawerForm = ({
  visible,
  codebook,
  record,
  onChangeAddContract,
  onClose,
  onReset,
}) => {
  return (
    <>
      <Drawer
        title="검토결과 등록"
        width={400}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onChangeAddContract}>서비스 추가</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <h3>{`ID : ${record.key}`}</h3>
        <h4>{record.title}</h4>
        <Form layout="vertical">
          <Divider />
          <Col>
            <Form.Item name="review_result" label="검토결과">
              <Select>
                {codebook
                  ? codebook[1].map((list) => {
                      return (
                        <Select.Option key={list.id} value={list.id}>
                          {list.attributes.name}
                        </Select.Option>
                      );
                    })
                  : ''}
              </Select>
            </Form.Item>
            <Form.Item name="review_opnion" label="검토의견">
              <Input.TextArea rows={6} />
            </Form.Item>
          </Col>
          <Divider />
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
    </>
  );
};

export default ScrapeDrawerForm;
