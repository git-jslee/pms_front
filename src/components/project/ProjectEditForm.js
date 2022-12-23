import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import moment from 'moment';
import ProjectTaskTableEdit from './ProjectTaskTableEdit';
import {
  Button,
  Table,
  Drawer,
  Row,
  Col,
  Form,
  Select,
  Input,
  DatePicker,
  Switch,
  Checkbox,
  Divider,
  Space,
  InputNumber,
  Empty,
} from 'antd';
import project from '../../modules/project';

const ProjectEditForm = ({
  visible,
  btnDisabled,
  record,
  code_status,
  onClose,
  onSubmit,
  handleCheck,
  checkbox,
  editFormMode,
  handleEditFormMode,
}) => {
  // const [editMode, setEditMode] = useState(true);
  const [issueType, setIssueType] = useState('issue');
  const [issueLevel, setIssueLevel] = useState('low');
  const [issueState, setIssueState] = useState('ing');
  const [tasks, setTasks] = useState();
  const _status = checkbox['code_status'] === true ? true : false;
  const _plan_start = checkbox['plan_startdate'] === true ? true : false;
  const _plan_end = checkbox['plan_enddate'] === true ? true : false;
  const _startdate = checkbox['startdate'] === true ? true : false;
  const _enddate = checkbox['enddate'] === true ? true : false;
  const _contracted = checkbox['contracted'] === true ? true : false;
  const _price = checkbox['price'] === true ? true : false;
  const _description = checkbox['description'] === true ? true : false;

  const { pjt_status } = useSelector(({ project }) => ({
    pjt_status: project.status.id,
  }));
  const { pjtTasks } = useSelector (({ project }) => ({
    pjtTasks : project.data[pjt_status][record.arr_no].attributes.project_tasks.data
    ,
  }))
  console.log('pjttasks', pjtTasks)

  const enddate = record.enddate ? moment(record.enddate) : '';
  //22-09-01 -> 2022-09-01 형태로 변경
  const plan_enddate = record.plan_enddate
    ? moment(`20${record.plan_enddate}`)
    : '';
  const contracted = record.contracted === 'Yes' ? true : false;
  const initialValues = {
    id: record.id,
    code_status: record.code_status,
    plan_startdate: moment(record.plan_startdate),
    plan_enddate: plan_enddate,
    startdate: moment(record.startdate),
    enddate: enddate,
    price: record.price,
    issue_type: issueType,
    risk_level: issueLevel,
    issue_state: 'ing',
  };

  useEffect(() => {
    return () => {
      handleEditFormMode('pjt-update');
    };
  }, []);

  const changeIssueType = (v) => {
    setIssueType(v);
  };

  const changeIssueLevel = (v) => {
    // console.log('>>>>>issue level', v);
    setIssueLevel(v);
  };

  const changeIssueState = (v) => {
    setIssueState(v);
  };

  return (
    <>
      <Drawer
        title={`(ID:${record.id})${record.customer}-${record.name}`}
        width={600}
        visible={visible}
        onClose={!btnDisabled ? () => onClose(true) : () => onClose(false)}
        extra={
          <Space>
            <Button
              onClick={
                !btnDisabled ? () => onClose(true) : () => onClose(false)
              }
            >
              Cancel
            </Button>
          </Space>
        }
      >
        <Form
          onFinish={onSubmit}
          layout="vertical"
          initialValues={initialValues}
          // onValuesChange={onFormLayoutChange}
        >
          <Row>
            {/* <Button
              onClick={() =>
                handleEditFormMode(editFormMode === 'pjt-update' ? 'issue' : 'pjt')
              }
            >
              {editFormMode === 'pjt-update' ? '이슈/회의내용 등록' : 'pjt - update'}
            </Button> */}
            <Button onClick={()=>handleEditFormMode('pjt-update')}>pjt-update</Button>
            <Button onClick={()=>handleEditFormMode('pjt-task')}>Task 수정</Button>
            <Button onClick={()=>handleEditFormMode('pjt-issue')}>이슈/회의내용 등록</Button>
          </Row>
          <Divider />
          {/* <-- edit mode */}
          {editFormMode === 'pjt-update' ? (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Space>
                    <Checkbox data-id="code_status" onChange={handleCheck} />
                    <span>상태</span>
                  </Space>
                  <Form.Item
                    // label="상태"
                    name="code_status"
                    rules={[{ required: _status }]}
                  >
                    <Select disabled={!_status}>
                      {code_status.map((status, index) => {
                        return (
                          <Select.Option key={status.id} value={status.id}>
                            {status.attributes.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6} offset={6}>
                  <Form.Item label="ID" name="id">
                    <Input disabled={true}>{}</Input>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>


                <Col span={12}>
                  <Space>
                    <Checkbox data-id="plan_enddate" onChange={handleCheck} />
                    <span>종료일(계획)</span>
                  </Space>
                  <Form.Item
                    // label="계획종료"
                    name="plan_enddate"
                    rules={[{ required: true }]}
                  >
                    <DatePicker disabled={!_plan_end} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>

              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Space>
                    <Checkbox data-id="contracted" onChange={handleCheck} />
                    <span>계약여부</span>
                  </Space>
                  <Form.Item
                    // label="계약여부"
                    name="contracted"
                    valuePropName="ckecked"
                  >
                    <Switch
                      defaultChecked={contracted}
                      disabled={!_contracted}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Space>
                    <Checkbox data-id="price" onChange={handleCheck} />
                    <span>수주금액</span>
                  </Space>
                  <Form.Item name="price">
                    <InputNumber
                      prefix="￦"
                      style={{
                        width: '100%',
                      }}
                      disabled={!_price}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Space>
                    <Checkbox data-id="description" onChange={handleCheck} />
                    <span>비고</span>
                  </Space>
                  <Form.Item name="description">
                    <Input.TextArea id="description" disabled={!_description} />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : "" }
          {editFormMode === 'pjt-task' ? (
            <ProjectTaskTableEdit tasks={pjtTasks}  />
          ):''}
          
          {editFormMode === 'pjt-issue' ?
          (
            <>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="type" name="issue_type">
                    <Select onChange={changeIssueType}>
                      <Select.Option value="issue">이슈등록</Select.Option>
                      <Select.Option value="meet">회의내용등록</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
                    label="name"
                    name="issue_name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              {/* type 이 issue 일 경우에만 risk, status 등록 */}
              {issueType === 'issue' ? (
                <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="risk level"
                        name="risk"
                        rules={[{ required: true }]}
                      >
                        <Select onChange={changeIssueLevel}>
                          <Select.Option value="high">high</Select.Option>
                          <Select.Option value="medium">medium</Select.Option>
                          <Select.Option value="low">low</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="issue state" name="issue_state">
                        <Select onChange={changeIssueState} disabled={true}>
                          <Select.Option value="ing">ing</Select.Option>
                          <Select.Option value="fin">fin</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ) : (
                ''
              )}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="date"
                    name="issue_date"
                    rules={[{ required: true }]}
                  >
                    <DatePicker disabled={false} />
                  </Form.Item>
                </Col>
                {/* <Col span={12}>
                  <Form.Item label="resolution date" name="resolution_date">
                    <DatePicker disabled={true} />
                  </Form.Item>
                </Col> */}
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="memo"
                    name="memo"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : ''}

          {/* 공통 */}
          <Divider />
          <Row gutter={16}>
            <Col>
              <Button
                id="submit-button"
                htmlType="submit"
                disabled={btnDisabled}
              >
                update
              </Button>
            </Col>
            <Col>
              <Button htmlType="button" disabled={true}>
                초기화
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default ProjectEditForm;
