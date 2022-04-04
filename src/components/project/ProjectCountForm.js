import React from 'react';
import styled from 'styled-components';
import { Progress } from 'antd';

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

const ProjectCountForm = ({ count, countFormOnclick }) => {
  console.log('**count**', count);
  //0-시작전, 1-진행중, 2-보류, 3-완료

  return (
    <>
      <StyledBlock>
        <Progress
          type="circle"
          // percent={(count[3].data / sum) * 100}
          format={() => `완료-${count[3] ? count[3].count : 0}건`}
          strokeColor="black"
          onClick={() => countFormOnclick(4)}
        />
        <span>--</span>
        <Progress
          type="circle"
          // percent={(count[1].data / sum) * 100}
          format={() => `진행-${count[1] ? count[1].count : 0}건`}
          onClick={() => countFormOnclick(2)}
        />
        <span>--</span>
        <Progress
          type="circle"
          // percent={(count[2].data / sum) * 100}
          format={() => `보류-${count[2] ? count[2].count : 0}건`}
          status="exception"
          onClick={() => countFormOnclick(3)}
        />
        <span>--</span>
        <Progress
          type="circle"
          // percent={(count[0].data / sum) * 100}
          format={() => `시작전-${count[0] ? count[0].count : 0}건`}
          onClick={() => countFormOnclick(1)}
        />
      </StyledBlock>
    </>
  );
};

export default ProjectCountForm;
