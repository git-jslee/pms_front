import React from 'react';
import { useSelector } from 'react-redux';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import SalesListContainer from '../containers/sales/SalesListContainer';
import FormTemplate from '../components/common/FormTemplate';
import SalesSubMenu from '../components/sales/SalesSubMenu';
import SalesSubContainer from '../containers/sales/SalesSubContainer';
import SalesStatisticsContainer from '../containers/sales/SalesStatisticsContainer';
import SalesCodebookContainer from '../containers/common/SalesCodebookContainer';
import SalesAdvancedSearchContainer from '../containers/sales/SalesAdvancedSearchContainer';

const SalesPage = () => {
  const { search } = useSelector(({ common }) => ({
    search: common.search,
  }));

  return (
    <>
      <HeaderContainer title="매출현황" />
      <SiteHeader />
      <SalesCodebookContainer />
      <FormTemplate>
        <SalesSubContainer />
        <hr />
        <SalesListContainer />
      </FormTemplate>
    </>
  );
};

export default SalesPage;
