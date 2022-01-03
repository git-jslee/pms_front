import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import CustomerListContainer from '../containers/customer/CustomerListContainer';

const CustomerPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <h1>고객정보 페이지</h1>
      <Link to="/addcustomer">
        <Button>고객 등록</Button>
      </Link>
      <CustomerListContainer />
    </>
  );
};

export default CustomerPage;
