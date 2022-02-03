import React from 'react';
import { useSelector } from 'react-redux';
import HeaderContainer from '../containers/common/HeaderContainer';
import LoginPage from './LoginPage';
import SiteHeader from '../components/SiteHeader';
import SalesListContainer from '../containers/sales/SalesListContainer';
import FormTemplate from '../components/common/FormTemplate';
import SalesSubMenu from '../components/sales/SalesSubMenu';
import SalesStatisticsContainer from '../containers/sales/SalesStatisticsContainer';

const SalesPage = () => {
  const { user } = useSelector(({ auth }) => ({ user: auth.auth }));
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      {user === null ? (
        <LoginPage />
      ) : (
        <>
          <FormTemplate>
            <SalesSubMenu />
            <hr />
            <SalesStatisticsContainer />
            <hr />
            <SalesListContainer />
          </FormTemplate>
        </>
      )}
    </>
  );
};

export default SalesPage;
