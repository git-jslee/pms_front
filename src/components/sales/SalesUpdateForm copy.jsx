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

const SalesUpdateForm = ({
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
  const sales_profit = sales_profits[sales_profits.length - 1];
  console.log('probability', probability);
  console.log('profitMarginValue', profitMarginValue);

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: '확률',
      key: 'probability',
      dataIndex: 'probability',
    },
    {
      title: '확정여부',
      key: 'confirmed',
      dataIndex: 'confirmed',
    },
    {
      title: '매출',
      key: 'sales',
      dataIndex: 'sales',
    },
    {
      title: '매출이익',
      key: 'profit',
      dataIndex: 'profit',
    },
    {
      title: '마진',
      key: 'margin',
      dataIndex: 'margin',
    },
    {
      title: '매출인식일',
      key: 'sales_rec_date',
      dataIndex: 'sales_rec_date',
    },
    {
      title: '결제일자',
      key: 'payment_date',
      dataIndex: 'payment_date',
    },
    {
      title: '메모',
      key: 'description',
      dataIndex: 'description',
    },
  ];
  console.log('******', list.name);
  return (
    <>
      <Descriptions title="Sales Update" bordered>
        <Descriptions.Item label="매출확률">100%</Descriptions.Item>
        <Descriptions.Item label="매출처">{list.name}</Descriptions.Item>
        <Descriptions.Item label="매출확정여부">
          {sales_profit.confirmed ? 'Yes' : 'No'}
        </Descriptions.Item>
        <Descriptions.Item label="건 명" span={2}>
          {list.name}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="매출구분">
          {list.scode_division.name}
        </Descriptions.Item>
        <Descriptions.Item label="매풀품목">
          {list.scode_item.name}
        </Descriptions.Item>
        <Descriptions.Item label="사업부">
          {list.scode_division.name}
        </Descriptions.Item>
        <Descriptions.Item label="매 출">
          {sales_profit.sales}
        </Descriptions.Item>
        <Descriptions.Item label="매출이익">
          {sales_profit.sales_profit}
        </Descriptions.Item>
        <Descriptions.Item label="마 진">
          {sales_profit.profit_margin}
        </Descriptions.Item>
        {/* <Descriptions.Item label="비 고">{list.description}</Descriptions.Item> */}
      </Descriptions>
      <Divider />
      <Form
        //columns -> 24, 기본 4, 14
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onSubmit}
        layout="horizontal"
        // initialValues={}
        // onValuesChange={onFormLayoutChange}
      >
        <Row>
          <Col offset={2} span={6}>
            <Form.Item label={checked.name} name="confirmed">
              <Switch onChange={onChangeSwitch} />
            </Form.Item>
          </Col>
          <Col span={6}>
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
          <Col span={8}></Col>
        </Row>
        <Row>
          <Col offset={2} span={6}>
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
          <Col offset={1} span={2}>
            <Radio.Group onChange={onChangeRadio} value={radioValue}>
              <Radio value={true}>매출이익</Radio>
              <Radio value={false}>마진</Radio>
            </Radio.Group>
          </Col>
          <Col offset={0} span={6}>
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
          <Col offset={1} span={6}>
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
        <Row>
          <Col offset={2} span={6}>
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
          <Col offset={2} span={6}>
            <Form.Item label="결제일자" name="payment_date">
              <DatePicker
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
          </Col>
          <Col offset={2} span={6}>
            <Form.Item label="메모" name="memo">
              <Input.TextArea size="medium" id="memo" />
            </Form.Item>
          </Col>
        </Row>
        <Col span={12}>
          <Form.Item label="비고" name="description">
            <Input.TextArea size="large" id="description" />
          </Form.Item>
        </Col>
        <Col offset={4}>
          <Form.Item>
            <Button id="submit-button" size="large" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Col>
      </Form>
      <Divider />
      <Table columns={columns} dataSource={tableData} />
    </>
  );
};

export default SalesUpdateForm;
