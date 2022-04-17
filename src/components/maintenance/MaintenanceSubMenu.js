import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

const SubMenuBlock = styled.div`
  display: inline;
  .search {
    margin-left: 20px;
    display: inline;
  }
`;

const MaintenanceSubMenu = ({ onClickSub, reload }) => {
  return (
    <>
      <SubMenuBlock>
        <Button onClick={() => onClickSub('menu1')}>등록</Button>
        {/* <Button onClick={() => onClickSub('menu1')}>Count</Button> */}
        <Button onClick={() => onClickSub('menu2')}>현황</Button>
        <Button onClick={() => onClickSub('menu3')}>조회</Button>

        <div className="search">
          <RedoOutlined
            onClick={reload}
            style={{ fontSize: '24px', color: '#08c', marginLeft: '10px' }}
          />
        </div>
      </SubMenuBlock>
    </>
  );
};

export default MaintenanceSubMenu;
