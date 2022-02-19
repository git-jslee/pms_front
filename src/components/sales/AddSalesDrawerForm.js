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
import AutoComplete from '../common/AutoComplete';

const AddSalesDrawerForm = ({
  customer,
  customerid,
  probability,
  division,
  divisionId,
  team,
  addSalesVisible,
  addSalesOnClose,
  probabilityChecked,
  onChangeSwitch,
  onChangeDivision,
  salesValueOnchange,
  profitMarginOnchange,
  radioValue,
  onChangeRadio,
  profitMarginValue,
  calResult,
  onSubmit,
}) => {
  return (
    <>
      <Drawer
        title="매출 등록"
        width={720}
        onClose={addSalesOnClose}
        visible={addSalesVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClose={addSalesOnClose}>Cancel</Button>
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
          </Space>
        }
      >
        <AutoComplete lists={customer} />
        <Divider />
        <Form layout="vertical" hideRequiredMark onFinish={onSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="customer"
                label="매출처"
                rules={[{ required: true, message: '매출처를 입력하세요' }]}
              >
                <Select>
                  {customer.map((list, index) => {
                    return (
                      <Select.Option key={index} value={list.id}>
                        {list.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="sales_name"
                label="건명"
                rules={[{ required: true, message: '사업명을 입력하세요' }]}
              >
                <Input placeholder="사업명을 입력하세요" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="confirmed" label={probabilityChecked.name}>
                <Switch defaultChecked={false} onChange={onChangeSwitch} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="probability"
                label="매출확률"
                rules={[
                  {
                    required: !probabilityChecked.checked,
                    message: '매출확률을 입력하세요',
                  },
                ]}
              >
                <Select disabled={probabilityChecked.checked}>
                  {probability.map((list, index) => {
                    return (
                      <Select.Option key={index} value={list.id}>
                        {list.name}%
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
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
            <Col span={8}>
              <Form.Item
                name="item"
                label="매출품목"
                rules={[{ required: true }]}
              >
                <Select>
                  {divisionId
                    ? division
                        .filter((v) => {
                          return v.id === divisionId;
                        })[0]
                        .item.map((list, index) => {
                          return (
                            <Select.Option key={index} value={list.id}>
                              {list.name}
                            </Select.Option>
                          );
                        })
                    : ''}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="team"
                label="사업부"
                rules={[{ required: true }]}
              >
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
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sales"
                label="매출"
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
            <Col span={12}>
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
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Radio.Group onChange={onChangeRadio} value={radioValue}>
                <Radio value={true}>매출이익</Radio>
                <Radio value={false}>마진</Radio>
              </Radio.Group>
            </Col>
            <Col span={6}></Col>
            <Col span={12}>
              <Form.Item name="000000" label="이익/마진계산" checked={true}>
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
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sales_rec_date"
                label="매출인식일자"
                rules={[{ required: true }]}
              >
                <DatePicker
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="payment_date" label="결제일자" checked={true}>
                <DatePicker
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item name="description" label="비 고">
                <Input.TextArea rows={4} placeholder="description" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="memo" label="메 모">
                <Input.TextArea rows={4} placeholder="momo" />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default AddSalesDrawerForm;
