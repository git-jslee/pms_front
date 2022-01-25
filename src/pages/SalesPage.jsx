import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import SalesListContainer from '../containers/sales/SalesListContainer';
import FormTemplate from '../components/common/FormTemplate';
import SalesSubMenu from '../components/sales/SalesSubMenu';
import SalesSummaryContainer from '../containers/sales/SalesSummaryContainer';

const SalesPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <FormTemplate>
        <SalesSubMenu />
        <hr />
        <SalesSummaryContainer />
        <hr />
        <SalesListContainer />
      </FormTemplate>
    </>
  );
};

export default SalesPage;
