import React from 'react';
import { Link } from 'react-router-dom';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import Button from '../components/common/Button';
import WorkListContainer from '../containers/work/WorkListContainer';
import WorkFilterContainer from '../containers/work/WorkFilterContainer';
import CodeBookContainer from '../containers/common/CodebookContainer';
import AddWorkDrawerContainer from '../containers/work/AddWorkDrawerContainer';

const WorkFormPage = () => {
  return (
    <>
      <HeaderContainer title="작업현황" />
      <SiteHeader />
      <CodeBookContainer />
      <FormTemplate>
        <h1>작업 페이지</h1>
        <AddWorkDrawerContainer />
        {/* <Link to="/addwork">
          <Button>작업 등록</Button>
        </Link> */}
        <hr />
        <WorkFilterContainer />
        <hr />
        <WorkListContainer />
      </FormTemplate>
    </>
  );
};

export default WorkFormPage;
