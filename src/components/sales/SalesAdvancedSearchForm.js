import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Form,
  Button,
  Col,
  Row,
  Select,
  DatePicker,
  AutoComplete,
  Input,
} from 'antd';

const { RangePicker } = DatePicker;

const Base = styled.div`
  width: 70%;
`;

const SalesAdvancedSearchForm = ({
  customers,
  division,
  item,
  team,
  searchOnSubmit,
  customerOnSelect,
  resetSelectedCustomer,
}) => {
  const [form] = Form.useForm();
  const [suggestions, setSuggestions] = useState([]);
  const [divisionId, setDivisionId] = useState(null);

  useEffect(() => {
    console.log('customers', customers);
    return () => {
      form.resetFields();
    };
  }, []);

  const onSearch = (searchText) => {
    console.log('searchtext', searchText);
    let matches = [];
    if (customers && searchText.length > 0) {
      matches = customers.filter((customer) => {
        const regex = new RegExp(`${searchText}`, 'gi');
        console.log('regex', regex);
        return customer.attributes.name.match(regex);
      });
    }
    console.log('matches', matches);
    // ant.d option 포멧 { value: "한일"}
    const suggestionText = matches.map((text) => {
      return { value: text.attributes.name, id: text.id };
    });
    console.log('suggestionText', suggestionText);
    setSuggestions(suggestionText);
    // setText(text);
  };

  const onChangeDivision = (e) => {
    console.log('onchangedivision', e);
    setDivisionId(e);
  };

  const onReset = () => {
    form.resetFields();
    resetSelectedCustomer();
  };

  return (
    <>
      <Base>
        <Form
          // {...layout}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          //   wrapperCol={{ flex: 1 }}
          labelAlign="left"
          form={form}
          // layout="vertical"
          hideRequiredMark
          onFinish={searchOnSubmit}
        >
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                name="date"
                label="기준일자"
                rules={[{ required: true }]}
              >
                <RangePicker picker="month" />
              </Form.Item>
            </Col>
            <Col span={7} offset={0}>
              <Form.Item name="division" label="매출구분">
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
            <Col span={6} offset={1}>
              <Form.Item name="probability" label="매출확률">
                <Input disabled={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item name="customer" label="매출처">
                <AutoComplete
                  options={suggestions}
                  style={{
                    width: 200,
                  }}
                  onSelect={customerOnSelect}
                  onSearch={onSearch}
                  placeholder="매출처 입력 후 선택"
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="item" label="매출품목">
                <Select>
                  {divisionId
                    ? item
                        .filter((v) => {
                          return v.division === divisionId;
                        })
                        .map((list, index) => {
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
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item name="salesname" label="건명">
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="team" label="사업부">
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
      </Base>
    </>
  );
};

export default SalesAdvancedSearchForm;
