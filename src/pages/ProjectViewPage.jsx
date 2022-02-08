import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import ProjectViewContainer from '../containers/project/ProjectViewContainer';
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
        <hr />
        <ProjectViewContainer />
      </FormTemplate>
    </>
  );
};

export default ProjectViewPage;
