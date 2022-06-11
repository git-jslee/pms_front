import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const SubMenuBlock = styled.div`
  display: inline;
  .search {
    margin-left: 20px;
    display: inline;
  }
`;

const ScrapeSubMenu = ({ changeMode }) => {
  return (
    <>
      <SubMenuBlock>
        <Button onClick={() => changeMode('review')}>review</Button>
        <Button onClick={() => changeMode('scrape')}>scrape</Button>
      </SubMenuBlock>
    </>
  );
};

export default ScrapeSubMenu;
