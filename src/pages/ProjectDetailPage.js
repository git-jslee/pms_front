import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import { Row, Col } from 'antd';
import ProjectDetailContainer from '../containers/project/ProjectDetailContainer';
import DefaultLayout from '../components/Layout/DefaultLayout';

const ProjectDetailPage = () => {
  return (
    <>
      {/* <HeaderContainer />
      <SiteHeader />
      <FormTemplate>
        <ProjectDetailContainer />
      </FormTemplate> */}
      <DefaultLayout>
        <ProjectDetailContainer />
      </DefaultLayout>
    </>
  );
};

export default ProjectDetailPage;
