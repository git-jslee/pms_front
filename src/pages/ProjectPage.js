import React, { useState, useEffect } from 'react';
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

const ProjectPage = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [responses, setResponses] = useState([]);
  const [services, setServices] = useState();
  let code_types = [];
  let customers = [];
  let code_services = [];
  let code_statuses = [];
  let code_tasks = [];
  const navigate = useNavigate();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    axios
    .all([
        axios.get(`${API_URL}/code-types`),
        axios.get(`${API_URL}/customers`), 
        axios.get(`${API_URL}/code-services`),
        axios.get(`${API_URL}/code-statuses`),
        axios.get(`${API_URL}/code-tasks`),
    ])
    .then(
        // axios.spread((res1, res2) => {
        //     console.log(res1.data, res2.data)
        // })
        axios.spread((...responses) => {
        setResponses(responses);
        })
    )
    .catch((error) => {
        console.error('에러발생 : ', error)
    })
}, []);

    if(responses.length > 1) {
        code_types = responses[0].data;
        customers = responses[1].data;
        code_services = responses[2].data;
        code_statuses = responses[3].data;
        code_tasks = responses[4].data;
    }

  const onSubmit = (values) => {
      console.log(values)
      axios.post(`${API_URL}/projects`, {
          customer: values.customer,
          code_type: values.type,
          name: values.project,
          code_service: values.service,
          code_status: values.status,
          price: parseInt(values.price),
          planStartDate: values.startDate,
      }).then((result) => {
        axios_post(result.data.id, values);
        navigate('/');
      })
      .catch((error) => {
          console.error(error);
          message.error(`에러가 발생했습니다.  ${error.message}`)
      })
  };

  //task 별 작업시간 data 추가
  const axios_post = (id, values) => {
      console.log(id);
      console.log('services>>>>', services);
      console.log('values>>>>',values);
      services.map((service, index) => {
        axios.post(`${API_URL}/worktime-mgrs`, {
                project: id,
                code_task: service.id,
                planTime: values[service.code],
        })
      })
  }

  const onChange = (item) => {
      const getTasks = code_tasks.filter((v) => v.code_service.id === item);
      setServices(getTasks);
  }

  return (
      <>
          <h1>프로젝트 등록 페이지</h1>
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
                 {
                      code_types.map((type, index) => {
                          return (
                            <Select.Option key={index} value={type.id}>{type.name}</Select.Option>
                          )
                      })
                  }
              </Select>
          </Form.Item>
          <Form.Item label="고객사" name="customer">
              <Select>
                  {
                      customers.map((customer, index) => {
                          return (
                            <Select.Option key={index} value={customer.id}>{customer.name}</Select.Option>
                          )
                      })
                  }
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
          <Form.Item label="서비스" name="service">
              <Select onChange={onChange}>
                 {
                      code_services.map((service, index) => {
                          return (
                            <Select.Option key={index} value={service.id}>{service.name}</Select.Option>
                          )
                      })
                  }
              </Select>
          </Form.Item>
          <Form.Item label="상태" name="status">
              <Select>
                 {
                      code_statuses.map((status, index) => {
                          return (
                            <Select.Option key={index} value={status.id}>{status.name}</Select.Option>
                          )
                      })
                  }
              </Select>
          </Form.Item>
          <Form.Item label="시작일" name="startDate">
              <DatePicker />
          </Form.Item>
          <Form.Item label="수주금액" name="price">
              <InputNumber />
          </Form.Item>
          <Form.Item label="비고" name="description">
              <Input.TextArea size='large' id="description"/>
          </Form.Item>
          <Divider />
          {
              services !== undefined ? (
                services.map((code, index) => {
                    return (
                        <Form.Item key={index} label={code.name} name={code.code}>
                            <InputNumber />
                        </Form.Item>
                    )
                }
                )) : (
                  <h1>로딩중2</h1>
                ) 
          }
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

export default ProjectPage;