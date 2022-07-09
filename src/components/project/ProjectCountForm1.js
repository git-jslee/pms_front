import React from 'react';
import styled from 'styled-components';
import { Progress, Button, Space, Row, Col } from 'antd';

const StyledBlock = styled.div`
  /* position: absolute; */
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  div {
    margin: 5px 20px 5px 20px;
    &:hover {
      /* background-color: gray; */
    }
  }
`;

const ProjectCountForm1 = ({ count, countFormOnclick }) => {
  console.log('**count**', count);
  //0-시작전, 1-진행중, 2-보류, 3-완료, 4-대기

  return (
    <>
      <StyledBlock>
        <Col span={2}>
          <Row>
            <Button type="primary" size="small">
              전 체
            </Button>
          </Row>
          <Row>
            <Button size="small">매 출</Button>
          </Row>
          <Row>
            <Button size="small">비매출</Button>
          </Row>
        </Col>
        <Col span={22}>
          <Row>
            <Col span={4}>
              <Row>
                <Progress
                  type="circle"
                  // percent={(count[0].data / sum) * 100}
                  format={() => `시작전-${count[0] ? count[0].count : 0}건`}
                  onClick={() => countFormOnclick(1)}
                />
              </Row>
              <Row>
                <Progress
                  type="circle"
                  // percent={(count[2].data / sum) * 100}
                  format={() => `보류-${count[2] ? count[2].count : 0}건`}
                  status="exception"
                  onClick={() => countFormOnclick(3)}
                />
              </Row>
            </Col>
            <Col span={18}>
              <Row>
                <Progress
                  type="circle"
                  // percent={(count[1].data / sum) * 100}
                  format={() => `진행-${count[1] ? count[1].count : 0}건`}
                  onClick={() => countFormOnclick(2)}
                />
                <span>--</span>
                <Progress
                  type="circle"
                  format={() => `대기-${count[4] ? count[4].count : 0}건`}
                  status="exception"
                  onClick={() => countFormOnclick(5)}
                />
                <span>--</span>
                <Progress
                  type="circle"
                  // percent={(count[3].data / sum) * 100}
                  format={() => `완료-${count[3] ? count[3].count : 0}건`}
                  strokeColor="black"
                  onClick={() => countFormOnclick(4)}
                />
              </Row>
              <Row>
                <Progress type="circle" width={90} format={() => `2건`} />
                <Progress type="circle" width={90} format={() => `3건`} />
                <Progress type="circle" width={90} format={() => `4건`} />
                <Progress type="circle" width={90} format={() => `5건`} />
                <Progress type="circle" width={90} format={() => `6건`} />
              </Row>
            </Col>
          </Row>
        </Col>
      </StyledBlock>
    </>
  );
};

export default ProjectCountForm1;
