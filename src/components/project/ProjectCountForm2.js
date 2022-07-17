import React from 'react';
import styled from 'styled-components';
import paletteJY from '../../lib/styles/palette_JY';
import { Button, Space, Row, Col } from 'antd';
import Progress from '../common/Progress';
import $ from 'jquery';

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
  & > div:nth-child(3) {
    grid-area: 1 / 3 / 2 / 6;
  }
  & > div[name='대  기'] p,
  & > div[name='진  행'] p {
    color: cornflowerblue;
  }
  & > div[type='square']:not(:last-child)::after,
  & > div:nth-child(n + 6):nth-child(-n + 7)::after {
    display: block;
    content: '';
    width: 12px;
    height: 24px;
    background: url(images/icon-arrow-r.svg) no-repeat center / contain;
    position: absolute;
    top: 50%;
    right: -48px;
    transform: translateY(-50%);
    pointer-events: none;
  }
  & > div:nth-child(6)::after {
    background-image: url(images/icon-arrow-lr.svg) !important;
    width: 42px !important;
    height: 22px !important;
    right: -60px !important;
  }
`;

const ProjectCountForm2 = ({
  count,
  progressCount,
  countFormOnclick,
  progressButtonOnclick,
  qs_filter,
  selectedBt,
}) => {
  // console.log('**count**', count);
  //0-시작전, 1-진행중, 2-보류, 3-완료, 4-대기

  return (
    <>
      <StyledBlock>
        <ButtonSectionBlock>
          <ButtonArticle>
            <Button
              type={selectedBt[0] === 'bt0' ? 'primary' : ''}
              onClick={() => qs_filter('매출-전체')}
            >
              전 체
            </Button>
            <Button
              type={selectedBt[0] === 'bt1' ? 'primary' : ''}
              onClick={() => qs_filter('매출')}
            >
              매 출
            </Button>
            <Button
              type={selectedBt[0] === 'bt2' ? 'primary' : ''}
              onClick={() => qs_filter('비매출')}
            >
              비매출
            </Button>
            <Button></Button>
            {selectedBt[0] === 'bt1' ? (
              <>
                <Button
                  type={selectedBt[2] === 'bt0' ? 'primary' : ''}
                  onClick={() => qs_filter('계약-전체')}
                >
                  전 체
                </Button>
                <Button
                  type={selectedBt[2] === 'bt1' ? 'primary' : ''}
                  onClick={() => qs_filter('계약')}
                >
                  계 약
                </Button>
                <Button
                  type={selectedBt[2] === 'bt2' ? 'primary' : ''}
                  onClick={() => qs_filter('예정')}
                >
                  예 정
                </Button>
              </>
            ) : (
              ''
            )}
          </ButtonArticle>
          <ButtonArticle>
            <Button
              type={selectedBt[1] === 'bt0' ? 'primary' : ''}
              onClick={() => qs_filter('사업-전체')}
            >
              전 체
            </Button>
            <Button
              type={selectedBt[1] === 'bt1' ? 'primary' : ''}
              onClick={() => qs_filter('디자인')}
            >
              디자인
            </Button>
            <Button
              type={selectedBt[1] === 'bt2' ? 'primary' : ''}
              onClick={() => qs_filter('영상')}
            >
              영 상
            </Button>
            <Button
              type={selectedBt[1] === 'bt3' ? 'primary' : ''}
              onClick={() => qs_filter('ICT')}
            >
              I C T
            </Button>
            <Button
              type={selectedBt[1] === 'bt4' ? 'primary' : ''}
              onClick={() => qs_filter('R&D')}
            >
              R&D
            </Button>
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
            {/* <Progress type="circle" name=".." />
            <Progress type="circle" name=".." /> */}
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
              count={`${count[5] ? count[5].count : 0}`}
              onClick={() => countFormOnclick(6)}
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
// $(function () {
//   $('section:first-child li, section:last-child article > div').click(
//     function () {
//       $(this).addClass('on').siblings().removeClass('on');
//     },
//   );
// });
export default ProjectCountForm2;
