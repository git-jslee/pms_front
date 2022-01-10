import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import Button from '../components/common/Button';
import WorkListContainer from '../containers/work/WorkListContainer';
import WorkFilterContainer from '../containers/work/WorkFilterContainer';
import CodeBookContainer from '../containers/common/CodebookContainer';
import LoginPage from './LoginPage';

const WorkFormPage = () => {
  const { user } = useSelector(({ auth }) => ({ user: auth.auth }));

  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <CodeBookContainer />
      <h1>작업 페이지</h1>
      {user === null ? (
        <LoginPage />
      ) : (
        <>
          <Link to="/addwork">
            <Button>작업 등록</Button>
          </Link>
          <hr />
          <WorkFilterContainer />
          <hr />
          <WorkListContainer />
        </>
      )}
    </>
  );
};

export default WorkFormPage;
