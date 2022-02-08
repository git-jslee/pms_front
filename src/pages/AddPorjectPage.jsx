import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import ProjectFormContainer from '../containers/project/ProjectFormContainer';
import CodeBookContainer from '../containers/common/CodebookContainer';

const AddPorjectPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <CodeBookContainer />
      <FormTemplate>
        <h1>프로젝트 추가 페이지</h1>
        <ProjectFormContainer />
      </FormTemplate>
    </>
  );
};

export default AddPorjectPage;
