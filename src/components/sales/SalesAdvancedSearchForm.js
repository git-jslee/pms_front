import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  Checkbox,
  AutoComplete,
} from 'antd';

const { RangePicker } = DatePicker;

const SearchFormBlock = styled.div`
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

const SalesAdvancedSearchForm = ({
  customers,
  division,
  team,
  searchOnSubmit,
  customerOnSelect,
}) => {
  const [form] = Form.useForm();
  const [suggestions, setSuggestions] = useState([]);
  const [divisionId, setDivisionId] = useState(null);

  useEffect(() => {
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
        return customer.name.match(regex);
      });
    }
    console.log('matches', matches);
    // ant.d option 포멧 { value: "한일"}
    const suggestionText = matches.map((text) => {
      return { value: text.name, id: text.id };
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
  };

  return (
    <>
      <SearchFormBlock>
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
          labelWrap
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
                <Input />
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
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item name="salesname" label="건명">
                {/* <Input /> */}
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
      </SearchFormBlock>
    </>
  );
};

export default SalesAdvancedSearchForm;
