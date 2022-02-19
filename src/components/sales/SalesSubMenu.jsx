import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
// import Button from '../common/Button';
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Space,
  Switch,
  DatePicker,
  Divider,
} from 'antd';
import moment from 'moment';
// import { setStartEndOfMonth } from '../../modules/sales';
import { setStartEndOfMonth, setParams } from '../../modules/common';
import startEndDay from '../../modules/common/startEndDay';
import AutoComplete from '../common/AutoComplete';

const { RangePicker } = DatePicker;

const SubMenuBlock = styled.div`
  /* position: relative; */
  display: inline;
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

const SalesSubMenu = ({
  startMonth,
  endMonth,
  searchOnClick,
  advancedSearch,
  buttonName,
}) => {
  const dispatch = useDispatch();
  const [addSalesVisible, setAddSalesVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  // 검색조건 당월
  // const startMonth = moment().add(0, 'months').format('YYYY-MM');
  // const startMonth = moment().format('YYYY-MM');
  // const endMonth = moment().format('YYYY-MM');
  const dateFormat = 'YYYY-MM';
  const month = moment().format('MM');

  useEffect(() => {
    const startEndOfDay = startEndDay(startMonth, endMonth);
    dispatch(setStartEndOfMonth(startEndOfDay));
  }, [dispatch]);

  // 컴포넌트 언마운트시
  useEffect(() => {
    return () => {
      dispatch(setParams(null));
    };
  }, []);

  const onChange = (value) => {
    console.log('onchange', value);
    if (value !== null) {
      const startEndOfDay = startEndDay(value[0], value[1]);
      dispatch(setStartEndOfMonth(startEndOfDay));
      dispatch(setParams(null));
    }
  };

  const buttonOnClick = () => {
    console.log('조회 buttononclick');
    const startEndOfDay = startEndDay(
      moment().format('YYYY-MM'),
      moment().format('YYYY-MM'),
    );
    dispatch(setStartEndOfMonth(startEndOfDay));
    dispatch(setParams(null));
  };

  const addSalesOnClick = () => {
    setAddSalesVisible(true);
  };

  const onClose = () => {
    setAddSalesVisible(false);
  };

  return (
    <>
      <SubMenuBlock>
        <h1>매출현황</h1>
        <Link to="/addsales">
          <Button>등록</Button>
        </Link>
        <Button onClick={addSalesOnClick}>_____</Button>
        {/* <Button onClick={searchOnClick}>상세검색1</Button> */}
        <Button onClick={advancedSearch}>{buttonName}</Button>
        <div className="search">
          <span>기준일자</span>
          <Space direction="vertical" size={12}>
            <RangePicker
              picker="month"
              defaultValue={[
                moment(startMonth, dateFormat),
                moment(endMonth, dateFormat),
              ]}
              onChange={onChange}
            />
          </Space>
          <Button onClick={buttonOnClick}>{month}월 조회</Button>
        </div>
      </SubMenuBlock>
      <Drawer
        title="매출 현황 등록"
        width={720}
        onClose={onClose}
        visible={addSalesVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClose={onClose}>Cancel</Button>
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
          </Space>
        }
      >
        <AutoComplete />
        <Divider />
        <Form
          layout="vertical"
          hideRequiredMark
          // onFinish={onSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="customerId"
                label="매출처"
                rules={[{ required: true, message: '고객ID를 입력하세요' }]}
              >
                <Input placeholder="고객명(영문)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="businessNumber" label="건명">
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="businessNumber" label="매출확정여부">
                <Switch defaultChecked value={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="businessType"
                label="매출확률"
                rules={[{ required: true, message: '기업구분을 입력하세요' }]}
              >
                <Select placeholder="일반기업/공기업">
                  {/* <Option value="general">일반기업</Option>
                  <Option value="public">공기업</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="url" label="매출구분">
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="used" label="매출품목" checked={true}>
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="url" label="사업부">
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="url" label="매출">
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="used" label="매출이익" checked={true}>
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="url" label="이익/마진">
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="used" label="이익/마진계산" checked={true}>
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="url" label="매출인식일자">
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="used" label="결제일자" checked={true}>
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="description" label="메 모">
                <Input.TextArea rows={4} placeholder="description" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="description" label="비 고">
                <Input.TextArea rows={4} placeholder="description" />
              </Form.Item>
            </Col>
          </Row>

          {/* <Button type="primary" htmlType="submit">
            Submit
          </Button> */}
        </Form>
      </Drawer>
    </>
  );
};

export default SalesSubMenu;
