import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/constants';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Divider,
  message,
} from 'antd';

const AntdPage = () => {
    const [componentSize, setComponentSize] = useState('default');
    const navigate = useNavigate();
    const onFormLayoutChange = ({ size }) => {
      setComponentSize(size);
    };
    const onSubmit = (values) => {
        console.log(values)
        axios.post(`${API_URL}/projects`, {
            customer: values.customer,
            code_type: values.type,
            name: values.project,
            service: values.service,
            price: parseInt(values.price),
            planStartDate: values.startDate,
        }).then((result) => {
            console.log(result);
            navigate('/project');
        }).catch((error) => {
            console.error(error);
            message.error(`에러가 발생했습니다.  ${error.message}`)
        })
    };

    return (
        <>
            <h1>프로젝트 등록 페이지</h1>
            <Button>프로젝트 등록</Button>
            <hr></hr>
            <Form
                labelCol={{
                    span: 4,
                }}
                onFinish={onSubmit}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                >
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="구분" name="type">
                <Select>
                <Select.Option value={1}>프로젝트</Select.Option>
                <Select.Option value={2}>유지보수</Select.Option>
                <Select.Option value={3}>샘플작업</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="고객사" name="customer">
                <Select>
            <Select.Option value={1}>크레아코퍼레이션</Select.Option>
                <Select.Option value={2}>CWCC</Select.Option>
                <Select.Option value={3}>CREA</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="서비스" name="service">
                <Select>
                <Select.Option value={1}>홈페이지</Select.Option>
                <Select.Option value={2}>영상제작</Select.Option>
                <Select.Option value={4}>3D제작</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item 
                label={<div className='form-lavel'>프로젝트명</div>}
                name="project"
                rules={[{required: true, message: '프로젝트명을 입력해 주세요.'}]}
            >
                <Input 
                    className = 'project-name'
                    size='large'
                    placeholder='프로젝트명을 입력해 주세요'/>
            </Form.Item>
            <Form.Item label="Select" name='select'>
                <Select>
                <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="시작일" name="startDate">
                <DatePicker />
            </Form.Item>
            <Form.Item label="금액" name="price">
                <InputNumber />
            </Form.Item>
            <Form.Item>
                <Input.TextArea size='large' id="description"/>
            </Form.Item>
            <Divider />
            <Form.Item label="Switch" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item>
                <Button id='submit-button' size='large' htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
            <Divider />
            </Form>
         </>
    );
};

export default AntdPage;