import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import ProjectListContainer from '../containers/project/ProjectListContainer';
import ProjectCountContainer from '../containers/project/ProjectCountContainer';
import FormTemplate from '../components/common/FormTemplate';
import ProjectSearchContainer from '../containers/project/ProjectSearchContainer';
import ProjectSubContainer from '../containers/project/ProjectSubContainer';
import ProjectTemplete from '../containers/project/ProjectTemplete';

const ProjectPage = () => {
  return (
    <>
      <HeaderContainer title="프로젝트" />
      <SiteHeader />
      <FormTemplate>
        {/* <ProjectSubContainer />
        <hr />
        <ProjectListContainer /> */}
        <ProjectTemplete />
      </FormTemplate>
    </>
  );
};

export default ProjectPage;
