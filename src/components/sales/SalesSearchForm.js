import React, { useState, useEffect } from 'react';
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
  Checkbox,
  AutoComplete,
} from 'antd';
// import AutoComplete from '../common/AutoComplete';

const { RangePicker } = DatePicker;

const SearchFormBlock = styled.div`
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

const SalesSearchForm = ({
  searchOnClose,
  searchVisible,
  searchOnSubmit,
  customerOnSelect,
  customers,
  division,
  team,
}) => {
  const [form] = Form.useForm();
  // autocomplete
  // const [value, setValue] = useState('');
  // const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [divisionId, setDivisionId] = useState(null);

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  // console.log('customers', customers);

  const onSearch = (searchText) => {
    console.log('searchtext', searchText);
    // setOptions(
    //   !searchText
    //     ? []
    //     : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    // );
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

  console.log('options', suggestions);

  const onChangeDivision = (e) => {
    console.log('onchangedivision', e);
    setDivisionId(e);
  };

  //
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <SearchFormBlock></SearchFormBlock>
      <Drawer
        title="매출 상세 조회"
        width={640}
        onClose={searchOnClose}
        visible={searchVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClose={searchOnClose}>Cancel</Button>
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
          </Space>
        }
      >
        <Form
          {...layout}
          form={form}
          // hideRequiredMark
          onFinish={searchOnSubmit}
        >
          <Row>
            {/* <Col span={1} offset={1}></Col> */}
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
          <Divider />
          <Row gutter={16}>
            {/* <Col span={1} offset={1}>
              <Switch />
            </Col> */}
            <Col span={24}>
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
          </Row>
          <Row gutter={16}>
            {/* <Col span={1} offset={1}>
              <Switch />
            </Col> */}
            <Col span={24}>
              <Form.Item name="name" label="건명">
                {/* <Input /> */}
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row>
            {/* <Col span={1} offset={1}>
              <Switch />
            </Col> */}
            <Col span={24}>
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
          </Row>
          <Row>
            {/* <Col span={1} offset={1}></Col> */}
            <Col span={24}>
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
            {/* <Col span={1} offset={1}>
              <Switch />
            </Col> */}
            <Col span={24}>
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
          <Divider />
          <Row gutter={16}>
            <Col offset={4}>
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
      </Drawer>
    </>
  );
};

export default SalesSearchForm;
