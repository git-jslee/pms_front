import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Layout, Form, Button, Col, Row, DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Header, Footer, Sider, Content } = Layout;

const FormBlock = styled.div`
  /* position: relative; */
  /* display: inline; */
  /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  margin-top: 10px;
  padding: 2rem;
  width: 1400px;
  height: 100%;
  background: white;
  border-radius: 2px; */
  h1 {
    /* position: relative; */
  }
  .search {
    margin-left: 20px;
    display: inline;
  }
`;

const SubWorkStatistics = ({ worktime }) => {
  const [form] = Form.useForm();
  // 임시추가
  const start = moment().subtract(7, 'days').format('YYYY-MM-DD');
  const end = moment().format('YYYY-MM-DD');

  const onReset = () => {
    form.resetFields();
  };

  return (
    <FormBlock>
      <Layout>
        <Sider width={400}>
          <Form
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 19,
            }}
            labelAlign="left"
            labelWrap
            form={form}
            // layout="vertical"
            hideRequiredMark
            //   onFinish={searchOnSubmit}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="date"
                  label="기준일자"
                  rules={[{ required: true }]}
                >
                  <RangePicker picker="month" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col offset={2}>
                <Button type="primary" htmlType="submit">
                  조회
                </Button>
              </Col>
              <Col>
                <Button htmlType="button" onClick={onReset}>
                  초기화
                </Button>
              </Col>
            </Row>
          </Form>
        </Sider>
        <Content>
          <div>
            통계기준일자 : {start} ~ {end}
          </div>
          <ul>
            {worktime.map((list, index) => {
              return (
                <li key={index}>
                  {list.name} : {list.worktime}시간 / {list.worktime / 8}일
                </li>
              );
            })}
          </ul>
        </Content>
      </Layout>
    </FormBlock>
  );
};

export default SubWorkStatistics;
