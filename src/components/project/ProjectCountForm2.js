import React from 'react';
import styled from 'styled-components';
import paletteJY from '../../lib/styles/palette_JY';
import { Space, Row, Col } from 'antd';
import Progress from '../common/Progress';
import Button1 from '../common/Button1';

const StyledBlock = styled.div`
  display: flex;
  background-color: ${paletteJY.gray[0]};
  /* background-color: white; */
  box-shadow: 10px 10px 12px rgba(181 191 198 / 46%),
    -12px -11px 11px rgba(255 255 255 / 52%);
  border-radius: 6px;
  margin-bottom: 22px;
`;

const ButtonSectionBlock = styled.section`
  display: flex;
  padding: 23px 0 23px 23px;
`;

const ButtonArticle = styled.article`
  border-right: 1px solid ${paletteJY.gray[3]};
  padding-right: 23px;
  &:first-child {
    padding-right: 24px;
    margin-right: 30px;
    border-right: 1px solid ${paletteJY.gray[3]};
  }
  .bTop {
    margin-bottom: 22px;
    padding-bottom: 22px;
    border-bottom: 1px solid ${paletteJY.gray[3]};
  }
  button {
    display: block;
    width: 90px;
    border: none;
    border-radius: 4px;
    background-color: ${paletteJY.gray[0]};
    color: ${paletteJY.gray[2]};
    font-size: 16px;
    box-shadow: none;
    margin-bottom: 10px;
    &:hover,
    &:focus {
      background-color: ${paletteJY.gray[0]};
      color: ${paletteJY.gray[2]};
      box-shadow: inset 2px 2px 2px rgba(181 191 198 / 46%),
        inset -3px -3px 1px rgba(255 255 255 / 52%);
    }
    span {
      display: inline-block;
      text-align: justify;
      width: 58px;
      white-space: normal;
      &::after {
        content: '';
        display: inline-block;
        width: 100%;
      }
    }
  }
  .switch {
    display: flex;
    margin-bottom: 3px;
    color: ${paletteJY.gray[2]};
    &:first-child {
      padding-top: 8px;
    }
    span {
      padding-top: 2px;
      font-size: 16px;
      display: inline-block;
      text-align: justify;
      width: 58px;
      white-space: normal;
      margin-right: 20px;
      &::after {
        content: '';
        display: inline-block;
        width: 100%;
      }
    }
    input {
      display: none;
    }
    label {
      width: 38px;
      display: flex;
      align-items: center;
      height: 20px;
      box-shadow: 1px 2px 5px rgba(181 191 198 / 46%),
        -2px -2px 0px rgba(255 255 255 / 52%),
        inset 1px 2px 3px rgba(181 191 198 / 46%),
        inset -2px -2px 0px rgba(255 255 255 / 52%);
      background: rgba(255, 255, 255, 0);
      position: relative;
      cursor: pointer;
      border-radius: 1.6rem;
      &::after {
        content: '';
        position: absolute;
        left: 0.4rem;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: ${paletteJY.gray[0]};
        transition: all 0.4s ease;
        box-shadow: 1px 1px 2px rgba(181 191 198 / 46%),
          -1px -1px 1px rgba(255 255 255 / 52%);
      }
      &::before {
        content: '';
        width: 91%;
        height: 85%;
        border-radius: inherit;
        background: ${paletteJY.blue};
        opacity: 0;
        transition: all 0.4s ease;
        position: relative;
        left: 2px;
      }
    }

    & input:checked {
      & ~ label {
        &::before {
          opacity: 1;
        }
        &::after {
          left: 57%;
          background: ${paletteJY.gray[0]};
        }
      }
    }
  }
`;

const CountSectionBlock = styled.section`
  padding: 30px 38px;
`;

