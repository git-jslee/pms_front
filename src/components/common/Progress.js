import React from 'react';
import styled, { css } from 'styled-components';
import paletteJY from '../../lib/styles/palette_JY';

const StyledProgress = styled.div`
  cursor: pointer;
  position: relative;
  width: 150px;
  height: 150px;
  background: transparent linear-gradient(135deg, #e7ecf3 0%, #eff3f6 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 5px 5px 12px rgb(181 191 198 / 46%),
    -4px -4px 5px rgb(255 255 255 / 52%);
  &.on {
    box-shadow: inset 5px 5px 10px rgb(181 191 198 / 46%),
      inset -4px -4px 1px rgb(255 255 255 / 52%);
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

  ${(props) =>
    props.type === 'circle' &&
    css`
      border-radius: 50%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}

  ${(props) =>
    props.type === 'square' &&
    css`
      border-radius: 10px;
      padding: 20px;
      position: relative;
      p {
        margin-bottom: 68px;
        color: cornflowerblue;
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
          background-color: cornflowerblue;
          /* background-color: ${paletteJY.gray[2]}; */
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
      }
    `}
`;

const Progress = (props) => {
  return (
    <StyledProgress {...props}>
      <p>
        <strong>{props.count}</strong>건
      </p>
      <h3>{props.name}</h3>
      {props.type === 'square' ? (
        <div className="progress">
          <i data-perc={props.name}></i>
        </div>
      ) : (
        <></>
      )}
    </StyledProgress>
  );
};

export default Progress;
