import React from 'react';
import styled from 'styled-components';
import { Progress, Button, Space, Row, Col } from 'antd';
import paletteJY from '../../lib/styles/palette_JY';
import $ from 'jquery';

const StateArea = styled.div`
  display: flex;
  background-color: ${paletteJY.gray[0]};
  /* background-color: red; */
  box-shadow: 5px 5px 12px rgba(181 191 198 / 46%),
    -4px -4px 5px rgba(255 255 255 / 52%);
  section:first-child {
    display: flex;
    padding: 23px;
    article {
      &:first-child {
        margin-right: 40px;
      }
      ul {
        li {
          cursor: pointer;
          width: 90px;
          height: 34px;
          text-align: center;
          display: flex;
          justify-content: center;
          flex-direction: column;
          font-size: 16px;
          color: ${paletteJY.gray[2]};
          margin-bottom: 10px;
          border-radius: 4px;
          &.on {
            box-shadow: inset 2px 2px 4px rgba(181 191 198 / 46%),
              inset -4px -2px 5px #fff;
          }
        }
      }
    }
  }
  section:last-child {
    padding: 40px 126px;
    .grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 30px 82px;
      & > div {
        cursor: pointer;
        position: relative;
        width: 150px;
        height: 150px;
        background: transparent
          linear-gradient(135deg, #e7ecf3 0%, #eff3f6 100%) 0% 0% no-repeat
          padding-box;
        box-shadow: 5px 5px 12px rgba(181 191 198 / 46%),
          -4px -4px 5px rgba(255 255 255 / 52%);
        &.on {
          box-shadow: inset 5px 5px 10px rgba(181 191 198 / 46%),
            inset -4px -4px 1px rgba(255 255 255 / 52%);
        }
        &.circle {
          border-radius: 50%;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        &.square {
          border-radius: 10px;
          padding: 20px;
          position: relative;
          p {
            margin-bottom: 68px;
          }
          .progress {
            width: 12px;
            height: 110px;
            border-radius: 6px;
            background-color: ${paletteJY.gray[3]};
            position: absolute;
            top: 20px;
            right: 20px;
            overflow: hidden;
            i {
              display: block;
              width: 100%;
              background-color: ${paletteJY.blue};
              /* background-color: ${paletteJY.gray[2]}; */
              position: absolute;
              bottom: 0;
              left: 0;
              &[data-perc='10'] {
                height: 11px;
              }
              &[data-perc='25'] {
                height: 28px;
              }
              &[data-perc='50'] {
                height: 55px;
              }
              &[data-perc='75'] {
                height: 82px;
              }
              &[data-perc='90'] {
                height: 99px;
              }
            }
          }
        }
        p {
          color: ${paletteJY.gray[2]};
          font-size: 18px;
          line-height: 1;
          margin-bottom: 14px;
          strong {
            font-size: 24px;
            font-weight: normal;
          }
        }
        h3 {
          font-size: 16px;
          color: ${paletteJY.gray[1]};
          margin-bottom: 0;
        }
        &.arr::after {
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
        &.arr:nth-child(6)::after {
          background-image: url(images/icon-arrow-lr.svg);
          width: 42px;
          height: 22px;
          right: -60px;
        }
        &.line {
          p {
            color: ${paletteJY.blue};
          }
        }
      }
      & > div:nth-child(3) {
        grid-area: 1 / 3 / 2 / 6;
      }
    }
  }
`;

const ProjectCountForm = ({ count, countFormOnclick }) => {
  console.log('**count**', count);
  //0-시작전, 1-진행중, 2-보류, 3-완료, 4-대기

  return (
    <>
      <StateArea>
        <section>
          <article>
            <ul>
              <li className="on">전 체</li>
              <li>매출현황</li>
              <li>비매출</li>
            </ul>
          </article>
          <article>
            <ul>
              <li className="on">전 체</li>
              <li>디자인</li>
              <li>영 상</li>
              <li>연구소</li>
            </ul>
          </article>
        </section>
        <section>
          <article className="grid">
            <div className="circle on">
              <p>
                <strong>2</strong>건
              </p>
              <h3>?</h3>
            </div>
            <div className="circle">
              <p>
                <strong>2</strong>건
              </p>
              <h3>시작전</h3>
            </div>
            <div className="circle line">
              <p>
                <strong>2</strong>건
              </p>
              <h3>대 기</h3>
            </div>
            <div className="circle">
              <p>
                <strong>2</strong>건
              </p>
              <h3>?</h3>
            </div>
            <div className="circle">
              <p>
                <strong>2</strong>건
              </p>
              <h3>보 류</h3>
            </div>
            <div className="circle line arr">
              <p>
                <strong>2</strong>건
              </p>
              <h3>진 행</h3>
            </div>
            <div className="circle arr">
              <p>
                <strong>2</strong>건
              </p>
              <h3>검 수</h3>
            </div>
            <div className="circle">
              <p>
                <strong>2</strong>건
              </p>
              <h3>완 료</h3>
            </div>
            <div className="square line arr">
              <p>
                <strong>2</strong>건
              </p>
              <h3>10%</h3>
              <div className="progress">
                <i data-perc="10"></i>
              </div>
            </div>
            <div className="square line arr">
              <p>
                <strong>2</strong>건
              </p>
              <h3>25%</h3>
              <div className="progress">
                <i data-perc="25"></i>
              </div>
            </div>
            <div className="square line arr">
              <p>
                <strong>2</strong>건
              </p>
              <h3>50%</h3>
              <div className="progress">
                <i data-perc="50"></i>
              </div>
            </div>
            <div className="square line arr">
              <p>
                <strong>2</strong>건
              </p>
              <h3>75%</h3>
              <div className="progress">
                <i data-perc="75"></i>
              </div>
            </div>
            <div className="square line">
              <p>
                <strong>2</strong>건
              </p>
              <h3>90%</h3>
              <div className="progress">
                <i data-perc="90"></i>
              </div>
            </div>
          </article>
        </section>
      </StateArea>
    </>
  );
};

$(function () {
  $('section:first-child li, .grid > div').click(function () {
    $(this).addClass('on').siblings().removeClass('on');
  });
});

export default ProjectCountForm;
