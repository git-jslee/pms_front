import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';
import paletteJY from '../../lib/styles/palette_JY';

const HeaderBlock = styled.div`
  &::before {
    display: block;
    content: '';
    width: 101%;
    height: 156px;
    background: ${paletteJY.gray[0]};
    position: fixed;
    top: -48px;
    left: 20px;
    z-index: -1;
  }
  position: fixed;
  width: 1800px;
  background: ${paletteJY.gray[0]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 600;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
`;

/**
 * Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
 */
const Wrapper = styled(Responsive)`
  height: 110px;
  border-radius: 10px;
  padding: 0 40px;
  box-shadow: 10px 10px 12px rgba(181 191 198 / 46%),
    -12px -11px 11px rgba(255 255 255 / 52%);

  display: flex;
  align-items: center;
  justify-content: space-between; /* 자식 엘리먼트 사이의 여백을 최대로 설정 */
  .logo {
    display: flex;
    h1 {
      font-size: 30px;
      font-weight: bold;
      color: ${paletteJY.gray[2]};
      line-height: 1;
      margin-right: 14px;
      margin-bottom: 0;
    }
    h2 {
      font-size: 12px;
      line-height: 14px;
      color: ${paletteJY.gray[1]};
      margin-bottom: 0;
    }
  }
  .right {
    display: flex;
    align-items: baseline;
    button {
      width: 120px;
    }
    div {
      font-size: 16px;
      color: ${paletteJY.gray[2]};
      font-weight: normal;
      margin-right: 18px;
      padding: 6px 0 6px 26px;
      background: url(/images/icon-header.svg) no-repeat left center;
    }
  }
`;

/**
 * 헤더가 flexed 로 되어 있기 때문에 페이지의 콘텐츠가 4rem 아래에 나타나도록 해 주는 컴포넌트
 */
const Spacer = styled.div`
  height: 182px;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user, title, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            {/* CWCC PMS {title} */}
            <h1>CWCC PMS</h1>
            <h2>
              CREA CORPORATION
              <br />
              PROJECT MANAGER SYSTEM
            </h2>
          </Link>
          {user ? (
            <div className="right">
              <UserInfo>{user.user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
