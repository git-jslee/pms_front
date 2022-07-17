import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import DefaultLayout from '../components/Layout/DefaultLayout';

const ErrorPage = () => {
  return (
    <>
      {/* <HeaderContainer />
      <SiteHeader />
      <h1>Error Page</h1> */}
      <DefaultLayout>
        <h1>Error...</h1>
      </DefaultLayout>
    </>
  );
};

export default ErrorPage;
