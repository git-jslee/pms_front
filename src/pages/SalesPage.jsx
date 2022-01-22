import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import SalesListContainer from '../containers/sales/SalesListContainer';
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
        <SalesListContainer />
      </FormTemplate>
    </>
  );
};

export default SalesPage;
