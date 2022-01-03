import React, { useState } from 'react';
import { Form, Input, Button, Radio, Divider } from 'antd';

const CustomerForm = ({ onSubmit }) => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        onFinish={onSubmit}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={<div className="form-lavel">영문명</div>}
          name="name_eng"
          rules={[
            { required: true, message: '고객사 영문명을 입력해 주세요.' },
          ]}
        >
          <Input
            className="customerengname"
            size="large"
            placeholder="고객사 영문명을 입력해 주세요."
          />
        </Form.Item>
        <Form.Item
          label={<div className="form-lavel">고객명</div>}
          name="name"
          rules={[{ required: true, message: '고객명을 입력해 주세요.' }]}
        >
          <Input
            className="customername"
            size="large"
            placeholder="고객명을 입력해 주세요."
          />
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CustomerForm;
