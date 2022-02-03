import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import LoginPage from './LoginPage';
import FormTemplate from '../components/common/FormTemplate';
import Button from '../components/common/Button';
import ProjectFormContainer from '../containers/project/ProjectFormContainer';
import CodeBookContainer from '../containers/common/CodebookContainer';

const AddPorjectPage = () => {
  const { user } = useSelector(({ auth }) => ({ user: auth.auth }));

  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <CodeBookContainer />
      {user === null ? (
        <LoginPage />
      ) : (
        <>
          <FormTemplate>
            <h1>프로젝트 추가 페이지</h1>
            <ProjectFormContainer />
          </FormTemplate>
        </>
      )}
    </>
  );
};

export default AddPorjectPage;
