import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import SalesListTable from '../components/sales/SalesListTable';
import FormTemplate from '../components/common/FormTemplate';

const SalesListPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <h1>매출현황</h1>
      <FormTemplate>
        <SalesListTable />
      </FormTemplate>
    </>
  );
};

export default SalesListPage;
