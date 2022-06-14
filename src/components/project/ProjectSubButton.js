import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, DatePicker, Col, Row, Form } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

const SubMenuBlock = styled.div`
  display: inline;
  .search {
    margin-left: 20px;
    margin-right: 60px;
    display: inline;
  }
  .inline {
    margin-left: 10px;
    display: inline-block;
  }
  .inline > form {
    margin-left: 10px;
    display: inline;
  }
`;

const ProjectSubButton = ({
  subSearchOnSubmit,
  advancedSearch,
  handleOnClick,
  reload,
  subMenu,
}) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <SubMenuBlock>
        <Button onClick={() => handleOnClick('add')}>등록</Button>
        <Button onClick={() => handleOnClick('menu1')}>Count</Button>
        <Button onClick={() => handleOnClick('menu2')}>작업통계</Button>
        <Button onClick={() => handleOnClick('menu3')}>상세조회</Button>
        <Button onClick={() => handleOnClick('menu4')}>투입률</Button>

        <div className="search">
          <RedoOutlined
            onClick={reload}
            style={{ fontSize: '24px', color: '#08c', marginLeft: '10px' }}
          />
        </div>
        {/* 작업통계, 투입률 선택시 기간별 조회 기능 활성화 */}
        {subMenu === 'menu2' || subMenu === 'menu4' ? (
          <div className="inline">
            <Form onFinish={subSearchOnSubmit} form={form}>
              <Row>
                <Col className="inline">
                  <Form.Item name="date" label="기준일자">
                    {subMenu === 'menu2' ? (
                      <RangePicker />
                    ) : (
                      <RangePicker picker="month" />
                    )}
                  </Form.Item>
                </Col>
                <Col offset={2} className="inline">
                  <Button type="primary" htmlType="submit">
                    조회
                  </Button>
                </Col>
                <Col className="inline">
                  <Button htmlType="button" onClick={onReset}>
                    초기화
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        ) : (
          ''
        )}
        <hr />
      </SubMenuBlock>
      {/* conent */}
    </>
  );
};

export default ProjectSubButton;
