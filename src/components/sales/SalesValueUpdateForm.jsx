import React from 'react';
import {
  Form,
  Input,
  Table,
  Descriptions,
  Badge,
  Space,
  Button,
  Divider,
  Row,
  Col,
  Switch,
  Select,
  InputNumber,
  Radio,
  DatePicker,
} from 'antd';
// import Button from '../common/Button';

const SalesValueUpdateForm = ({
  initialValues,
  probability,
  list,
  tableData,
  onSubmit,
  radioValue,
  salesValueOnchange,
  onChangeRadio,
  profitMarginOnchange,
  calResult,
  profitMarginValue,
  checked,
  onChangeSwitch,
}) => {
  const sales_profits = list.sales_profits;

  return (
    <>
      <Divider />
      <Form
        onFinish={onSubmit}
        layout="vertical"
        hideRequiredMark
        initialValues={initialValues}
        // onValuesChange={onFormLayoutChange}
      >
        <Row gutter={16}>
          <Col offset={0} span={8}>
            <Form.Item label={checked.name} name="confirmed">
              <Switch
                onChange={onChangeSwitch}
                defaultChecked={initialValues.confirmed}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="매출확률"
              name="probability"
              rules={[{ required: !checked.checked }]}
              //   wrapperCol={{ offset: 0, span: 8 }}
            >
              <Select disabled={checked.checked}>
                {probability ? (
                  probability.map((list, index) => {
                    return (
                      <Select.Option key={index} value={list.id}>
                        {list.name}%
                      </Select.Option>
                    );
                  })
                ) : (
                  <></>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col offset={2} span={3}>
            <Radio.Group onChange={onChangeRadio} value={radioValue}>
              <Radio value={true}>매출이익</Radio>
              <Radio value={false}>마진</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col offset={0} span={8}>
            <Form.Item
              label="매 출"
              name="sales"
              rules={[{ required: true }]}
              onChange={salesValueOnchange}
            >
              <InputNumber
                style={{
                  width: '100%',
                }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            {radioValue ? (
              <Form.Item
                label="매출이익"
                name="sales_profit"
                rules={[{ required: true }]}
                onChange={profitMarginOnchange}
              >
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  disabled={!radioValue}
                />
              </Form.Item>
            ) : (
              <Form.Item
                label="마진"
                name="margin"
                rules={[{ required: true }]}
                onChange={profitMarginOnchange}
              >
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
            )}
          </Col>
          <Col offset={2} span={4}>
            {profitMarginValue.margin || profitMarginValue.sales_profit ? (
              radioValue ? (
                <Space>
                  <span>마진 : </span>
                  <span>{calResult.margin}</span>
                </Space>
              ) : (
                <Space>
                  <span>매출이익 : </span>
                  <span>{calResult.profit}</span>
                </Space>
              )
            ) : (
              <Space>
                <span>...</span>
              </Space>
            )}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col offset={0} span={8}>
            <Form.Item
              label="매출인식일자"
              name="sales_rec_date"
              rules={[{ required: true }]}
            >
              <DatePicker
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="결제일자" name="payment_date">
              <DatePicker
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Col>
          <Col offset={2} span={4}></Col>
        </Row>
        <Row>
          <Col offset={0} span={22}>
            <Form.Item label="메모" name="memo">
              <Input.TextArea size="medium" id="memo" />
            </Form.Item>
          </Col>
        </Row>
        <Col offset={0}>
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

export default SalesValueUpdateForm;
