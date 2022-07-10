import React from 'react';
import styled from 'styled-components';
import paletteJY from '../../lib/styles/palette_JY';
import { Button, Space, Row, Col } from 'antd';
import Progress from '../common/Progress';

const StyledBlock = styled.div`
  display: flex;
  background-color: ${paletteJY.gray[0]};
  /* background-color: white; */
`;

const ButtonSectionBlock = styled.section`
  display: flex;
  padding: 23px;
`;

const ButtonArticle = styled.article`
  &:first-child {
    margin-right: 40px;
  }
  button {
    display: block;
    width: 100px;
  }
`;

const CountSectionBlock = styled.section`
  padding: 40px 126px;
`;

const CountGridBlock = styled.article`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px 82px;
`;

const ProjectCountForm2 = ({
  count,
  progressCount,
  countFormOnclick,
  progressButtonOnclick,
  qs_filter,
}) => {
  // console.log('**count**', count);
  //0-시작전, 1-진행중, 2-보류, 3-완료, 4-대기

  return (
    <>
      <StyledBlock>
        <ButtonSectionBlock>
          <ButtonArticle>
            <Button onClick={() => qs_filter('매출-전체')}>전 체</Button>
            <Button onClick={() => qs_filter('매출')}>매 출</Button>
            <Button onClick={() => qs_filter('비매출')}>비매출</Button>
          </ButtonArticle>
          <ButtonArticle>
            <Button onClick={() => qs_filter('사업-전체')}>전 체</Button>
            <Button>디자인</Button>
            <Button>영 상</Button>
            <Button>I C T</Button>
            <Button>R&D</Button>
          </ButtonArticle>
        </ButtonSectionBlock>
        <CountSectionBlock>
          <CountGridBlock>
            <Progress type="circle" name="지원사업" count="0" />
            <Progress
              type="circle"
              name="보  류"
              count={`${count[2] ? count[2].count : 0}`}
              onClick={() => countFormOnclick(3)}
            />
            <Progress
              type="circle"
              name="대  기"
              count={`${count[4] ? count[4].count : 0}`}
              onClick={() => countFormOnclick(5)}
            />
            <Progress type="circle" name=".." />
            <Progress type="circle" name=".." />
            <Progress type="circle" name="사업계획" count="0" />
            <Progress
              type="circle"
              name="시작전"
              count={`${count[0] ? count[0].count : 0}`}
              onClick={() => countFormOnclick(1)}
            />
            <Progress
              type="circle"
              name="진  행"
              count={`${count[1] ? count[1].count : 0}`}
              onClick={() => countFormOnclick(2)}
            />
            <Progress
              type="circle"
              name="검  수"
              count={`${count[6] ? count[6].count : 0}`}
              onClick={() => countFormOnclick(7)}
            />
            <Progress
              type="circle"
              name="완  료"
              count={`${count[3] ? count[3].count : 0}`}
              onClick={() => countFormOnclick(4)}
            />
            <Progress
              type="square"
              name="10%"
              count={`${progressCount._10}`}
              onClick={() => progressButtonOnclick(10)}
            />
            <Progress
              type="square"
              name="25%"
              count={`${progressCount._25}`}
              onClick={() => progressButtonOnclick(25)}
            />
            <Progress
              type="square"
              name="50%"
              count={`${progressCount._50}`}
              onClick={() => progressButtonOnclick(50)}
            />
            <Progress
              type="square"
              name="75%"
              count={`${progressCount._75}`}
              onClick={() => progressButtonOnclick(75)}
            />
            <Progress
              type="square"
              name="90%"
              count={`${progressCount._90}`}
              onClick={() => progressButtonOnclick(90)}
            />
          </CountGridBlock>
        </CountSectionBlock>
      </StyledBlock>
    </>
  );
};

export default ProjectCountForm2;
