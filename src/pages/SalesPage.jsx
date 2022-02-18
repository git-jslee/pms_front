import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import SalesListContainer from '../containers/sales/SalesListContainer';
import FormTemplate from '../components/common/FormTemplate';
import SalesSubMenu from '../components/sales/SalesSubMenu';
import SalesSubContainer from '../containers/sales/SalesSubContainer';
import SalesStatisticsContainer from '../containers/sales/SalesStatisticsContainer';
import SalesCodebookContainer from '../containers/common/SalesCodebookContainer';

const SalesPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <SalesCodebookContainer />
      <FormTemplate>
        <SalesSubContainer />
        <hr />
        <SalesStatisticsContainer />
        <hr />
        <SalesListContainer />
      </FormTemplate>
    </>
  );
};

export default SalesPage;
