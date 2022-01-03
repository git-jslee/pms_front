import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import CustomerListContainer from '../containers/customer/CustomerListContainer';

const CustomerPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <h1>고객정보 페이지</h1>
      <CustomerListContainer />
    </>
  );
};

export default CustomerPage;
