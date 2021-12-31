import React from 'react';
import { Link } from 'react-router-dom';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import Button from '../components/common/Button';
import ProjectFormContainer from '../containers/project/ProjectFormContainer';

const AddPorjectPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <h1>프로젝트 추가 페이지</h1>
      <ProjectFormContainer />
    </>
  );
};

export default AddPorjectPage;
