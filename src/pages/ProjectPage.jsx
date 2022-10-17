import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import DefaultLayout from '../components/Layout/DefaultLayout';
import ProjectTemplete from '../containers/project/ProjectTemplete';
import ProjectSubContainer from '../containers/project/ProjectSubContainer';
import ProjectAddContainer from '../containers/project/ProjectAddContainer';
import ProjectContentContainer from '../containers/project/ProjectContentContainer';
//

const Base = styled.div`
  width: 100%;
`;

const ProjectPage = () => {
  const { mode, submenu } = useSelector(({ common }) => ({
    mode: common.mode,
    submenu: common.submenu,
  }));

  console.log('>>>>mode>>>>', mode);

  return (
    <>
      <DefaultLayout title="프로젝트">
        {/* <ProjectTemplete /> */}
        <Base>
          <ProjectSubContainer />
          <ProjectContentContainer />
          <ProjectAddContainer />
          {/* {submenu === 'status' ? <PjtStatusContainer /> : ''}
          {submenu === 'status' ? <ProjectContentContainer /> : ''}
          {submenu === 'inputrate' ? <PjtInputrateContainer /> : ''} */}
          {/* <hr /> */}
          {mode === 'detail' ? '' : ''}
        </Base>
      </DefaultLayout>
    </>
  );
};

export default ProjectPage;
