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

const ProjectCount = ({ count }) => {
  let sum = 0;
  const total = count.map((data) => {
    sum = sum + data.data;
  });
  //   console.log('total', sum);

  return (
    <>
      {/* <div>
        <span>[완료: {count[3].data}건] .. </span>
        <span>[진행중: {count[1].data}건] .. </span>
        <span>[보류: {count[2].data}건] .. </span>
        <span>[시작전: {count[0].data}건] .. </span>
      </div> */}
      <StyledBlock>
        <Progress type="circle" percent={100} format={() => `전체-${sum}건`} />
        <span>--</span>
        <Progress
          type="circle"
          percent={(count[3].data / sum) * 100}
          format={() => `완료-${count[3].data}건`}
          strokeColor="black"
        />
        <span>--</span>
        <Progress
          type="circle"
          percent={(count[1].data / sum) * 100}
          format={() => `진행-${count[1].data}건`}
        />
        <span>--</span>
        <Progress
          type="circle"
          percent={(count[2].data / sum) * 100}
          format={() => `보류-${count[2].data}건`}
          status="exception"
        />
        <span>--</span>
        <Progress
          type="circle"
          percent={(count[0].data / sum) * 100}
          format={() => `시작전-${count[0].data}건`}
        />
      </StyledBlock>
    </>
  );
};

export default ProjectCount;
