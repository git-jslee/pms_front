import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import paletteJY from '../../lib/styles/palette_JY';

// 로그인 폼 작성

const AuthFormBlock = styled.div`
  position: relative;
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 14px;
  border: none;
  padding: 15px 20px 11px;
  outline: none;
  width: 231px;
  height: 40px;
  display: block;
  margin-left: auto;
  border-radius: 40px;
  box-shadow: inset 0.2rem 0.2rem 0.5rem rgba(181, 191, 198, 0.46),
    inset -0.2rem -0.2rem 0.5rem #fff;
  background: none;
  & + & {
    margin-top: 36px;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
 */
const Footer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  a {
    color: ${paletteJY.gray[1]};
    font-size: 14px;
    &:hover {
      color: ${paletteJY.gray[2]};
    }
  }
`;

/**
 * 에러를 보여 줌
 */

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
  position: absolute;
  right: 0;
  bottom: 20%;
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      {/* <h3>{text}</h3> */}
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button cyan fullWidth style={{ marginTop: '108px' }}>
          {text}
        </Button>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
