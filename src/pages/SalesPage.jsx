import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import SalesListTable from '../components/sales/SalesListTable';
import FormTemplate from '../components/common/FormTemplate';
import SalesSubMenu from '../components/sales/SalesSubMenu';
import SalesSummaryTable from '../components/sales/SalesSummaryTable';

const SalesPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <FormTemplate>
        <SalesSubMenu />
        <hr />
        <SalesSummaryTable />
        <SalesListTable />
      </FormTemplate>
    </>
  );
};

export default SalesPage;
