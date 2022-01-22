import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Divider,
  Row,
  Col,
  Radio,
} from 'antd';

const AddSalesPerformanceForm = ({
  probability,
  division,
  team,
  customer,
  onChangeDivision,
  onSubmit,
  divisionId,
}) => {
  const [radioValue, setRadioValue] = useState(true);
  const [salesValue, setSalesValue] = useState();
  const [profitValue, setProfitValue] = useState();
  const [marginValue, setMarginValue] = useState();
  const [initValues, setInitvalues] = useState({ sales_name: '테스트' });
  if (divisionId) {
    console.log('>>>', division);
    const result = division.filter((v) => {
      return v.id === divisionId;
    });
    console.log('>>>', result[0].item);
  }

  const onChangeRadio = (e) => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };
  const salesValueOnchange = (e) => {
    console.log('salesValueOnchange', e.target.value);
    setSalesValue(e.target.value);
  };
  const profitValueOnchange = (e) => {
    console.log('profitValueOnchange', e.target.value);
    setProfitValue(e.target.value);
  };

  useEffect(() => {
    setInitvalues({
      margin: parseInt(profitValue) / parseInt(salesValue),
      sales_name: '테스트1,',
    });
  }, [salesValue, profitValue]);

  console.log('===', initValues);

  return (
    <>
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
        initialValues={initValues}
        // onValuesChange={onFormLayoutChange}
      >
        <Row>
          {/* <Col offset={3} span={8}> */}
          <Col></Col>
          <Col span={12}>
            <Form.Item
              label="매출처"
              name="customer"
              rules={[{ required: true }]}
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
          <Col offset={6} span={6}>
            <Form.Item
              label="매출확률"
              name="probability"
              rules={[{ required: true }]}
              //   wrapperCol={{ offset: 0, span: 8 }}
            >
              <Select>
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
        <Row>
          <Col span={12}>
            <Form.Item
              label={<div className="form-lavel">건명</div>}
              name="sales_name"
              rules={[
                { required: true, message: '프로젝트명을 입력해 주세요.' },
              ]}
            >
              <Input
                className="project-name"
                size="large"
                placeholder="프로젝트명을 입력해 주세요!!"
              />
            </Form.Item>
          </Col>
          <Col offset={12}></Col>
        </Row>
        <Row>
          <Col offset={2} span={6}>
            <Form.Item
              label="매출구분"
              name="division"
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
          <Col offset={2} span={6}>
            <Form.Item
              label="매출품목"
              name="item"
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
          <Col offset={2} span={6}>
            <Form.Item label="사업부" name="team" rules={[{ required: true }]}>
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
        <Row>
          <Col offset={2} span={6}>
            <Form.Item
              label="매출"
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
          <Col offset={1} span={1}>
            <Radio.Group onChange={onChangeRadio} value={radioValue}>
              <Radio value={true}>A</Radio>
              <Radio value={false}>B</Radio>
            </Radio.Group>
          </Col>
          <Col offset={0} span={6}>
            <Form.Item
              label="매출이익"
              name="sales_profit"
              rules={[{ required: true }]}
              onChange={profitValueOnchange}
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
          </Col>
          <Col offset={2} span={6}>
            <Form.Item label="마진" name="margin" rules={[{ required: true }]}>
              <InputNumber
                style={{
                  width: '100%',
                }}
                disabled={radioValue}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col offset={2} span={6}>
            <Form.Item label="매출인식일자" name="sales_rec_date">
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
          <Col offset={2} span={6}></Col>
        </Row>
        <Divider />
        <Col span={12}>
          <Form.Item label="비고" name="description">
            <Input.TextArea size="large" id="description" />
          </Form.Item>
        </Col>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddSalesPerformanceForm;