const CountGridBlock = styled.article`
  .forGrid {
    margin-bottom: 24px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 53px 43px;
    position: relative;
    & > div:nth-child(3) {
      grid-area: 1 / 3 / 2 / 6;
    }
    & > div[name='대  기'] p,
    & > div[name='진  행'] p {
      strong {
        color: ${paletteJY.blue};
      }
      color: ${paletteJY.blue};
    }
    & > div[name='진  행'] {
      &::after {
        display: block;
        content: '';
        width: 17px;
        height: 16px;
        background: url(images/icon-arrow-d.svg) no-repeat center / contain;
        position: absolute;
        bottom: -27px;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: none;
        z-index: 1;
      }
    }
    & > div[name='검  수'] {
      &:not(:last-child)::after {
        display: block;
        content: '';
        width: 16px;
        height: 17px;
        background: url(images/icon-arrow-rr.svg) no-repeat center / contain;
        position: absolute;
        top: 50%;
        right: -30px;
        transform: translateY(-50%);
        pointer-events: none;
        z-index: 1;
        filter: drop-shadow(0 0 4px ${paletteJY.gray[5]});
      }
    }
    .on {
      box-shadow: inset 4px 4px 3px rgba(181 191 198 / 46%),
        inset -4px -4px 1px rgba(255 255 255 / 52%);
    }
    &::before {
      display: block;
      content: '';
      width: 247px;
      height: 159px;
      background: #fff;
      position: absolute;
      border-top-left-radius: 18px;
      border-top-right-radius: 18px;
      top: 158px;
      left: 488px;
    }
    /* & > div[type='square']:not(:last-child)::after,
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
    } */
  }
  .forFlex {
    display: flex;
    justify-content: center;
    padding: 15px 11px;
    background-color: #fff;
    border-radius: 17px;
    box-shadow: 5px 5px 5px rgba(181 191 198 / 46%);
    div[type='square'] {
      width: 236px;
      border-radius: 0;
      box-shadow: none;
      position: relative;
      &:not(:last-child)::after {
        display: block;
        content: '';
        width: 16px;
        height: 17px;
        background: url(images/icon-arrow-rr.svg) no-repeat center / contain;
        position: absolute;
        top: 50%;
        right: -9px;
        transform: translateY(-50%);
        pointer-events: none;
        z-index: 1;
        filter: drop-shadow(0 0 4px ${paletteJY.gray[5]});
      }
      &:first-child {
        border-top-left-radius: 10px;
        border-end-start-radius: 10px;
      }
      &:nth-child(2) {
        background: ${paletteJY.gray[3]};
      }
      &:nth-child(3) {
        background: ${paletteJY.gray[5]};
        h3 {
          color: #fff;
        }
      }
      &:nth-child(4) {
        background: ${paletteJY.gray[6]};
        h3 {
          color: #fff;
        }
      }
      &:last-child {
        border-top-right-radius: 10px;
        border-end-end-radius: 10px;
        background: ${paletteJY.gray[7]};
        p,
        strong,
        h3 {
          color: #fff;
        }
      }
    }
  }
`;

