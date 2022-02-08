import React from 'react';
import { Link } from 'react-router-dom';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import Button from '../components/common/Button';
import AddWorkFormContainer from '../containers/work/AddWorkFormContainer';

const AddWorkFormPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <FormTemplate>
        <h1>작업 페이지</h1>
        <Link to="/work">
          <Button>작업 리스트</Button>
        </Link>
        <hr />
        <AddWorkFormContainer />
      </FormTemplate>
    </>
  );
};

export default AddWorkFormPage;
