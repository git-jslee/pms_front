import React, { useState } from 'react';
import { Form, Input, Button, Divider, Row, Col, Select, Checkbox } from 'antd';
// import Button from '../common/Button';

const SalesBasicUpdateForm = ({
  initialValues,
  customer,
  codebook,
  onSubmitBasic,
  btnDisabled,
}) => {
  const [divisionId, setDivisionId] = useState(initialValues.division);
  const division = codebook.division;
  const item = codebook.item;
  const team = codebook.team;
  console.log('codebook', codebook);
  console.log('codebcustomerook', customer);

  // 체크박스 옵션
  const optionsWithDisabled = [
    { label: '건명', value: 'sales_name' },
    { label: '고객사', value: 'customer' },
    { label: '매출처', value: 'sales_customer' },
    { label: '매출구분/품목', value: 'division', disabled: false },
    { label: '사업부', value: 'team', disabled: false },
    { label: '비고', value: 'description', disabled: false },
  ];

  const onChangeDivision = (e) => {
    console.log('division change', e);
    setDivisionId(e);
  };

  const onChange = (e) => {
    // 체크박스..
    // console.log(`checked = ${e.target.checked}`);
    console.log(`checked = ${e}`);
  };
  return (
    <>
      <Divider />
      <Form
        onFinish={onSubmitBasic}
        layout="vertical"
        hideRequiredMark
        initialValues={initialValues}
        // onValuesChange={onFormLayoutChange}
      >
        <Row>
          <Col span={16}>
            <Checkbox.Group
              options={optionsWithDisabled}
              // defaultValue={['Apple']}
              onChange={onChange}
            />
          </Col>
          <Col offset={5}>
            <Form.Item>
              <Button
                id="submit-button"
                size="large"
                htmlType="submit"
                disabled={btnDisabled}
              >
                Update
              </Button>
            </Form.Item>
          </Col>
        </Row>

        {/* <Divider /> */}
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="sales_name"
              label="건명"
              rules={[{ required: true, message: '사업명을 입력하세요' }]}
            >
              <Input placeholder="사업명을 입력하세요" />
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <Form.Item
              name="customer"
              label="고객사"
              rules={[{ required: true, message: '매출처를 입력하세요' }]}
            >
              <Select>
                {customer.map((list, index) => {
                  return (
                    <Select.Option key={index} value={list.id}>
                      {list.attributes.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <Form.Item
              name="sales_customer"
              label="매출처"
              rules={[{ required: true, message: '매출처를 입력하세요' }]}
            >
              <Select>
                {customer.map((list, index) => {
                  return (
                    <Select.Option key={index} value={list.id}>
                      {list.attributes.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={7}>
            <Form.Item
              name="division"
              label="매출구분"
              rules={[{ required: true }]}
            >
              <Select onChange={onChangeDivision}>
                {division.map((list, index) => {
                  return (
                    <Select.Option key={index} value={list.id}>
                      {list.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={7} offset={1}>
            <Form.Item
              name="item"
              label="매출품목"
              rules={[{ required: true }]}
            >
              <Select>
                {divisionId
                  ? item
                      .filter((v) => {
                        return v.division === divisionId;
                      })
                      .map((list, index) => {
                        return (
                          <Select.Option key={list.id} value={list.id}>
                            {list.name}
                          </Select.Option>
                        );
                      })
                  : ''}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} offset={1}>
            <Form.Item name="team" label="사업부" rules={[{ required: true }]}>
              <Select>
                {team.map((list, index) => {
                  return (
                    <Select.Option key={index} value={list.id}>
                      {list.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="description" label="비 고">
              <Input.TextArea rows={2} placeholder="description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SalesBasicUpdateForm;
