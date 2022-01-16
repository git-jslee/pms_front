import React from 'react';
import { Form, DatePicker, Button, Space } from 'antd';
const { RangePicker } = DatePicker;

const FilterMonth = ({ initialValues, onSubmit }) => {
  console.log('initialValues', initialValues);
  return (
    <>
      <Form onFinish={onSubmit} initialValues={initialValues}>
        <Form.Item label="조회" name="filterMonth">
          <RangePicker />
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            조회
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FilterMonth;
