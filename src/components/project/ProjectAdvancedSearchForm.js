import React, { useState } from 'react';
import styled from 'styled-components';
import {
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
  .search {
    margin-left: 20px;
    display: inline;
  }
`;

const ProjectAdvancedSearchForm = ({ customerOnSelect, customers }) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  // 체크박스 옵션
  const optionsWithDisabled = [
    { label: '완료', value: 'sales_name' },
    { label: '진행중', value: 'customer' },
    { label: '보류', value: 'division', disabled: false },
    { label: '시작전', value: 'team', disabled: false },
  ];
  const onChange = (e) => {
    // 체크박스..
    // console.log(`checked = ${e.target.checked}`);
    console.log(`checked = ${e}`);
  };

  // 고객 검색
  const [suggestions, setSuggestions] = useState([]);
  const customerOnSearch = (searchText) => {
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

  return (
    <>
      <SearchFormBlock>
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          labelAlign="left"
          form={form}
          hideRequiredMark
          //   onFinish={searchOnSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label="기준일자"
                rules={[{ required: false }]}
              >
                <RangePicker picker="month" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Checkbox.Group
                options={optionsWithDisabled}
                // defaultValue={['Apple']}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item name="customer" label="고객사">
                <AutoComplete
                  options={suggestions}
                  style={{
                    width: 200,
                  }}
                  onSelect={customerOnSelect}
                  onSearch={customerOnSearch}
                  placeholder="고객사 입력 후 선택"
                />
              </Form.Item>
            </Col>
            <Col span={6} offset={1}>
              <Form.Item name="probability" label="서비스">
                <Input />
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

export default ProjectAdvancedSearchForm;
