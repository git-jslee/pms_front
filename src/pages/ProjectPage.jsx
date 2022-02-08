import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import ProjectListContainer from '../containers/project/ProjectListContainer';
import ProjectCountContainer from '../containers/project/ProjectCountContainer';
import FormTemplate from '../components/common/FormTemplate';
import ProjectSearchContainer from '../containers/project/ProjectSearchContainer';

const ProjectPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <FormTemplate>
        <ProjectSearchContainer />
        <hr />
        <ProjectCountContainer />
        <hr />
        <ProjectListContainer />
      </FormTemplate>
    </>
  );
};

export default ProjectPage;
