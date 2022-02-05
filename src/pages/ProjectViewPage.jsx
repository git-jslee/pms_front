import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import ProjectViewContainer from '../containers/project/ProjectViewContainer';
import ProjectViewDetail from '../components/project/ProjectViewDetail';
import ProjectStatisticsContainer from '../containers/project/ProjectStatisticsContainer';
import ModeChangeButtonContainer from '../containers/common/ModeChangeButtonContainer';

const ProjectViewPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <FormTemplate>
        <ModeChangeButtonContainer />
        <ProjectStatisticsContainer />
        {/* <ProjectViewDetail /> */}
        <hr />
        <ProjectViewContainer />
      </FormTemplate>
    </>
  );
};

export default ProjectViewPage;
