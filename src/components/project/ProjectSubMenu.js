import React from 'react';
import { Link } from 'react-router-dom';
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

const ProjectSubMenu = ({ advancedSearch, subMenuSelect, reload }) => {
  return (
    <>
      <SubMenuBlock>
        <Link to="/addproject">
          <Button>등록</Button>
        </Link>
        <Button onClick={() => subMenuSelect('menu1')}>Count</Button>
        <Button onClick={() => subMenuSelect('menu2')}>작업통계</Button>
        <Button onClick={() => subMenuSelect('menu3')}>상세조회</Button>
        <Button>투입률</Button>

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

export default ProjectSubMenu;
