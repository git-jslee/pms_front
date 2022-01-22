import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import AddSalesContainer from '../containers/sales/AddSalesContainer';
import SalesCodebookContainer from '../containers/common/SalesCodebookContainer';
import FormTemplate from '../components/common/FormTemplate';

const AddSalesPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <h1>매출현황 등록</h1>
      <FormTemplate>
        <SalesCodebookContainer />
        <AddSalesContainer />
      </FormTemplate>
    </>
  );
};

export default AddSalesPage;
