import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import CustomerFormContainer from '../containers/customer/CustomerFormContainer';

const AddCustomerPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <h1>고객 등록 페이지</h1>
      <FormTemplate>
        <CustomerFormContainer />
      </FormTemplate>
    </>
  );
};

export default AddCustomerPage;
