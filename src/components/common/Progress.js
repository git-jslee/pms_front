import React from 'react';
import styled, { css } from 'styled-components';
import paletteJY from '../../lib/styles/palette_JY';

const StyledProgress = styled.div`
  cursor: pointer;
  color: ${paletteJY.gray[1]};

  position: relative;
  border-radius: 10px;
  width: 210px;
  height: 120px;
  background: transparent linear-gradient(135deg, #e7ecf3 0%, #eff3f6 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 5px 5px 5px rgba(181 191 198 / 46%),
    -4px -4px 5px rgba(255 255 255 / 52%);
  &.on {
    box-shadow: inset 5px 5px 10px rgba(181 191 198 / 46%),
      inset -4px -4px 1px rgba(255 255 255 / 52%);
  }
  p {
    font-size: 18px;
    line-height: 1;
    strong {
      font-size: 24px;
      font-weight: normal;
      color: ${paletteJY.gray[2]};
    }
  }
  h3 {
    font-size: 16px;
    margin: 42px 0 0 auto;
    text-align: right;
    color: ${paletteJY.gray[1]};
  }

  ${(props) =>
    props.type === 'circle' &&
    css`
      padding: 20px;
    `}

  ${(props) =>
    props.type === 'square' &&
    css`
      padding: 16px 30px;
      height: 50px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      p {
        color: ${paletteJY.gray[2]};
        margin: 0;
      }
      h3 {
        margin: 0;
      }
      /* .progress {
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
          position: absolute;
          bottom: 0;
          left: 0;
          &[data-perc='10%'] {
            height: 10%;
          }
          &[data-perc='25%'] {
            height: 25%;
          }
          &[data-perc='50%'] {
            height: 50%;
          }
          &[data-perc='75%'] {
            height: 75%;
          }
          &[data-perc='90%'] {
            height: 90%;
          }
        }
      } */
    `}
`;

const Progress = (props) => {
  const unit = props.unit === null ? '건' : '일';
  return (
    <StyledProgress {...props}>
      <p>
        <strong>{props.count}</strong>
        {props.unit === undefined ? '건' : props.unit}
      </p>
      <h3>{props.name}</h3>
      {/* {props.type === 'square' ? (
        <div className="progress">{ <i data-perc={props.name}></i>}</div>
      ) : (
        <></>
      )} */}
    </StyledProgress>
  );
};

export default Progress;
