import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Button,
  Drawer,
  Row,
  Col,
  Form,
  Select,
  Input,
  DatePicker,
  Divider,
  Space,
  InputNumber,
  Empty,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Loading from '../../modules/common/Loding';

const TaskFormTemplate = styled.div`
  display: flex;
  .form1 .form2 {
    div {
      display: inline-block;
    }
  }
`;

const ProjectAddForm = (props) => {
  const [tasks, setTasks] = useState();
  const [input, setInput] = useState({ name: null });
  const [count, setCount] = useState(0);
  const visible = props.visible;
  const loading = props.loading;
  const btnDisabled = props.btnDisabled;
  const handleOnClose = props.handleOnClose;
  const handleOnChange = props.handleOnChange;
  const customers = props.customers;
  const services = props.codebook ? props.codebook[0].data.data : [];
  const statuses = props.codebook ? props.codebook[1].data.data : [];
  const teams = props.teams ? props.teams : [];
  const code_tasks = props.tasks;
  const cusTasksId = props.cusTasksId;
  const onSubmit = props.onSubmit;

  useEffect(() => {
    setTasks(code_tasks);
  }, [code_tasks]);

  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    // form.setFieldsValue({ workingDay: moment() });
  };

  const remove = (e) => {
    const test = tasks.filter((arr) => arr.id !== e);
    setTasks(test);
  };

  const add = () => {
    const totalCnt = cusTasksId.length;
    console.log('-----totalCnt/curCnt-----', totalCnt, count);
    if (input.name && input.name.length >= 2 && count < totalCnt) {
      console.log('-----tasks-----', tasks);
      // const newCount = count + 1;
      const newArr = {
        id: cusTasksId[count],
        attributes: { code: 'custom', name: input.name, sort: input.sort },
      };
      console.log('-----newArr-----', newArr);
      setCount(count + 1);
      setTasks([...tasks, newArr]);
      setInput({ name: null });
      console.log('-----tasks-----', tasks);
    } else {
      console.log('>>>>>>>>>>>>:task 글자수 2자 이하 or 추가 가능 수량 초과');
    }
  };

  const taskOnchang = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  console.log('>>>>>>>>>>>>>>', visible);

  return (
    <>
      <Drawer
        title="프로젝트 등록"
        width={800}
        // onClose={addSalesOnClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={handleOnClose}>Cancel</Button>
          </Space>
        }
      >
        <Form
          form={form}
          onFinish={onSubmit}
          layout="vertical"
          //   initialValues={{  }}
          //   onValuesChange={onFormLayoutChange}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="고객사"
                name="customer"
                rules={[{ required: true }]}
              >
                <Select>
                  {loading
                    ? ''
                    : customers.map((customer, index) => {
                        return (
                          <Select.Option key={customer.id} value={customer.id}>
                            {customer.attributes.name}
                          </Select.Option>
                        );
                      })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="서비스"
                name="code_service"
                rules={[{ required: true }]}
              >
                <Select onChange={handleOnChange}>
                  {services.map((service, index) => {
                    return (
                      <Select.Option key={service.id} value={service.id}>
                        {service.attributes.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="상태"
                name="code_status"
                rules={[{ required: true }]}
              >
                <Select>
                  {statuses.map((status, index) => {
                    return (
                      <Select.Option key={status.id} value={status.id}>
                        {status.attributes.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="프로젝트명"
                name="name"
                rules={[
                  { required: true, message: '프로젝트명을 입력해 주세요.' },
                ]}
              >
                <Input placeholder="프로젝트명을 입력해 주세요!!" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="사업부"
                name="scode_team"
                rules={[{ required: true }]}
              >
                <Select>
                  {teams.map((team, index) => {
                    return (
                      <Select.Option key={team.id} value={team.id}>
                        {team.attributes.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row gitter={16}>
            {tasks ? (
              tasks.map((list, index) => {
                // const newName =
                //   list.attributes.code === 'custom'
                //     ? `_k_${list.id}__${list.attributes.name}`
                //     : `_k_${list.id}`;
                const _custom =
                  list.attributes.code === 'custom' ? list.attributes.name : '';
                return (
                  <Col key={list.id} span={12} style={{ padding: '5px 10px' }}>
                    <div>
                      <span>{list.attributes.name}</span>
                      <MinusCircleOutlined onClick={() => remove(list.id)} />
                    </div>
                    <TaskFormTemplate>
                      <Form.Item
                        name={`_k_${list.id}__mp__${_custom}`}
                        // label={list.attributes.name}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        className="form1"
                      >
                        <InputNumber placeholder="인" />
                      </Form.Item>
                      <Form.Item
                        name={`_k_${list.id}__planday__${_custom}`}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        className="form2"
                      >
                        <InputNumber placeholder="일" />
                      </Form.Item>
                      <Form.Item
                        name={`_k_${list.id}__start__${_custom}`}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        className="form3"
                      >
                        <DatePicker placeholder="계획(시작일)" />
                      </Form.Item>
                    </TaskFormTemplate>
                  </Col>
                );
              })
            ) : (
              <Empty />
            )}
          </Row>
          {tasks ? (
            <>
              <Divider />
              <Row gitter={16}>
                <Col>
                  Task name:
                  <br />
                  <input
                    name="name"
                    type="text"
                    onChange={taskOnchang}
                    value={input.name || ''}
                    style={{ width: '200px' }}
                  />
                </Col>

                <Col span={8}>
                  <br />
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            ''
          )}
          <Divider />
          <Row gutter={16}>
            <Col span={12}></Col>
          </Row>
          <Row gutter={16}>
            {/* <Col span={6}>
              <Form.Item
                label="계획(시작)"
                name="plan_startdate"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </Col> */}
            <Col span={6}>
              <Form.Item
                label="계획(종료)"
                name="plan_enddate"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            {/* <Col span={6}>
              <Form.Item
                label="시작일"
                name="startdate"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="종료일" name="enddate">
                <DatePicker />
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={16}></Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="계약여부" name="contracted"></Form.Item>
              <Form.Item
                label="프로젝트 금액"
                name="price"
                // rules={[{ required: true }]}
              >
                <InputNumber addonAfter="￦" />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item label="비고" name="description">
                <Input.TextArea rows={5} id="description" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col>
              <Button type="primary" htmlType="submit" disabled={btnDisabled}>
                Submit
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

export default ProjectAddForm;
