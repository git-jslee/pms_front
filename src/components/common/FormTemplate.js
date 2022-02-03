import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

//Form 레이아웃을 담당하는 컴포넌트

// 화면 전체를 채움
const FormTemplateBlock = styled.div`
  /* position: absolute; */
  left: 0;
  top: 100px;
  bottom: 0;
  right: 0;
  /* background: ${palette.gray[2]}; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  justify-content: top;
  align-items: center;
`;

/* 흰색 중간영역 */
const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  margin-top: 10px;
  padding: 1rem;
  width: 1400px;
  /* height: 100vh; */
  background: white;
  border-radius: 2px;
`;

const FormTemplate = ({ children }) => {
  return (
    <FormTemplateBlock>
      <WhiteBox>{children}</WhiteBox>
    </FormTemplateBlock>
  );
};

export default FormTemplate;
