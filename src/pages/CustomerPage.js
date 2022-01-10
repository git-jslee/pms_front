import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/common/Button';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import CustomerListContainer from '../containers/customer/CustomerListContainer';
import LoginPage from './LoginPage';

const CustomerPage = () => {
  const { user } = useSelector(({ auth }) => ({ user: auth.auth }));

  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <h1>고객정보 페이지</h1>
      {user === null ? (
        <LoginPage />
      ) : (
        <>
          <Link to="/addcustomer">
            <Button>고객 등록</Button>
          </Link>
          <CustomerListContainer />
        </>
      )}
    </>
  );
};

export default CustomerPage;
