import React from 'react';
import { useSelector } from 'react-redux';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import LoginPage from './LoginPage';
import FormTemplate from '../components/common/FormTemplate';
import AddSalesContainer from '../containers/sales/AddSalesContainer';
import SalesCodebookContainer from '../containers/common/SalesCodebookContainer';

const AddSalesPage = () => {
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
            <h1>매출현황 등록</h1>
            <SalesCodebookContainer />
            <AddSalesContainer />
          </FormTemplate>
        </>
      )}
    </>
  );
};

export default AddSalesPage;
