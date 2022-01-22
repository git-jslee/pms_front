import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const SubMenuBlock = styled.div`
  /* position: relative; */
  display: inline;
  /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  margin-top: 10px;
  padding: 2rem;
  width: 1400px;
  height: 100%;
  background: white;
  border-radius: 2px; */
  h1 {
    /* position: relative; */
  }
`;

const SalesSubMenu = () => {
  return (
    <>
      <SubMenuBlock>
        <h1>서브 - 매출현황</h1>
        <Button>등록</Button>
      </SubMenuBlock>
    </>
  );
};

export default SalesSubMenu;
