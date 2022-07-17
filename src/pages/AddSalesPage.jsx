import React from 'react';
import DefaultLayout from '../components/Layout/DefaultLayout';
//
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import AddSalesContainer from '../containers/sales/AddSalesContainer';

const AddSalesPage = () => {
  return (
    <>
      {/* <HeaderContainer />
      <SiteHeader />
      <FormTemplate>
        <h1>매출현황 등록</h1>
        <AddSalesContainer />
      </FormTemplate> */}
      <DefaultLayout>
        <h1>매출현황 등록</h1>
        <AddSalesContainer />
      </DefaultLayout>
    </>
  );
};

export default AddSalesPage;
