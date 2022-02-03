import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import Button from '../components/common/Button';
import ProjectListContainer from '../containers/project/ProjectListContainer';
import ProjectCountContainer from '../containers/project/ProjectCountContainer';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';
// import FilterMonth from '../components/common/FilterMonth';
import FilterMonthContainer from '../containers/common/FilterMonthContainer';
import FormTemplate from '../components/common/FormTemplate';

const ProjectPage = () => {
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

      {user === null ? (
        <LoginPage />
      ) : (
        <>
          <FormTemplate>
            <h1>프로젝트 페이지</h1>
            <Link to="/addproject">
              <Button>프로젝트 등록</Button>
            </Link>
            <FilterMonthContainer />
            <hr />
            <ProjectCountContainer />
            <hr />
            <ProjectListContainer />
          </FormTemplate>
        </>
      )}
    </>
  );
};

export default ProjectPage;
