import React from 'react';
import { useSelector } from 'react-redux';
import HeaderContainer from '../containers/common/HeaderContainer';
import LoginPage from './LoginPage';
import SiteHeader from '../components/SiteHeader';

const ErrorPage = () => {
  const { user } = useSelector(({ auth }) => ({ user: auth.auth }));
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <h1>Error Page</h1>
    </>
  );
};

export default ErrorPage;
