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
import { useSelector } from 'react-redux';
import { addCustomer } from '../../modules/customerForm';
import { useNavigate } from 'react-router-dom';
import { getCustomerlist } from '../../modules/customerList';
import { useDispatch } from 'react-redux';
import { setCustomerId } from '../../modules/common';
import { tbl_insert } from '../../modules/common/tbl_crud';

const { Option } = Select;

const AutoCompleteBlock = styled.div`
  .input-box {
    display: flex;
    width: 100%;
    padding-bottom: 5px;
  }
  .input-title {
    margin-right: 20px;
    padding-top: 4px;
  }

  .input-box > div {
    position: relative;
    margin-right: 10px;
  }
  .input-box input {
    /* width: 100%; */
    width: 300px;
  }
  .suggestion-box {
    position: absolute;
    top: 28px;
    left: 0;
    z-index: 50;
    width: 100%;
  }
  .suggestion {
    cursor: pointer;
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    background: #fff;
  }
  .suggestion:hover {
    background-color: gray;
  }
`;

const AutoComplete = ({ lists }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [visible, setVisible] = useState(false);

  // const { auth } = useSelector(({ auth }) => ({
  //   auth: auth.auth,
  // }));

  const onChangeHandler = (text) => {
    let matches = [];
    if (lists && text.length > 0) {
      matches = lists.filter((customer) => {
        const regex = new RegExp(`${text}`, 'gi');
        return customer.attributes.name.match(regex);
      });
    }
    console.log('matches', matches);
    setSuggestions(matches);
    setText(text);
  };

  const onSuggestHandler = (company) => {
    console.log('온클릭', company);
    setText(company.name);
    setSuggestions([]);
    dispatch(setCustomerId({ id: company.id, name: company.name }));
  };
  console.log('suggestion', suggestions);

  // drowser
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = async (values) => {
    console.log('고객등록-onSubmit..', values);
    // const jwt = auth.jwt;
    const customer_data = {
      name_eng: values.customerId,
      name: values.name,
      business_number: values.businessNumber,
      business_type: values.businessType,
      description: values.description,
    };
    try {
      const result = await tbl_insert('api/customers', customer_data);
      console.log('result', result);
      // addCustomer(datas);
      // 고객등록 성공시 페이지 이동 기능 구현 필요
      setVisible(false);
      // navigate('/customer');
      dispatch(getCustomerlist());
    } catch (error) {
      console.log('고객등록 에러', error);
    }
  };

  return (
    <>
      {/* autocomplete 기능 적용 */}
      <AutoCompleteBlock>
        <div className="input-box">
          <div className="input-title">고객검색</div>
          <div>
            <input
              type="text"
              onChange={(e) => onChangeHandler(e.target.value)}
              value={text}
              //   다른영역클릭시 suggestion 값 삭제

              // onBlur={() => {
              //   setTimeout(() => {
              //     console.log('onBlur..');
              //     setSuggestions([]);
              //   }, 100);
              // }}
            />
            <div className="suggestion-box">
              {suggestions &&
                suggestions.map((suggestion, i) => (
                  <div
                    key={suggestion.id}
                    className="suggestion"
                    onClick={() => onSuggestHandler(suggestion)}
                  >
                    {suggestion.attributes.name}
                  </div>
                ))}
            </div>
          </div>
          <Button onClick={showDrawer} icon={<PlusOutlined />}>
            고객등록
          </Button>
        </div>
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
              <Form.Item name="businessNumber" label="사업자번호">
                <Input placeholder="사업자 번호 입력" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="businessType"
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
