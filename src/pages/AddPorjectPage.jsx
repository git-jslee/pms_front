import React from 'react';
import { Link } from 'react-router-dom';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import Button from '../components/common/Button';
import ProjectFormContainer from '../containers/project/ProjectFormContainer';
import CodeBookContainer from '../containers/common/CodebookContainer';

const AddPorjectPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <CodeBookContainer />
      <h1>프로젝트 추가 페이지</h1>
      <ProjectFormContainer />
    </>
  );
};

export default AddPorjectPage;
