import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import Button from '../components/common/Button';
import WorkListContainer from '../containers/work/WorkListContainer';
import WorkFilterContainer from '../containers/work/WorkFilterContainer';
import CodeBookContainer from '../containers/common/CodebookContainer';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';

const WorkFormPage = () => {
  const { user } = useSelector(({ auth }) => ({ user: auth.auth }));
  const navigate = useNavigate();
  // user 정보 조회하여 로그인 페이지로 라우팅, userEffect 사용해야 만 가능
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  });

  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <CodeBookContainer />

      {user === null ? (
        <></>
      ) : (
        <>
          <FormTemplate>
            <h1>작업 페이지</h1>
            <Link to="/addwork">
              <Button>작업 등록</Button>
            </Link>
            <hr />
            <WorkFilterContainer />
            <hr />
            <WorkListContainer />
          </FormTemplate>
        </>
      )}
    </>
  );
};

export default WorkFormPage;
