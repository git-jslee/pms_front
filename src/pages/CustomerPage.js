import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/common/Button';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import CustomerListContainer from '../containers/customer/CustomerListContainer';
import LoginPage from './LoginPage';

const CustomerPage = () => {
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
            <h1>고객정보 페이지</h1>
            <Link to="/addcustomer">
              <Button>고객 등록</Button>
            </Link>
            <CustomerListContainer />
          </FormTemplate>
        </>
      )}
    </>
  );
};

export default CustomerPage;
