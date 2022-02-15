import React, { useState } from 'react';
import styled from 'styled-components';
// import Button from './Button';
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
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const AutoCompleteBlock = styled.div`
  .suggestion {
    cursor: pointer;
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
  }
  .suggestion:hover {
    background-color: gray;
  }
`;

const AutoComplete = ({ lists }) => {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [visible, setVisible] = useState(false);

  const onChangeHandler = (text) => {
    let matches = [];
    if (lists && text.length > 0) {
      matches = lists.filter((customer) => {
        const regex = new RegExp(`${text}`, 'gi');
        return customer.name.match(regex);
      });
    }
    console.log('matches', matches);
    setSuggestions(matches);
    setText(text);
  };

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };
  console.log('suggestion', suggestions);

  // drowser
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onSubmit = (e) => {
    console.log('eee', e);
    // setVisible(false);
  };

  return (
    <>
      {/* autocomplete 기능 적용 */}
      <AutoCompleteBlock>
        <span>고객검색</span>
        <input
          type="text"
          onChange={(e) => onChangeHandler(e.target.value)}
          value={text}
          //   다른영역클릭시 suggestion 값 삭제
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([]);
            }, 100);
          }}
        />
        <Button onClick={showDrawer} icon={<PlusOutlined />}>
          고객등록
        </Button>
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <div
              key={suggestion.id}
              className="suggestion"
              onClick={() => onSuggestHandler(suggestion.name)}
            >
              {suggestion.name}
            </div>
          ))}
      </AutoCompleteBlock>
      <Drawer
        title="신규 고객 등록"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark onFinish={onSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="customerId"
                label="고객ID"
                rules={[{ required: true, message: '고객ID를 입력하세요' }]}
              >
                <Input placeholder="고객명(영문)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="고객명"
                rules={[{ required: true, message: '고객명을 입력하세요' }]}
              >
                <Input placeholder="고객명(한글)" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="owner" label="사업자번호">
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="기업구분"
                rules={[{ required: true, message: '기업구분을 입력하세요' }]}
              >
                <Select placeholder="일반기업/공기업">
                  <Option value="general">일반기업</Option>
                  <Option value="public">공기업</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="url" label="Url">
                <Input
                  style={{ width: '100%' }}
                  addonBefore="http://"
                  //   addonAfter=".co.kr"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="used" label="Used" checked={true}>
                <Switch defaultChecked value={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="description" label="비 고">
                <Input.TextArea rows={4} placeholder="description" />
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

export default AutoComplete;
