import React from 'react';
import { useSelector } from 'react-redux';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import CustomerFormContainer from '../containers/customer/CustomerFormContainer';
import LoginPage from './LoginPage';

const AddCustomerPage = () => {
  const { user } = useSelector(({ auth }) => ({ user: auth.auth }));
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <h1>고객 등록 페이지</h1>
      {user === null ? (
        <LoginPage />
      ) : (
        <>
          <FormTemplate>
            <CustomerFormContainer />
          </FormTemplate>
        </>
      )}
    </>
  );
};

export default AddCustomerPage;