const ProjectCountForm2 = ({
  count,
  backlog,
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
            <div className="bTop">
              <Button1
                type={selectedBt[0] === 'bt0' ? 'primary' : ''}
                onClick={() => qs_filter('매출-전체')}
              >
                <span>전 체</span>
              </Button1>
              <Button1
                type={selectedBt[0] === 'bt1' ? 'primary' : ''}
                onClick={() => qs_filter('매출')}
              >
                <span>매 출</span>
              </Button1>
              <Button1
                className="line"
                type={selectedBt[0] === 'bt2' ? 'primary' : ''}
                onClick={() => qs_filter('비매출')}
              >
                <span>비 매 출</span>
              </Button1>
            </div>
            <div className="bBot">
              {selectedBt[0] === 'bt1' ? (
                <>
                  <Button1
                    type={selectedBt[2] === 'bt0' ? 'primary' : ''}
                    onClick={() => qs_filter('계약-전체')}
                  >
                    <span>전 체</span>
                  </Button1>
                  <Button1
                    type={selectedBt[2] === 'bt1' ? 'primary' : ''}
                    onClick={() => qs_filter('계약')}
                  >
                    <span>계 약</span>
                  </Button1>
                  <Button1
                    type={selectedBt[2] === 'bt2' ? 'primary' : ''}
                    onClick={() => qs_filter('예정')}
                  >
                    <span>예 정</span>
                  </Button1>
                </>
              ) : (
                ''
              )}
            </div>
          </ButtonArticle>
          <ButtonArticle>
            {/* <Button
              type={selectedBt[1] === 'bt0' ? 'primary' : ''}
              state={selectedBt[1] === 'bt0' ? true : false}
              onClick={() => qs_filter('사업-전체')}
            >
              <span>전 체</span>
            </Button> 
            <Button
              type={selectedBt[1] === 'bt1' ? 'primary' : ''}
              onClick={() => qs_filter('디자인')}
            >
              <span>디 자 인</span>
            </Button>
            <Button
              type={selectedBt[1] === 'bt2' ? 'primary' : ''}
              onClick={() => qs_filter('영상')}
            >
              <span>영 상</span>
            </Button>
            <Button
              type={selectedBt[1] === 'bt3' ? 'primary' : ''}
              onClick={() => qs_filter('ICT')}
            >
              <span>I C T</span>
            </Button>
            <Button
              type={selectedBt[1] === 'bt4' ? 'primary' : ''}
              onClick={() => qs_filter('R&D')}
            >
              <span>R & D</span>
            </Button> */}
            <div className="switch">
              <span>전 체</span>
              <input
                id="switch-1"
                type="radio"
                name="selectR"
                value="사업-전체"
                // type={selectedBt[1] === 'bt0' ? 'primary' : ''}
                // state={selectedBt[1] === 'bt0' ? true : false}
                checked={selectedBt[1] === 'bt0' ? true : false}
                onClick={() => qs_filter('사업-전체')}
              />
              <label for="switch-1"></label>
            </div>
            <div className="switch">
              <span>디 자 인</span>
              <input
                id="switch-2"
                type="radio"
                name="selectR"
                value="디자인"
                checked={selectedBt[1] === 'bt1' ? 'primary' : ''}
                onClick={() => qs_filter('디자인')}
              />
              <label for="switch-2"></label>
            </div>
            <div className="switch">
              <span>영 상</span>
              <input
                id="switch-3"
                type="radio"
                name="selectR"
                value="영상"
                checked={selectedBt[1] === 'bt2' ? 'primary' : ''}
                onClick={() => qs_filter('영상')}
              />
              <label for="switch-3"></label>
            </div>
            <div className="switch">
              <span>I C T</span>
              <input
                id="switch-4"
                type="radio"
                name="selectR"
                value="ICT"
                checked={selectedBt[1] === 'bt3' ? 'primary' : ''}
                onClick={() => qs_filter('ICT')}
              />
              <label for="switch-4"></label>
            </div>
            <div className="switch">
              <span>R & D</span>
              <input
                id="switch-5"
                type="radio"
                name="selectR"
                value="R&D"
                checked={selectedBt[1] === 'bt4' ? 'primary' : ''}
                onClick={() => qs_filter('R&D')}
              />
              <label for="switch-5"></label>
            </div>
          </ButtonArticle>
        </ButtonSectionBlock>
        <CountSectionBlock>
          <CountGridBlock>
            <div className="forGrid">
              <Progress type="circle" name="예정사업" count="0" />
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
              <Progress
                type="circle"
                name="수주잔량"
                count={backlog}
                unit="D"
              />
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
                className="on"
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
            </div>
            <div className="forFlex">
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
            </div>
          </CountGridBlock>
        </CountSectionBlock>
      </StyledBlock>
    </>
  );
};

export default ProjectCountForm2;
