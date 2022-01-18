import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import ProjectViewContainer from '../containers/project/ProjectViewContainer';
import EditActionButtonContainer from '../containers/project/EditActionButtonContainer';
import ProjectViewDetail from '../components/project/ProjectViewDetail';

const ProjectViewPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <h1>프로젝트뷰 페이지</h1>
      <EditActionButtonContainer />
      <hr />
      <ProjectViewDetail />
      <hr />
      <ProjectViewContainer />
    </>
  );
};

export default ProjectViewPage;
