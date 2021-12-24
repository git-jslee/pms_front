import React, { useState } from 'react';
import ProjectTimeForm from './ProjectTimeForm';
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

const ProjectForm = ({ id_project, responses }) => {
    
    console.log('responses>>>', responses);
    console.log('id_project>>>', id_project);
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
      };
    const code_types = responses[0].data;
    const customers = responses[1].data;
    const code_services = responses[2].data;
    const code_statuses = responses[3].data;
    const code_tasks = responses[4].data;
    console.log('code_tasks>>>', code_tasks);

    return (
        <>
            <Form
              labelCol={{
                  span: 4,
              }}
              wrapperCol={{
                  span: 14,
              }}
              layout="horizontal"
              initialValues={{
                  size: componentSize,
                  type: id_project.code_type.id,
                customer: id_project.customer.id,
                  project: id_project.name,
                  service: id_project.code_service.id,
                  status: id_project.code_status.id,
                //   startDate: id_project.planStartDate,
              }}
                //   initialValues={ init_view(projects) }
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
          <Form.Item label="구분" name="type" >
              <Select disabled={true} >
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
              <Select disabled={true}>
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
                  placeholder='프로젝트명을 입력해 주세요!!'
                  disabled={true}

             />
          </Form.Item>
          <Form.Item label="서비스" name="service">
              <Select disabled={true} >
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
              <Select disabled={true} >
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
          </Form>
          {
              code_tasks == null ? (
                <h1>로딩중1...</h1>
                ) : (
                <ProjectTimeForm code_tasks={code_tasks} id_project={id_project} />
                ) 
           }
            
        </>
    );
};

export default ProjectForm;