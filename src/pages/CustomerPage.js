import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import CustomerListContainer from '../containers/customer/CustomerListContainer';

const CustomerPage = () => {
  return (
    <>
      <HeaderContainer title="고객관리" />
      <SiteHeader />
      <FormTemplate>
        <h1>고객정보 페이지</h1>
        {/* <Link to="/addcustomer">
          <Button>고객 등록</Button>
        </Link> */}
        <CustomerListContainer />
      </FormTemplate>
    </>
  );
};

export default CustomerPage;
