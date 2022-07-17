import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../SiteHeader';
import ProjectListContainer from '../containers/project/ProjectListContainer';
import ProjectCountContainer from '../containers/project/ProjectCountContainer';
import FormTemplate from './FormTemplate';
import ProjectSearchContainer from '../containers/project/ProjectSearchContainer';
import ProjectSubContainer from '../containers/project/ProjectSubContainer';
import ProjectTemplete from '../containers/project/ProjectTemplete';
import styled from 'styled-components';

const LayoutTemplate = () => {
  return (
    <>
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

export default LayoutTemplate;
