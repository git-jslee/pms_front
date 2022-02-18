import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import AddSalesContainer from '../containers/sales/AddSalesContainer';
import SalesCodebookContainer from '../containers/common/SalesCodebookContainer';

const AddSalesPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <FormTemplate>
        <h1>매출현황 등록</h1>
        {/* <SalesCodebookContainer /> */}
        <AddSalesContainer />
      </FormTemplate>
    </>
  );
};

export default AddSalesPage;
