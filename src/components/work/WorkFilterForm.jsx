import React, { useState, useEffect } from 'react';
import { Form, Select } from 'antd';

const WorkFilterForm = ({ userList, user_info_id, userOnChange }) => {
  const [form] = Form.useForm();
  console.log('userlist', userList);
  console.log('user_info_id:', user_info_id);

  // Form 에서 로그인 사용자 선택
  useEffect(() => {
    form.setFieldsValue({
      user: user_info_id,
    });
  });

  return (
    <>
      <Form form={form}>
        <Form.Item label="작업자" name="user">
          <Select onChange={userOnChange}>
            {userList.map((list) => {
              return (
                <Select.Option key={list.id} value={list.id}>
                  {list.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};

export default WorkFilterForm;
