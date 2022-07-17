import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

//Form 레이아웃을 담당하는 컴포넌트

// 화면 전체를 채움
const FormTemplateBlock = styled.div`
  /* background: ${palette.gray[2]}; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  justify-content: top;
  align-items: center;
`;

/* 흰색 중간영역 */
const WhiteBox = styled.div`
  width: 1614px;
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
