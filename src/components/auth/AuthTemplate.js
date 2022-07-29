import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import paletteJY from '../../lib/styles/palette_JY';
import { Link } from 'react-router-dom';

//회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트

// 화면 전체를 채움
const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${paletteJY.gray[0]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/* 흰색 박스 */
const WhiteBox = styled.div`
  .logo-area {
    display: block;
    margin-bottom: 85px;
    text-align: left;
    & p {
      font-size: 14px;
      color: ${paletteJY.gray[1]};
      margin-bottom: 10px;
    }
    & h1 {
      font-size: 24px;
      font-weight: bold;
      color: ${paletteJY.gray[2]};
      line-height: 1;
    }
  }

  /* box-shadow: 20px 20px 30px #1e3e4b3a; */
  box-shadow: 20px 20px 30px rgba(181 191 198 / 46%),
    -20px -20px 30px rgba(255 255 255 / 52%);
  border-radius: 40px;
  padding: 45px 40px 50px;
  width: 550px;
  background: transparent linear-gradient(135deg, #e7ecf3 0%, #eff3f6 100%) 0%
    0% no-repeat padding-box;
  height: 518px;
  box-sizing: border-box;
`;
const HpLink = styled.div`
  a {
    font-size: 14px;
    color: ${paletteJY.gray[1]};
    &:hover {
      color: ${paletteJY.gray[2]};
    }
  }
  margin-top: 72px;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="logo-area">
          <p>
            CREA CORPORATION
            <br />
            PROJECT MANAGER SYSTEM
          </p>
          <h1>CREA PMS</h1>
        </div>
        {children}
      </WhiteBox>
      <HpLink>
        <a
          href="https://www.cwcc.co.kr"
          target="_blank"
          className="link"
          rel="noreferrer"
        >
          www.cwcc.co.kr
        </a>
      </HpLink>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
