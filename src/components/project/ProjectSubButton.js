import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DatePicker, Col, Row, Form } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import paletteJY from '../../lib/styles/palette_JY';
import Button from '../common/Button';

const { RangePicker } = DatePicker;

const SubMenuBlock = styled.div`
  width: 100%;
  box-shadow: 15px 10px 20px rgba(181 191 198 / 46%),
    -15px -10px 20px rgba(255 255 255 / 52%);
  margin-bottom: 22px;
  border-radius: 6px;
  background: ${paletteJY.gray[0]};
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;

  /* 버튼 */
  .btnWrap {
    display: flex;
    button {
      border: 0;
      line-height: 31px;
      width: 90px;
      height: 33px;
      box-shadow: none;
      background: ${paletteJY.gray[0]};
      color: ${paletteJY.gray[2]};
      font-size: 16px;
      border-radius: 4px;
      margin-right: 2px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        box-shadow: inset 2px 2px 5px rgba(181 191 198 / 46%),
          inset -5px -3px 0px rgba(255 255 255 / 52%);
      }

      /* span {
        display: block;
        width: 86px;
        height: 29px;
        margin: 0 auto;
        border-radius: 4px;
      }
      &.on span {
        background-color: ${paletteJY.blue};
        color: #fff;
      } */
    }
  }

  /* 기준일자 */
  form {
    line-height: 1;

    .ant-form-item-label > label::after {
      display: none;
    }
    label {
      font-size: 16px;
      color: ${paletteJY.gray[2]};
    }
    .ant-form-item-label {
      margin-right: 16px;
    }
    .ant-picker {
      box-shadow: inset 2px 2px 3px rgba(181 191 198 / 46%),
        inset -5px -3px 0px rgba(255 255 255 / 52%);
      border: 0;
    }
    .ant-picker-range .ant-picker-active-bar {
      background-color: ${paletteJY.blue};
    }
    .ant-picker-input > input {
      ::placeholder {
        color: ${paletteJY.gray[4]};
      }
      color: ${paletteJY.gray[2]};
    }
    button {
      width: 60px;
      height: 30px;
      line-height: 32px;
      padding: 0;
      border-radius: 3px;
      background: #fff;
      &.submit {
        background: ${paletteJY.blue};
        color: #fff;
      }
    }
  }

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
    /* display: inline; */
  }

  .ant-form-item {
    margin-bottom: 0;
  }
  .ant-form-item-label > label {
    margin-bottom: 0;
  }
`;

const ProjectSubButton = ({
  subSearchOnSubmit,
  advancedSearch,
  handleOnClick,
  reload,
  subMenu,
  buttonState,
}) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <SubMenuBlock>
        <div className="btnWrap">
          <Button onClick={() => handleOnClick('add')}>등록</Button>
          <Button
            onClick={() => handleOnClick('menu1')}
            type={subMenu === 'menu1' ? 'primary' : ''}
            // className="on"
          >
            <span>현황</span>
          </Button>
          <Button
            onClick={() => handleOnClick('menu2')}
            type={subMenu === 'menu2' ? 'primary' : ''}
          >
            <span>작업통계</span>
          </Button>
          {/* <Button onClick={() => handleOnClick('menu3')}>상세조회</Button> */}
          <Button
            onClick={() => handleOnClick('menu4')}
            type={subMenu === 'menu4' ? 'primary' : ''}
          >
            <span>투입률</span>
          </Button>
        </div>

        {/* <div className="search">
          <RedoOutlined
            onClick={reload}
            style={{ fontSize: '24px', color: '#08c', marginLeft: '10px' }}
          />
        </div> */}
        {/* 작업통계, 투입률 선택시 기간별 조회 기능 활성화 */}
        {subMenu === 'menu1' || subMenu === 'menu2' || subMenu === 'menu4' ? (
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
                  <Button type="primary" htmlType="submit" className="submit">
                    조회
                  </Button>
                </Col>
                <Col className="inline">
                  <Button htmlType="button" onClick={onReset} className="reset">
                    초기화
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        ) : (
          ''
        )}
      </SubMenuBlock>
      {/* conent */}
    </>
  );
};

export default ProjectSubButton;
