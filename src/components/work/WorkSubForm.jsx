import React, { useState, useEffect } from 'react';
import { Form, Select, Radio, Col, Row } from 'antd';

const WorkSubForm = ({
  selectedType,
  selectedUser,
  selectedTeam,
  userList,
  teamUserList,
  typeOnChange,
  teamOnChange,
  userOnChange,
}) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('Worker');
  const optionsWithDisabled = [
    // { label: '고객사', value: 'Customer' },
    { label: '프로젝트', value: 'pjt' },
    { label: '유지보수', value: 'mnt' },
  ];
  // const onChange = (e) => {
  //   console.log('radio4 checked', e.target.value);
  //   setValue(e.target.value);
  // };

  // Form 에서 로그인 사용자 선택
  useEffect(() => {
    form.setFieldsValue({
      type: selectedType,
      team: selectedTeam,
      user: selectedUser,
    });
  }, []);

  const onReset = () => {
    form.resetFields();
  };

  console.log('44444444444', userList);

  return (
    <>
      <Form form={form}>
        <Row gutter={16}>
          <Col span={4}>
            <Form.Item name="type">
              <Radio.Group
                options={optionsWithDisabled}
                onChange={typeOnChange}
                value={value}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="사업부" name="team">
              <Select onChange={teamOnChange}>
                {teamUserList.map((list) => {
                  return (
                    <Select.Option key={list.id} value={list.id}>
                      {list.attributes.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="작업자" name="user">
              <Select onChange={userOnChange}>
                {userList.map((list) => {
                  return (
                    <Select.Option key={list.id} value={list.id}>
                      {list.attributes.username}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default WorkSubForm;
